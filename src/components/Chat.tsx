import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './Chat.css';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

interface ChatProps {
  symbol: string;
  isMobile: boolean;
  open: boolean;
  setOpen: (val: boolean) => void;
}

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

const suggestedPrompts = (symbol: string) => [
  { label: 'Chart Patterns', message: `What chart patterns are currently forming for ${symbol}?` },
  { label: 'Support & Resistance', message: `What are the key support and resistance levels for ${symbol}?` },
  { label: 'Investment Strategy', message: `Using the current chart data, help me form an investment plan for ${symbol}` },
];

const Chat: React.FC<ChatProps> = ({ symbol, isMobile, open, setOpen }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestionsVisible, setSuggestionsVisible] = useState(true);
  const chatBoxRef = useRef<HTMLDivElement | null>(null);

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
    <div className={`chat-container ${isMobile ? 'mobile' : ''} ${open ? 'open' : ''}`}>
      <div className="chat-header">
        <img src="/sentibot-avatar.png" alt="Sentibot Avatar" className="bot-avatar" />
        <div className="bot-info">
          <div className="bot-name">Sentibot</div>
          <div className="bot-subtitle">Your AI Market Companion</div>
        </div>
        {isMobile && open && (
          <button className="close-chat" onClick={() => setOpen(false)}>✕</button>
        )}
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
              {suggestedPrompts(symbol).map((s, i) => (
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
