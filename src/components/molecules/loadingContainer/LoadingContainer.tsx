import "./LoadingContainer.css";
import HeaderLogo from "../../atoms/headerLogo/HeaderLogo";
import LoadingSpinner from "../../atoms/loadingSpinner/LoadingSpinner";
import React from "react";

export default function LoadingContainer() {
  return (
    <div className="centered-container">
      <HeaderLogo />
      <LoadingSpinner />
    </div>
  );
}
