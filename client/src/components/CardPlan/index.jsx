import { MdComputer } from "react-icons/md";
import { RiComputerLine } from "react-icons/ri";
import { BsTabletLandscape } from "react-icons/bs";
import { HiOutlineDeviceTablet } from "react-icons/hi";
import { FiCheck } from "react-icons/fi";
import { useState } from "react"


import styles from "../Premium/premium.module.css";

export default function CardPlan({ plan }) {
  const [ verifybtn, setVerifybtn ] = useState({})


  return (
    <div className={styles.card}>
      <h1>{plan}</h1>
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
  )
}
