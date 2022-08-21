import styles from "./pageDev.module.css";
export default function PageDev() {
  return (
    <div className={styles.container}>
      <img
        src="https://cdn.dribbble.com/users/1235346/screenshots/3252385/job.gif"
        alt="work"
        className={styles.imagen}
      />
      <div>
        <h1 className={styles.title}>Slow but safe</h1>
        <h4 className={styles.subtitle}>We are working on it!</h4>
      </div>
    </div>
  );
}
