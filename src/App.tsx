import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/signUp/SignUp";
import SignIn from "./pages/signIn/SignIn";
import Chat from "./pages/chat/Chat";
import { Account } from "./pages/account/Account";
import { Datenschutz } from "./pages/datenschutz/Datenschutz";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Chat />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/Account/:uid" element={<Account />} />
      <Route path="/Datenschutz" element={<Datenschutz />} />
    </Routes>
  );
}

export default App;
