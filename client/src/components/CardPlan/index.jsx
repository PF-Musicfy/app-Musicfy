import { MdComputer } from "react-icons/md";
import { RiComputerLine } from "react-icons/ri";
import { BsTabletLandscape } from "react-icons/bs";
import { HiOutlineDeviceTablet } from "react-icons/hi";
import { FiCheck } from "react-icons/fi";
// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMercadoPago } from "../../store/slice/user";
import styles from "../Premium/premium.module.css";

export default function CardPlan({ plan }) {
  const dispatch = useDispatch();
  // test_user_71847263@testuser.com
  // ?preapproval_id=2c93808482e439a60182e5f2478900be

  const handleclick = async () => {
    const responseMp = await getMercadoPago("test_user_71847263@testuser.com");
    window.location.replace(responseMp.url);
    // console.log(responseMp.id);
  };

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
          Music without Ads
        </p>
      </div>
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
