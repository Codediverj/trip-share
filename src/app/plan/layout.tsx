import Image from "next/image";
import styles from "./plan.module.scss";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <header>
        <div className="back_button">
          <Image
            src="/back_button.svg"
            alt="Back icon"
            width="30"
            height="30"
          />
        </div>
        <div className={styles.plan_info}>
          <div className={styles.plan_title}>2023 New York</div>
          <div className={styles.plan_date}>Nov.12 ~ Dec.2 2023</div>
        </div>
        <div className={styles.profle_ppl}>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>+</div>
        </div>
      </header>
      {children}
    </section>
  );
}
