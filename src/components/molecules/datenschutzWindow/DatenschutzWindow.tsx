import ContentBox from "../../atoms/contentBox/ContentBox";
import "./DatenschutzWindow.css";
export default function DatenschutzWindow() {
  return (
    <div className={"DatenschutzContainer"}>
      <ContentBox>
        <p>
          Deine Daten werden nicht von uns gespeichert. Wir benutzen Chat-GPT...
        </p>
      </ContentBox>

      <ContentBox>
        <p>Für Weitere Informationen...</p>
      </ContentBox>
    </div>
  );
}
