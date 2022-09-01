import { MdComputer } from "react-icons/md";
import { RiComputerLine } from "react-icons/ri";
import { BsTabletLandscape } from "react-icons/bs";
import { HiOutlineDeviceTablet } from "react-icons/hi";
import { FiCheck } from "react-icons/fi";
import { getMercadoPago } from "../../store/slice/user";
import styles from "./CardPlan.module.css";

export default function CardPlan({ plan, btnPrice, month, title }) {
  const handleclick = async () => {
    const responseMp = await getMercadoPago("test_user_71847263@testuser.com", btnPrice, month);
    window.location.replace(responseMp.url);
  };

  return (
    <div className={styles.mainContainerCard}>
      <span className={styles.Title}>Musicfy {title}</span>
      <div className={styles.iconsContainer}>
        <HiOutlineDeviceTablet className={styles.icono} />
        <BsTabletLandscape className={styles.icono} />
        <MdComputer className={styles.icono} />
        <RiComputerLine className={styles.icono} />
      </div>
      <div className={styles.cardwordsContainer}>
        <div className={styles.wordsTitleContainer}>
          <FiCheck />
          <span className={styles.wordsTitle}>Pick and play any track</span>
        </div>
        <div className={styles.wordsTitleContainer}>
          <FiCheck />
          <span className={styles.wordsTitle}>Personalized playlists</span>
        </div>
        <div className={styles.wordsTitleContainer}>
          <FiCheck />
          <span className={styles.wordsTitle}>Ad-free experience</span>
        </div>
        <div className={styles.wordsTitleContainer}>
          <FiCheck />
          <span className={styles.wordsTitle}>High Fidelity sound</span>
        </div>
        <div className={styles.wordsTitleContainer}>
          <FiCheck />
          <span className={styles.wordsTitle}>Upload your music</span>
        </div>
      </div>
      <span className={styles.plan}>{plan}</span>
      <button
        className={styles.button}
        onClick={() => {
          handleclick();
        }}
      >
        Choose plan
      </button>
    </div>
  );
}
