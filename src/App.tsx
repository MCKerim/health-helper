import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/signup.tsx/SignUp";
import SignIn from "./pages/login/SignIn";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Hello World</h1>} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}

export default App;
