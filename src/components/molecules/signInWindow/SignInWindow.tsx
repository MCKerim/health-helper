import React, { useState } from "react";
import Textfield from "../../atoms/textfield/Textfield";
import { useNavigate } from "react-router-dom";
import "./SignInWindow.css";
import { handleFirebaseError, resetPassword, signIn } from "../../../firebase";
import { TranslationKeys } from "../../../translation/types/TranslationKeys";
import { useTranslation } from "react-i18next";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const {t} = useTranslation()
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
        setAlertMessage(handleFirebaseError(error));
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
        <h1 className="SignUpTitle">{t(TranslationKeys.sign_in)}</h1>
        <Textfield
          label={t(TranslationKeys.email)}
          placeholder="example@gmail.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Textfield
          label={t(TranslationKeys.password)}
          placeholder="********"
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="forgot-password">
          <button
            onClick={handleForgotPassword}
            className="forgot-password-button"
          >
            {t(TranslationKeys.forgot_password)}
          </button>
        </div>
        <button className="SignUpButton" onClick={handleSignIn}>
          {t(TranslationKeys.sign_in_button)}
        </button>
        {alertMessage && <div className="alertBox">{alertMessage}</div>}
      </div>
    </div>
  );
}
