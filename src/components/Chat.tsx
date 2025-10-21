import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './Chat.css';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/gemini/chat`, {
        messages: [
          {
            role: 'user',
            content: input,
          },
        ],
      });

      const botReply: Message = {
        sender: 'bot',
        text: response.data?.reply,
      };

      setMessages(prev => [...prev, botReply]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: 'Error connecting to the server.' },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message-row ${msg.sender}`}>
            <div className={`chat-message ${msg.sender}`}>
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          </div>
        ))}
        {loading && (
          <div className="message-row bot">
            <div className="chat-message bot">...</div>
          </div>
        )}
      </div>
      <div className="chat-input-area">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
