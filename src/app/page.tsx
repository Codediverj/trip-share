import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <header>My trip</header>
      <div>Continue Planning</div>
      <div>Completed</div>
      <div>I plan trip with...</div>
    </main>
  );
}
