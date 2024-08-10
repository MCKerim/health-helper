import "./SendTextFooter.css";
import SendTextButton from "../../atoms/sendTextButton/SendTextButton";
import React, { useState } from "react";
import SpeechToTextButton from "../../atoms/speechToTextButton/SpeechToTextButton";
import Textfield from "../../atoms/textfield/Textfield";
import { useTranslation } from "react-i18next";
import { TranslationKeys } from "../../../translation/types/TranslationKeys";
import UploadImage from "../../atoms/uploadImage/UploadImage";
import { uploadImage } from "../../../firebase"; // Adjust the import path accordingly

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (message: string, imageUrl: string | null) => void;
  handleSend: () => void,
  handleImageSelect: (file: File) => void,
    preview: string;
};

export default function SendTextFooter({
                                         value,
                                         onChange,
                                         onClick,
    handleSend, handleImageSelect,preview
                                       }: Readonly<Props>) {
  const { t } = useTranslation();
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);


  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  return (
      <div className="send-text-footer-container">
        <div className="footer">
          <SpeechToTextButton />
          <UploadImage onImageSelect={handleImageSelect} preview={preview} />
          <Textfield
              placeholder={t(TranslationKeys.placeholder_write_reply)}
              value={value}
              onChange={onChange}
              onKeyDown={handleKeyDown}
              type="text"
              contained
          />
          <SendTextButton onClick={handleSend} uploading={uploading} />
        </div>
      </div>
  );
}
