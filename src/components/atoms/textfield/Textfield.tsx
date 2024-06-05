import React, { useState } from "react";
import "./Textfield.css";
import ShowPasswordIcon from "../showPasswordIcon/ShowPasswordIcon";

type Props = {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function Textfield({
  placeholder,
  value,
  onChange,
  type,
  onKeyDown,
}: Readonly<Props>) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="password-container">
      <input
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        className="textfield"
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
  );
}
