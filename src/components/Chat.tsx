import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { API_URL } from "../config/api";
import { api } from "../lib/axios";
import "./Chat.css";

interface ChatProps {
  symbol: string;
  isMobile: boolean;
  open: boolean;
  setOpen: (val: boolean) => void;
}

type Message = {
  sender: "user" | "bot";
  text: string;
};

const Chat: React.FC<ChatProps> = ({ symbol, isMobile, open, setOpen }) => {
  const suggestedPrompts = [
    {
      label: "Chart Patterns",
      message: `What chart patterns are currently forming for ${symbol}?`
    },
    {
      label: "Support & Resistance",
      message: `What are the key support and resistance levels for ${symbol}?`
    },
    {
      label: "Investment Strategy",
      message: `Using the current chart data, help me form an investment plan for ${symbol}`
    }
  ];

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(suggestedPrompts);
  const chatBoxRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = async (customMessage?: string) => {
    const messageToSend = customMessage || input;
    if (!messageToSend.trim()) return;

    const userMessage: Message = { sender: "user", text: messageToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await api.post(
        `${API_URL}/gemini/chat`,
        {
          symbol,
          messages: [{ role: "user", content: messageToSend }]
        },
        { withCredentials: true }
      );

      const botReply: Message = { sender: "bot", text: response.data?.reply };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error connecting to the server." }
      ]);
    }

    setLoading(false);
  };

  const handleSuggestion = (suggestion: { label: string; message: string }) => {
    if (loading) return null;

    sendMessage(suggestion.message);
    setSuggestions((prev) =>
      prev.filter((currSuggestion) => currSuggestion !== suggestion)
    );
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, loading]);

  return (
    <div
      className={`chat-container${isMobile ? " mobile" : ""}${
        open ? " open" : ""
      }`}
    >
      <div className="chat-header">
        <img
          src="/sentibot-avatar.png"
          alt="Sentibot Avatar"
          className="bot-avatar"
        />
        <div className="bot-info">
          <div className="bot-name">Sentibot</div>
          <div className="bot-subtitle">Your AI Market Companion</div>
        </div>
        {isMobile && open && (
          <button className="close-chat" onClick={() => setOpen(false)}>
            &times;
          </button>
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
            <div className="chat-message bot">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="suggestions-container">
        {suggestions.map((suggestion, idx) => (
          <button
            key={idx}
            className="suggestion-bubble"
            onClick={() => handleSuggestion(suggestion)}
          >
            {suggestion.label}
          </button>
        ))}
      </div>

      <div className="chat-input-container">
        <div className="chat-input-area">
          <textarea
            name="sentibot-chat-input-area"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Ask Sentibot anything..."
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
