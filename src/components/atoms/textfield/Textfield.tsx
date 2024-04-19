import React from "react";

type Props = {
  placeholder?: string;
  value?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Textfield({
  placeholder,
  value,
  onChange,
  className,
}: Props) {
  return (
    <input
      type="text"
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
