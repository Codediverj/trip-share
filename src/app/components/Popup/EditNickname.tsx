import { useState } from "react";
import styles from "./Popup.module.scss";
import Image from "next/image";

interface EditNicknameProps {
  nickname?: string;
  onSave: (nickname: string) => void;
}

export default function EditNickname({ nickname, onSave }: EditNicknameProps) {
  const [inputValue, setInputValue] = useState(nickname || "");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSave = () => {
    onSave(inputValue);
  };

  return (
    <div>
      <h2 className={styles.popupBox_title}>Edit Nickname</h2>
      <input
        className={styles.input_box}
        type="text"
        placeholder="Nickname"
        value={inputValue}
        onChange={handleInputChange}
      />

      <div
        className={`${styles.line_button} ${styles.popup_button_text}`}
        onClick={handleSave}
      >
        Save
      </div>
    </div>
  );
}
