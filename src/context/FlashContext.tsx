import { useState, useEffect } from "react";
import { FlashContext } from "../hooks/flash"
import "./FlashContext.css";

interface FlashProviderProps {
  children: React.ReactNode;
}

const FlashProvider = ({ children }: FlashProviderProps) => {
  const [flash, setFlash] = useState("");

  useEffect(() => {
    if (!flash) return;
    const timer = setTimeout(() => setFlash(""), 7000);
    return () => clearTimeout(timer);
  }, [flash]);

  return (
    <FlashContext.Provider value={{ flash, setFlash }}>
      {children}
      {flash && <div className="flash-message">
        {flash}
        <button onClick={() => setFlash("")}>&times;</button>
      </div>}
    </FlashContext.Provider>
  );
};

export default FlashProvider;
