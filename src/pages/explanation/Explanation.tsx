import { useNavigate } from "react-router-dom";
import "./Explanation.css";
import { useTranslation } from "react-i18next";
import { TranslationKeys } from "../../translation/types/TranslationKeys";

export default function Explanation() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="SignUpContainer">
      <div className="SignUpBox">
        <h1 className="SignUpTitle">{t(TranslationKeys.explanationpage_header)}</h1>
        <hr
          style={{
            width: "100%",
            margin: "0px",
            padding: "0px",
            borderColor: "#ffffff",
          }}
        />
        <p>
          {t(TranslationKeys.explanationpage_text_1)}
          <br /> {t(TranslationKeys.explanationpage_text_2)}
        </p>

        <p>
          <b>
            {t(TranslationKeys.explanationpage_text_3)}
          </b>
        </p>

        <p>
          {t(TranslationKeys.explanationpage_text_4)}
        </p>
        <p>
          <b>Aldo Costa & Kerim Ismail</b>
        </p>

        <button
          className="SignUpButton"
          onClick={() => {
            navigate("/");
          }}
        >
          {t(TranslationKeys.explanationpage_continue_button)}
        </button>
      </div>
    </div>
  );
}
