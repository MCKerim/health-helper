import React, { useState } from "react";
import Textfield from "../../atoms/textfield/Textfield";
import { useNavigate } from "react-router-dom";
import "./SignInWindow.css";
import ShowPasswordIcon from "../../atoms/showPasswordIcon/ShowPasswordIcon";
import { resetPassword, signIn } from "../../../firebase";

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

  const handleForgotPassword = async () => {
    if (!validateEmail(email)) {
      setAlertMessage(
        "Please enter your email address to reset your password.",
      );
      return;
    }
    try {
      await resetPassword(email);
      setAlertMessage("Password reset email sent!");
    } catch (error: any) {
      setAlertMessage(error.message);
    }
  };

  return (
    <div className="SignUpContainer">
      <div className="SignUpBox">
        <h1 className="SignUpTitle">Sign In</h1>
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
        <div className="forgot-password">
          <button
            onClick={handleForgotPassword}
            className="forgot-password-button"
          >
            Forgot Password?
          </button>
        </div>
        <button className="SignUpButton" onClick={handleSignIn}>
          Sign In
        </button>
        {alertMessage && <div className="alertBox">{alertMessage}</div>}
      </div>
    </div>
  );
}
