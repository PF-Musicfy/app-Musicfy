import { Link } from "react-router-dom";
import styles from "./BodyLanding.module.css";

export default function BodyLanding() {
  return (
    <div className={styles.BodyLanding}>
      <div>
        <h1 className={styles.Title}>Find your music</h1>
        <h4 className={styles.Subtitle}>
          Listen your favorites songs for the best price{" "}
        </h4>
      </div>
      <Link to="/Home">
        <button className={styles.button}>Open Player</button>
      </Link>
    </div>
  );
}
