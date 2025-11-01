import React, { useState } from 'react';
import Chat from './Chat';
import { useMediaQuery } from '../hooks/useMediaQuery';
import './ChatWrapper.css';

const ChatWrapper: React.FC<{ symbol: string }> = ({ symbol }) => {
  const isMobile = useMediaQuery('(max-width: 1200px)');
  const [open, setOpen] = useState(false);

  return (
    <div className="chat-wrapper">
      {isMobile && !open && (
        <div className="chat-collapsed" onClick={() => setOpen(true)}>
          <img src="/sentibot-avatar.png" alt="Sentibot" className="bot-avatar-small" />
          <span className="bot-name-small">Sentibot</span>
        </div>
      )}

      <Chat
        key={symbol}
        symbol={symbol}
        isMobile={isMobile}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default ChatWrapper;

