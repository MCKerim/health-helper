import React from "react";
import "./ContentBox.css";
export default function ContentBox({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="contentBox fade-in-fwd">{children}</div>;
}
