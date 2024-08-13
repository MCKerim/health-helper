import { useNavigate } from "react-router-dom";
import "./Explanation.css";
import { useTranslation } from "react-i18next";
import { TranslationKeys } from "../../translation/types/TranslationKeys";
import { LanguageDropdown } from "../../components/atoms/dropDownMenu/DropDownMenu";

export default function Explanation() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="SignUpContainer">
      <div className="SignUpBox">
        <h1 className="SignUpTitle">
          {t(TranslationKeys.explanationpage_header)}
        </h1>
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
          <b>{t(TranslationKeys.explanationpage_text_3)}</b>
        </p>

        <p>{t(TranslationKeys.explanationpage_text_4)}</p>
        <p>
          <b>Aldo Costa & Kerim Ismail</b>
        </p>
        <p
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            textAlign: "left",
            width: "100%",
            paddingLeft: "10px",
            color: "#1e1e1e",
          }}
        >
          {t(TranslationKeys.text_account_settings)}
        </p>
        <LanguageDropdown />

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
