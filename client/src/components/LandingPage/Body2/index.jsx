import { Link } from "react-router-dom";
import styles from "./body2.module.css";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
import { IoHeadsetSharp } from "react-icons/io5";
import { MdHighQuality } from "react-icons/md";

export default function Body2() {
  return (
    <div className={styles.containerall}>
      <span className={styles.titleIcon}>Why Musicfy Premium?</span>
      <div className={styles.container}>
        <div className={styles.element}>
          <IoHeadsetSharp className={styles.icon} />
          <h1 className={styles.title}>Music without Ads</h1>
          <p className={styles.phrase}>Enjoy playing music whitout interruptions</p>
        </div>
        <div className={styles.element}>
          <IoIosPeople className={styles.icon} />
          <h1 className={styles.title}>Join our comunity</h1>
          <p className={styles.phrase}>We have a large comunity, join us in our social networks</p>
        </div>
        <div className={styles.element}>
          <BsFillCloudArrowUpFill className={styles.icon} />
          <h1 className={styles.title}>Post your favorites songs</h1>
          <p className={styles.phrase}>Upload your own tracks, add favorites and more!</p>
        </div>
        <div className={styles.element}>
          <MdHighQuality className={styles.icon} />
          <h1 className={styles.title}>High Fidelity sound</h1>
          <p className={styles.phrase}>High Fidelity sound</p>
        </div>
      </div>
      <div className={styles.container2}>
        <h1 className={styles.titulo2}>Not premium yet?</h1>
        <h2 className={styles.subtitulo2}>Try premium free for 7 days</h2>
        <Link to="/premium">
          <button className={styles.button}>Go Premium</button>
        </Link>
      </div>
    </div>
  );
}
