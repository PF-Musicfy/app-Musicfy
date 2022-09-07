import { Link } from "react-router-dom";
import styles from "./BodyLanding.module.css";
import { BiPlayCircle } from "react-icons/bi";
import Loading from "components/Loading";
import { useSelector } from "react-redux";

export default function BodyLanding() {
  const {topMusic} = useSelector(state => state.music)
  return (
    <div className={styles.BodyLanding}>
      <div className={styles.containerTitle}>
        <h1 className={styles.Title}>Find your music</h1>
        <h4 className={styles.Subtitle}>
          Listen your favorites songs for the best price
        </h4>
      </div>
      <>
     {topMusic.length === 0? <Loading/> :
      <Link to="/Home">
        <button className={styles.button}>
          <BiPlayCircle className={styles.musicIcon} /> OPEN PLAYER
        </button>
      </Link>
      }
      </>
    </div>
  );
}
