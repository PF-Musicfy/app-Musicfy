import { Link } from "react-router-dom";
import styles from "./body2.module.css";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
import { IoHeadsetSharp } from "react-icons/io5";
import imagen from "./c0d19485337437b7e6955ae26f737978.jpg";
export default function Body2() {
  return (
    <div className={styles.containerall}>
      <div className={styles.container}>
        <div className={styles.element}>
          <IoHeadsetSharp className={styles.icon} />
          <h1 className={styles.title}> Music without Ads</h1>
          <p className={styles.phrase}>
            Enjoy playing music whitout interruptions
          </p>
        </div>
        <div className={styles.element}>
          <IoIosPeople className={styles.icon} />
          <h1 className={styles.title}> Join our comunity</h1>
          <p className={styles.phrase}>
            We have a large comunity, join us in our social networks
          </p>
        </div>
        <div className={styles.element}>
          <BsFillCloudArrowUpFill className={styles.icon} />
          <h1 className={styles.title}> Post your favorites songs</h1>
          <p className={styles.phrase}>
            Upload your own tracks, add favorites and more!
          </p>
        </div>
      </div>
      <div className={styles.container2}>
        <img src={imagen} alt="backg" className={styles.imagenback} />
        <h1 className={styles.titulo2}>Not premium yet?</h1>
        <h2 className={styles.subtitulo2}>Try premium free for 7 days</h2>
        <Link to="/premium">
          <button className={styles.button}>Premium Free</button>
        </Link>
      </div>
    </div>
  );
}
