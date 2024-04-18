import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/signUp/SignUp";
import SignIn from "./pages/signIn/SignIn";
import Chat from "./pages/chat/Chat";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Chat />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}

export default App;
