import React from "react";
import styles from "./NavBarLanding.module.css";
//import { Link } from "react-router-dom";

function NavBarLanding() {
  return (
    <div className={styles.containerNavbar}>
      <div className={styles.buttomNavbar}>
        <img src="" alt="Aca el logo" />
        <span>Premium</span>
        <span>About</span>
        <span>Register</span>
        <span>LogIn</span>
        <span>Perfil</span>
      </div>
    </div>
  );
}

export default NavBarLanding;
