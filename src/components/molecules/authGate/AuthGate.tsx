import "./AuthGate.css";

/**
 * The login page
 */
export default function AuthGate() {
  return (
    <div className="centered-window">
      <div className="content">
        <h2>Welcome</h2>
        <div className="buttons">
          <a href="/signin" className="button">
            Sign In
          </a>
          <a href="/signup" className="button">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}
