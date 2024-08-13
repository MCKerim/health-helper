import "./HeaderLogo.css";

/**
 * The text logo in the header
 */
export default function HeaderLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "-40px" }}>
      <h1 className="HeaderLogo">Health Helper</h1>
    </div>
  );
}
