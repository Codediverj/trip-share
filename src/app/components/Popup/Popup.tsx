import styles from "./Popup.module.scss";

interface PopupProps {
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
  return (
    <div className={styles.popupBackground} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.popupBox}>
          <h2>Popup Content</h2>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
