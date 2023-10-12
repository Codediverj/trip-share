import { useState } from "react";
import styles from "./Popup.module.scss";
import Image from "next/image";
import DefaultText from "../Form/DefaultText";

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
      <DefaultText
        name="Nickname"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={"Nickname"}
      />

      <button
        className={`${styles.full_bg_button} ${styles.popup_button_text}`}
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
}
