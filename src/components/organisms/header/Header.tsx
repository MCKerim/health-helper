import React, { useState } from "react";
import DrawerMenu from "../../molecules/drawerMenu/DrawerMenu";
import HeaderLogo from "../../atoms/headerLogo/HeaderLogo";
import "./Header.css";
import { Link } from "react-router-dom";
import i18n from "../../../translation/i18n";
import { Languages } from "../../../translation/languages/Languages";
import { useTranslation } from "react-i18next";
import { TranslationKeys } from "../../../translation/types/TranslationKeys";

export default function Header() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="header">
      <DrawerMenu isOpen={isOpen} toggleDrawer={toggleDrawer} />
      <HeaderLogo />
      <Link
        to={
          i18n.language == Languages.English
            ? "https://forms.gle/6STjhMe9yXjtvkKSA"
            : "https://forms.gle/XmqCoBxea51XhVnq8"
        }
        className="menuLink surveyLink"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          padding: "5px",
          paddingLeft: "5px",
          paddingRight: "5px",
          position: "absolute",
          right: "20px",
          top: "12px",
        }}
      >
        <svg
          viewBox="0 0 52 52"
          width={32}
          height={26}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            fill="none"
            height="4.8"
            rx="1.6"
            width="27.2"
            x="12.4"
            y="26"
          />
          <rect
            fill="none"
            height="4.8"
            rx="1.6"
            width="24"
            x="12.4"
            y="35.6"
          />
          <path d="M36.4 14.8h8.48A1.09 1.09 0 0 0 46 13.68a1 1 0 0 0-.32-.8L35.12 2.32a1 1 0 0 0-.8-.32 1.09 1.09 0 0 0-1.12 1.12v8.48a3.21 3.21 0 0 0 3.2 3.2z" />
          <path d="M44.4 19.6H33.2a4.81 4.81 0 0 1-4.8-4.8V3.6A1.6 1.6 0 0 0 26.8 2h-16A4.81 4.81 0 0 0 6 6.8v38.4a4.81 4.81 0 0 0 4.8 4.8h30.4a4.81 4.81 0 0 0 4.8-4.8v-24a1.6 1.6 0 0 0-1.6-1.6zm-32-1.6a1.62 1.62 0 0 1 1.6-1.55h6.55A1.56 1.56 0 0 1 22.12 18v1.59a1.63 1.63 0 0 1-1.59 1.58H14a1.55 1.55 0 0 1-1.58-1.58zm24 20.77a1.6 1.6 0 0 1-1.6 1.6H14a1.6 1.6 0 0 1-1.6-1.6V37.2a1.6 1.6 0 0 1 1.6-1.6h20.8a1.6 1.6 0 0 1 1.6 1.6zm3.2-9.6A1.6 1.6 0 0 1 38 30.8H14a1.6 1.6 0 0 1-1.6-1.6v-1.6A1.6 1.6 0 0 1 14 26h24a1.6 1.6 0 0 1 1.6 1.6z" />
        </svg>
      </Link>
      <div
        style={{
          backgroundColor: "#e5e5e5",
          position: "absolute",
          width: "100%",
          left: "0",
          alignItems: "center",
        }}
      >
        <p style={{
          padding: "10px",
          margin: "0px",
          marginLeft: "5px",
          marginRight: "5px",
        }}>
          <Link
            to={
              i18n.language == Languages.English
                ? "https://forms.gle/6STjhMe9yXjtvkKSA"
                : "https://forms.gle/XmqCoBxea51XhVnq8"
            }
            target="_blank"
            rel="noopener noreferrer"
            style={{
              paddingLeft: "5px",
              paddingRight: "5px",
              textDecoration: "underline",
              fontWeight: "bold",
              color: "#2b2b2b",
            }}
          >
            {t(TranslationKeys.header_survey_text)}
          </Link>
        </p>
      </div>
    </div>
  );
}
