import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './Chat.css';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

interface ChatProps {
  symbol: string;
}

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

const Chat: React.FC<ChatProps> = ({ symbol }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestionsVisible, setSuggestionsVisible] = useState(true);
  const chatBoxRef = useRef<HTMLDivElement | null>(null);

  const suggestedPrompts = [
    {
      label: "Chart patterns",
      message: `What chart patterns are currently forming for ${symbol}?`,
    },
    {
      label: "Market sentiment",
      message: `What is the current market sentiment for this ${symbol}?`,
    },
    {
      label: "Investing",
      message: "Help me form an investment plan based on the current chart",
    },
  ];

  const sendMessage = async (customMessage?: string) => {
    const messageToSend = customMessage || input;
    if (!messageToSend.trim()) return;

    const userMessage: Message = { sender: 'user', text: messageToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setSuggestionsVisible(false);
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/gemini/chat`, {
        symbol,
        messages: [{ role: 'user', content: messageToSend }],
      });

      const botReply: Message = { sender: 'bot', text: response.data?.reply };
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

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, loading]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <img src="/sentibot-avatar.png" alt="Sentibot Avatar" className="bot-avatar" />
        <span className="bot-name">Sentibot</span>
      </div>

      <div className="chat-box" ref={chatBoxRef}>
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

      <div className="chat-input-container">
        <div>
          {suggestionsVisible && messages.length === 0 && (
            <div className="suggestions-bar">
              {suggestedPrompts.map((s, i) => (
                <button
                  key={i}
                  className="suggestion-bubble"
                  onClick={() => sendMessage(s.message)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="chat-input-area">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Ask Sentibot anything..."
          />
          <button onClick={() => sendMessage()} disabled={loading || !input.trim()}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
