import { createContext, useContext } from "react";

export type FlashContextType = {
  flash: string;
  setFlash: (message: string) => void;
};

export const FlashContext = createContext<FlashContextType | null>(null);

export const useFlash = (): FlashContextType => {
  const context = useContext(FlashContext);
  if (!context) throw new Error("useFlash must be used within a FlashProvider");
  return context;
};
