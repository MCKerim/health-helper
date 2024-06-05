import { NavLink } from "react-router-dom";
import "./Landingpage.css";
import LandingpageScreenshot from "../../assets/LandingpageScreenshot.png";

export default function Landingpage() {
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
        <div>
          Health Helper |{" "}
          <span style={{ color: "#98ceb5", fontWeight: "bold" }}>BETA</span>
        </div>
        <button
          style={{
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            backgroundColor: "#121212",
            border: "none",
            paddingRight: "20px",
            paddingLeft: "20px",
            paddingTop: "8px",
            paddingBottom: "8px",
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
            Log In
          </NavLink>
        </button>
      </header>
      <section>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            paddingTop: "100px",
          }}
        >
          <h1
            style={{
              marginBottom: "5px",
              marginTop: "0px",
              textAlign: "center",
            }}
          >
            Get your health related questions quickly answered with{" "}
            <span
              className="logoText"
            >
              Health Helper
            </span>
          </h1>
          <p
            style={{
              marginBottom: "20px",
              marginTop: "0px",
              textAlign: "center",
            }}
          >
            This app was created for educational purposes
          </p>
          <button
            style={{
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              backgroundColor: "#121212",
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
              Try for free
            </NavLink>
          </button>
          <img
            alt="Screenshot of the chat page"
            style={{ maxWidth: "100%", height: "auto", marginTop: "20px" }}
            src={LandingpageScreenshot}
          />
        </div>
      </section>

      <section>
        <div
          style={{
            minHeight: "100vh",
          }}
        >
          
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
          This product is fully free and still in{" "}
          <span style={{ color: "#98ceb5", fontWeight: "bold" }}>BETA</span>.
          Keep in mind that we reserve the rights to remove access and delete
          any data uploaded
        </p>
      </footer>
    </div>
  );
}
