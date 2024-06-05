import React, { useState } from "react";
import "./Textfield.css";
import ShowPasswordIcon from "../showPasswordIcon/ShowPasswordIcon";

type Props = {
  label?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  type: string;
  contained?: boolean;
};

export default function Textfield({
  label,
  placeholder,
  value,
  onChange,
  onKeyDown,
  type,
  contained,
}: Readonly<Props>) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div style={{ width: "100%" }}>
      { label && <label className="textfield-label">{label}</label>}
      <div className="password-container">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          className={`${contained ? "containedTextfield" : "textfield"}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        {type === "password" && (
          <button
            style={{
              border: "none",
              padding: "0",
              background: "none",
              margin: "0",
            }}
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            className="password-toggle"
          >
            <ShowPasswordIcon showPassword={showPassword} />
          </button>
        )}
      </div>
    </div>
  );
}
