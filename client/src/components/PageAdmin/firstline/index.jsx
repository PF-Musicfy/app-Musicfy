import styles from "./firstline.module.css";
export default function FirstLine() {
  return (
    <div className={styles.container}>
      <h2>Name</h2>
      <p>Email</p>
      <p className={styles.plan}>Plan</p>
      <p className={styles.button}>Status</p>
      <p>Msg</p>
    </div>
  );
}
