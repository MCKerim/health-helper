import { useNavigate } from "react-router-dom";
import "./Explanation.css";

export default function Explanation() {
  const navigate = useNavigate();
  return (
    <div className="SignUpContainer">
      <div className="SignUpBox">
        <h1 className="SignUpTitle">Explanation</h1>
        Dieses Programm ist für eine Bachelor arbeit.
        Bitte mach am ende eine Umfrage
        
        <button className="SignUpButton" onClick={() => {navigate("/");}}>
          Alles klar!
        </button>
      </div>
    </div>
  );
}
