import React, { useState } from "react";
import Textfield from "../../atoms/textfield/Textfield";
import { useNavigate } from "react-router-dom";
import "./SignUpWindow.css";
import { signUp } from "../../../firebase";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (!validateEmail(email)) {
      setAlertMessage("Please enter a valid email address.");
      return;
    }
    if (password !== confirmPassword) {
      setAlertMessage("Passwords do not match!");
      return;
    }
    setAlertMessage(""); // Clear any previous messages
    // Proceed with the sign-up process

    signUp(email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setAlertMessage(error.message);
      });
  };

  const validateEmail = (email: string) => {
    return email.match(
      // Simple email pattern check
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    );
  };

  return (
    <div className="SignUpContainer">
      <div className="SignUpBox">
        <h1 className="SignUpTitle">Sign Up</h1>
        <Textfield
          label="Email"
          placeholder="example@gmail.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Textfield
          label="Password"
          placeholder="********"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Textfield
          label="Confirm Password"
          placeholder="********"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="SignUpButton" onClick={handleSignUp}>
          Create Account
        </button>
        {alertMessage && <div className="alertBox">{alertMessage}</div>}
      </div>
    </div>
  );
}
