import { useState } from "react";
import styles from "./Popup.module.scss";
import Image from "next/image";

interface EditProfileImageProps {
  profileImage?: string;
  onSave: (nickname: string) => void;
}

export default function EditProfileImage({
  profileImage,
  onSave,
}: EditProfileImageProps) {
  const [inputValue, setInputValue] = useState(profileImage || "");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSave = () => {
    onSave(inputValue);
  };

  return (
    <div>
      <h2 className={styles.popupBox_title}>Edit Profile Image</h2>
      <div className={styles.find_input_box}>
        <input
          className={styles.input_box}
          type="file"
          placeholder="Profile Image"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button>Find Image</button>
        <div className={styles.found_image}>
          {profileImage && (
            <Image
              src={`${profileImage}`}
              alt="profile image"
              width="136"
              height="136"
            />
          )}
        </div>
      </div>

      <div
        className={`${styles.line_button} ${styles.popup_button_text}`}
        onClick={handleSave}
      >
        Save
      </div>
    </div>
  );
}
