import React, { useEffect, useState } from "react";
import { useSpeech } from "../../contexts/speechContext/SpeechContext";
import "./SpeechToTextButton.css";
import { Device } from "@capacitor/device";

const SpeechToTextButton = () => {
  const [device, setDevice] = useState<String>("");

  useEffect(() => {
    Device.getInfo().then((info) => {
      setDevice(info.platform);
    });
  }, []);

  const {
    browserSupportsSpeechRecognition,
    transcript,
    listening,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeech();

  const toggleListening = () => {
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return browserSupportsSpeechRecognition &&
    device !== "ios" &&
    device !== "android" ? (
    <button
      className={`SpeechButton ${listening ? "Listening" : ""}`}
      onClick={toggleListening}
    >
      <svg
        width={30}
        height={30}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="currentColor">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.5 10.5v-5a2.5 2.5 0 0 0-5 0v5a2.5 2.5 0 0 0 5 0ZM12 1a4.5 4.5 0 0 0-4.5 4.5v5a4.5 4.5 0 1 0 9 0v-5A4.5 4.5 0 0 0 12 1Z"
          />
          <path d="M12 17c-6.5 0-6-5-6-5s0-1-1-1-1 1-1 1-.46 6.438 7 6.966V22a1 1 0 1 0 2 0v-3.034C20.46 18.438 20 12 20 12s0-1-1-1-1 1-1 1 .5 5-6 5Z" />
        </g>
      </svg>
    </button>
  ) : (
    <></>
  );
};

export default SpeechToTextButton;
