import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import FlashProvider from "./context/FlashContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FlashProvider>
      <App />
    </FlashProvider>
  </StrictMode>
);
