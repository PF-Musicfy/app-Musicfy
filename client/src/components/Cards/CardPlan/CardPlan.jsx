import { MdComputer } from "react-icons/md";
import { RiComputerLine } from "react-icons/ri";
import { BsTabletLandscape } from "react-icons/bs";
import { HiOutlineDeviceTablet } from "react-icons/hi";
import { FiCheck } from "react-icons/fi";
import { IconContext } from "react-icons";
import { getMercadoPago } from "store/slice/user";
import styles from "./CardPlan.module.css";

function Check({ text }) {
  return (
    <div className={styles.wordsTitleContainer}>
      <FiCheck />
      <span className={styles.wordsTitle}>{text}</span>
    </div>
  )
}

export default function CardPlan({ plan, btnPrice, month, title }) {
  const handleclick = async () => {
    const responseMp = await getMercadoPago("test_user_71847263@testuser.com", btnPrice, month);
    window.location.replace(responseMp.url);
  };

  return (
    <div className={styles.mainContainerCard}>
      <span className={styles.Title}>Musicfy {title}</span>
      <div className={styles.iconsContainer}>
        <IconContext.Provider value={{ className: `${styles.icono}`}}>
          <HiOutlineDeviceTablet />
          <BsTabletLandscape />
          <MdComputer />
          <RiComputerLine />
        </IconContext.Provider>
      </div>
      <div className={styles.cardwordsContainer}>
        <Check text={'Pick and play any track'} />
        <Check text={'Personalized playlists'} />
        <Check text={'Ad-free experience'} />
        <Check text={'High Fidelity sound'} />
        <Check text={'Upload your music'} />
      </div>
      <span className={styles.plan}>{plan}</span>
      <button
        className={styles.button}
        onClick={handleclick}
      >
        Choose plan
      </button>
    </div>
  );
}
