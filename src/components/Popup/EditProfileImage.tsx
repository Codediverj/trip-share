import { useState } from "react";
import styles from "./Popup.module.scss";
import Image from "next/image";
import ImageSelectInput from "../Form/ImageSelectInput";
import { useVisionZUpload } from "@visionz/upload-helper-react";

interface EditProfileImageProps {
  profileImage?: string;
  onSave: (nickname: string) => void;
}

export default function EditProfileImage({ profileImage, onSave }: EditProfileImageProps) {
  const { onFileChange, uploadSelectedFile, selectedFile } = useVisionZUpload("/api/imageUpload");
  const [tempProfileImage, setTempProfileImage] = useState<string | undefined>(profileImage);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileChange(file);
      setTempProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    const { uploadId } = await uploadSelectedFile();
    //console.log("uploadId", uploadId);
    onSave(uploadId);
  };

  return (
    <div>
      <h2 className={styles.popupBox_title}>Edit Profile Image</h2>
      <ImageSelectInput name={"profileImage"} onChange={handleInputChange} accept={"image/*"} />
      <div className={styles.edit_profile_view_image}>
        {tempProfileImage && (
          <Image src={tempProfileImage} alt="profile image" width="136" height="136" />
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
