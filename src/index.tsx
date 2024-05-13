import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ChatProvider } from "./components/contexts/chatContext/ChatContext";
import { SpeechProvider } from "./components/contexts/speechContext/SpeechContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <BrowserRouter>
    <ChatProvider>
      <SpeechProvider>
        <App />
      </SpeechProvider>
    </ChatProvider>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
