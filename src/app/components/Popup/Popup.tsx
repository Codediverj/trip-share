import Image from "next/image";
import styles from "./Popup.module.scss";

interface PopupProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ children, onClose }) => {
  return (
    <div className={styles.popupBackground} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.popupBox}>
          {children}
          <div onClick={onClose} className={styles.popupClose}>
            <Image src="/close.svg" alt="close icon" width="24" height="24" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
