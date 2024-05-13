import React, { createContext, useContext, ReactNode } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

interface ISpeechContext {
  transcript: string;
  listening: boolean;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
  browserSupportsSpeechRecognition: boolean;
}

const SpeechContext = createContext<ISpeechContext | undefined>(undefined);

export const useSpeech = () => {
  const context = useContext(SpeechContext);
  if (!context) {
    throw new Error("useSpeech must be used within a SpeechProvider");
  }
  return context;
};

export const SpeechProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const startListening = () => SpeechRecognition.startListening();
  const stopListening = () => SpeechRecognition.stopListening();

  return (
    <SpeechContext.Provider
      value={{
        transcript,
        listening,
        startListening,
        stopListening,
        resetTranscript,
        browserSupportsSpeechRecognition,
      }}
    >
      {children}
    </SpeechContext.Provider>
  );
};
