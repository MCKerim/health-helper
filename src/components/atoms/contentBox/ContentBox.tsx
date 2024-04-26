import React from "react";
import "./ContentBox.css";
export default function ContentBox({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="contentBox">{children}</div>;
}
