import { NavLink } from "react-router-dom";
import "./Landingpage.css";
import LandingpageScreenshot from "../../assets/LandingpageScreenshot.png";
import { TranslationKeys } from "../../translation/types/TranslationKeys";
import { useTranslation } from "react-i18next";

export default function Landingpage() {
  const { t } = useTranslation();
  return (
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        <div>Health~Helper</div>
        <button
          style={{
            color: "white",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer",
            backgroundColor: "#2d2d2d",
            border: "none",
            paddingRight: "20px",
            paddingLeft: "20px",
            paddingTop: "6px",
            paddingBottom: "6px",
            borderRadius: "4px",
          }}
        >
          <NavLink
            style={{
              textDecoration: "none", // Removes underline from links
              color: "inherit", // Inherits color from parent element
              backgroundColor: "transparent", // Ensures no background color
              border: "none", // No borders
              padding: 0, // No padding
              cursor: "pointer",
            }}
            to={"/signIn"}
          >
            {t(TranslationKeys.sign_in_button)}
          </NavLink>
        </button>
      </header>
      <section>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            paddingTop: "100px",
            marginBottom: "100px",
          }}
        >
          <h1
            className="logoText"
            style={{
              marginBottom: "5px",
              marginTop: "0px",
              textAlign: "center",
            }}
          >
            Health~Helper
          </h1>
          <h2
            style={{
              marginTop: "0px",
              textAlign: "center",
              fontWeight: "bold",
              color: "#484848",
              marginBottom: "20px",
              maxWidth: "600px",
            }}
          >
            {t(TranslationKeys.landingpage_text_1)}
          </h2>

          <button
            style={{
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              backgroundColor: "#252525",
              border: "none",
              paddingRight: "40px",
              paddingLeft: "40px",
              paddingTop: "10px",
              paddingBottom: "10px",
              borderRadius: "4px",
            }}
          >
            <NavLink
              style={{
                textDecoration: "none", // Removes underline from links
                color: "inherit", // Inherits color from parent element
                backgroundColor: "transparent", // Ensures no background color
                border: "none", // No borders
                padding: 0, // No padding
                cursor: "pointer",
              }}
              to={"/signUp"}
            >
              {t(TranslationKeys.landingpage_sign_up)}
            </NavLink>
          </button>
          <button
            style={{
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              backgroundColor: "#59c794",
              border: "none",
              paddingRight: "40px",
              paddingLeft: "40px",
              paddingTop: "10px",
              paddingBottom: "10px",
              borderRadius: "4px",
              marginTop: "10px",
            }}
          >
            <NavLink
              style={{
                textDecoration: "none", // Removes underline from links
                color: "inherit", // Inherits color from parent element
                backgroundColor: "transparent", // Ensures no background color
                border: "none", // No borders
                padding: 0, // No padding
                cursor: "pointer",
              }}
              to={
                "https://play.google.com/store/apps/details?id=com.kblanks.healthhelper"
              }
              target="_blank"
            >
              {t(TranslationKeys.Landingpage_download_app)}
            </NavLink>
          </button>
          <img
            alt="Screenshot of the chat page"
            style={{ maxWidth: "100%", height: "auto", marginTop: "40px" }}
            src={LandingpageScreenshot}
          />
        </div>
      </section>

      <section>
        <div
          style={{
            padding: "20px 20px",
            paddingBottom: "100px",
            textAlign: "justify",
            backgroundColor: "#f5f5f5",
          }}
        >
          <h2 style={{ textAlign: "center" }}>{t(TranslationKeys.Landingpage_section2_title)}</h2>
          <p style={{ maxWidth: "800px", margin: "0 auto" }}>
            {t(TranslationKeys.Landingpage_section2_text)}
          </p>
        </div>
      </section>

      <section>
        <div
          style={{
            padding: "50px 20px",
            textAlign: "justify",
            marginBottom: "200px",
          }}
        >
          <h2 style={{ textAlign: "center" }}>{t(TranslationKeys.Landingpage_section3_title)}</h2>
          <p style={{ maxWidth: "800px", margin: "0 auto" }}>
            {t(TranslationKeys.Landingpage_section3_text)}
          </p>
          <p style={{ maxWidth: "800px", margin: "20px auto" }}>
            {t(TranslationKeys.Landingpage_section3_text_2)}
          </p>
          <p style={{ maxWidth: "800px", margin: "20px auto" }}>
            {t(TranslationKeys.Landingpage_section3_text_3)}
          </p>
        </div>
      </section>

      <footer
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
          backgroundColor: "black",
          borderTop: "1px solid #ddd",
          color: "white",
          fontSize: "14px",
          lineHeight: "20px",
          position: "fixed",
          bottom: 0,
          width: "100%",
        }}
      >
        <p
          className="footerText"
          style={{
            textAlign: "center",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          {t(TranslationKeys.landingpage_disclaimer_1)} <br /> © 2024 Kerim Ismail, Aldo Costa
        </p>
      </footer>
    </div>
  );
}