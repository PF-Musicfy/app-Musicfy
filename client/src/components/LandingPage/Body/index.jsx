import { Link } from "react-router-dom";
import styles from "./BodyLanding.module.css";
import { BiPlayCircle } from "react-icons/bi";

export default function BodyLanding() {
  return (
    <div className={styles.BodyLanding}>
      {/*       <video autoPlay loop muted className={styles.backgroundVideo}>
        <source src={"https://i.imgur.com/z0zBWDt.mp4"} type="video/mp4" />
      </video> */}
      <div className={styles.containerTitle}>
        <h1 className={styles.Title}>Find your music</h1>
        <h4 className={styles.Subtitle}>Listen your favorites songs for the best price</h4>
      </div>
      <Link to="/Home">
        <button className={styles.button}>
          <BiPlayCircle className={styles.musicIcon} /> OPEN PLAYER
        </button>
      </Link>
    </div>
  );
}
