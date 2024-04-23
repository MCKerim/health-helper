import React, { useState } from "react";
import Textfield from "../../atoms/textfield/Textfield";
import { useNavigate } from "react-router-dom";
import "./SignInWindow.css";
import { ShowPasswordIcon } from "../../atoms/showPasswordIcon/ShowPasswordIcon";
import { signIn } from "../../../firebase";
import { redirect } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleSignIn = () => {
    if (!validateEmail(email)) {
      setAlertMessage("Please enter a valid email address.");
      return;
    }
    setAlertMessage(""); // Clear any previous messages
    // Proceed with the sign-up process

    signIn(email, password)
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
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    );
  };

  return (
    <div className="SignUpContainer">
      <div className="SignUpBox">
        <h1 className="SignUpTitle">Sign Up</h1>
        <Textfield
          className="SignUpInput"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="password-container">
          <input
            className="SignUpInput"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="password-toggle"
          >
            <ShowPasswordIcon showPassword={showPassword} />
          </span>
        </div>
        <button className="SignUpButton" onClick={handleSignIn}>
          Create Account
        </button>
        {alertMessage && <div className="alertBox">{alertMessage}</div>}
      </div>
    </div>
  );
}
