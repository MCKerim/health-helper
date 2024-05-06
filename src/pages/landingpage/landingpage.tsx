import { NavLink } from "react-router-dom";
export default function Landingpage() {
  return (
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
          fontSize: "20px",
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
            paddingRight: "10px",
            paddingLeft: "10px",
            paddingTop: "5px",
            paddingBottom: "5px",
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
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>
            Get your health related questions answered with{" "}
            <span
              style={{ fontSize: "40px", color: "#98ceb5", fontWeight: "bold" }}
            >
              Health Helper
            </span>
          </h1>
        </div>
      </section>
      <footer
        style={{
          textAlign: "center",
          padding: "10px",
          backgroundColor: "#f5f5f5",
          borderTop: "1px solid #ddd",
          color: "#777",
          fontSize: "14px",
          lineHeight: "20px",
          position: "fixed",
          bottom: 0,
          width: "100%",
          height: "60px",
        }}
      >
        <p>
          This product is fully free and still in BETA. Keep in mind that we
          reserve the rights to remove access and delete any data uploaded.
        </p>
      </footer>
    </div>
  );
}
