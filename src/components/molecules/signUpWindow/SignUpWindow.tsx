import React, { useState } from "react";
import Textfield from "../../atoms/textfield/Textfield";
import { useNavigate, NavLink } from "react-router-dom";
import "./SignUpWindow.css";
import { handleFirebaseError, signUp } from "../../../firebase";
import { useTranslation } from "react-i18next";
import { TranslationKeys } from "../../../translation/types/TranslationKeys";

export default function SignUp() {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isAccepted, setIsAccepted] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = () => {
    if (!validateEmail(email)) {
      setAlertMessage("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setAlertMessage("Please enter a password");
      return;
    }

    if (!confirmPassword) {
      setAlertMessage("Please confirm your password");
      return;
    }

    if (password !== confirmPassword) {
      setAlertMessage("Passwords do not match");
      return;
    }
    if (!isAccepted) {
      setAlertMessage("Please accept the Datenschutzerklärung to proceed.");
      return;
    }
    setAlertMessage(""); // Clear any previous messages
    // Proceed with the sign-up process

    signUp(email, password)
      .then(() => {
        navigate("/explanation");
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
        <div className="datenschutz-checkbox">
          <input
            type="checkbox"
            id="acceptDatenschutz"
            checked={isAccepted}
            onChange={() => setIsAccepted(!isAccepted)}
          />
          <label htmlFor="acceptDatenschutz">
            Ich Akzeptiere hiermit die{" "}
            <NavLink to="/datenschutzerklaerung" className="custom-link">
              Datenschutzerklärung
            </NavLink>
          </label>
        </div>
        <button className="SignUpButton" onClick={handleSignUp}>
          {t(TranslationKeys.button_create_account)}
        </button>
        {alertMessage && <div className="alertBox">{alertMessage}</div>}
      </div>
    </div>
  );
}
