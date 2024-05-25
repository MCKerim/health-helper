import React from "react";

type Props = {
  placeholder?: string;
  value?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function Textfield({
  placeholder,
  value,
  onChange,
  className,
  type,
  onKeyDown,
}: Readonly<Props>) {
  return (
    <input
      type={type || "text"}
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
}
