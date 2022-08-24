import NavBarLanding from "../LandingPage/NavBarLanding";
import styles from "./premium.module.css";
import { MdComputer } from "react-icons/md";
import { RiComputerLine } from "react-icons/ri";
import { BsTabletLandscape } from "react-icons/bs";
import { HiOutlineDeviceTablet } from "react-icons/hi";
import { FiCheck } from "react-icons/fi";
import Footer from "../LandingPage/Footer";
export default function Premium() {
  return (
    <div>
      <NavBarLanding />
      <div className={styles.subcontainer}>
        <img
          src="https://i.pinimg.com/originals/66/d1/b4/66d1b4865389a633bc108a602aee9311.jpg"
          alt="album"
          className={styles.imagen}
        />
        <h1 className={styles.title}>Listen trend music any time, anywhere</h1>
      </div>
      <div className={styles.subcontainer2}>
        <div className={styles.card}>
          <h1>$5 / 1 month</h1>
          <div className={styles.icons}>
            <HiOutlineDeviceTablet />
            <BsTabletLandscape className={styles.iconito} />
            <MdComputer className={styles.iconito} />
            <RiComputerLine className={styles.iconito} />
          </div>
          <div className={styles.cardwords}>
            <p>
              <FiCheck />
              Choose your music
            </p>
            <p>
              <FiCheck />
              Create your own playlists
            </p>
            <p>
              <FiCheck />
              Music without publicity
            </p>
          </div>
          <button>Choose plan</button>
        </div>
        <div className={styles.card}>
          <h1>$25 / 1 month</h1>
          <div className={styles.icons}>
            <HiOutlineDeviceTablet />
            <BsTabletLandscape className={styles.iconito} />
            <MdComputer className={styles.iconito} />
            <RiComputerLine className={styles.iconito} />
          </div>
          <div className={styles.cardwords}>
            <p>
              <FiCheck />
              Choose your music
            </p>
            <p>
              <FiCheck />
              Create your own playlists
            </p>
            <p>
              <FiCheck />
              Music without publicity
            </p>
          </div>
          <button>Choose plan</button>
        </div>
        <div className={styles.card}>
          <h1>$55 / 12 month</h1>
          <div className={styles.icons}>
            <HiOutlineDeviceTablet />
            <BsTabletLandscape className={styles.iconito} />
            <MdComputer className={styles.iconito} />
            <RiComputerLine className={styles.iconito} />
          </div>
          <div className={styles.cardwords}>
            <p>
              <FiCheck />
              Choose your music
            </p>
            <p>
              <FiCheck />
              Create your own playlists
            </p>
            <p>
              <FiCheck />
              Music without publicity
            </p>
          </div>
          <button>Choose plan</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
