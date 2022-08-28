import styles from "./NavBarLandingOn.module.css";
import { Link } from "react-router-dom";

function NavBarLandingOn() {
  return (
    <>
      <div className={styles.containerNavbar}>
        <div className={styles.conterImg}>
          <Link to="/">
            <img className={styles.logoImg} src="https://i.imgur.com/GiyjGcI.png" alt="Musicfy Logo" />
          </Link>
          <Link to="/">
            <span className={styles.logoTxt}>MusicFy</span>
          </Link>
        </div>
        <nav>
          <ul className={styles.containerButtomNavbar}>
            <Link to="/premium">
              <li className={styles.btnNavbar}>Premium</li>
            </Link>
            <Link to="/about">
              <li className={styles.btnNavbar}>About</li>
            </Link>
            {/* <Link to="/register">
              <li className={styles.btnNavbar}>Register</li>
            </Link> */}
            {/* <Link to="/login">
              <li className={styles.btnNavbar}>Login</li>
            </Link> */}
            <Link to="/profile">
              <li className={styles.btnNavbar}>Profile</li>
            </Link>
            <li>
              <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" className={styles.iconUser} />
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default NavBarLandingOn;