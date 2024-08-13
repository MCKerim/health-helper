import "./LoadingContainer.css";
import LoadingSpinner from "../../atoms/loadingSpinner/LoadingSpinner";

export default function LoadingContainer() {
  return (
    <div className="centered-container">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 className="HeaderLogo">Health Helper</h1>
      </div>
      <LoadingSpinner />
    </div>
  );
}
