import React from "react";
import "./ContentBox.css";

type Props = {
  children: React.ReactNode;
};

/**
 * Box with a fade in animation
 */
export default function ContentBox({
  children,
}: Readonly<React.PropsWithChildren<Props>>) {
  return <div className="contentBox fade-in-fwd">{children}</div>;
}
