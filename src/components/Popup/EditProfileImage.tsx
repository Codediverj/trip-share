import { useState } from "react";
import styles from "./Popup.module.scss";
import Image from "next/image";
import ImageSelectInput from "../Form/ImageSelectInput";

interface EditProfileImageProps {
  profileImage?: string;
  onSave: (nickname: string) => void;
}

export default function EditProfileImage({ profileImage, onSave }: EditProfileImageProps) {
  const [inputValue, setInputValue] = useState(profileImage || "");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSave = () => {
    onSave(inputValue);
    // if (inputValue.length > 15) {
    //   setErrorMessage("Nickname cannot exceed 15 characters");
    // } else {
    //   setErrorMessage("");
    //   onSave(inputValue);
    // }
  };

  return (
    <div>
      <h2 className={styles.popupBox_title}>Edit Profile Image</h2>
      <ImageSelectInput name={"profileImage"} value={inputValue} onChange={handleInputChange} />
      <div className={styles.edit_profile_view_image}>
        {profileImage && (
          <Image src={`${profileImage}`} alt="profile image" width="136" height="136" />
        )}
      </div>

      <button
        className={`${styles.full_bg_button} ${styles.popup_button_text}`}
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
}
