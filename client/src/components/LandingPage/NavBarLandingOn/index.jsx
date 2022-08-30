import styles from "./NavBarLandingOn.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from "../../../store/slice/user"
import { useState } from 'react'
import imagen from "../.././NavBarHome/img_avatar.png"

function NavBarLanding() {
  const [profile, setProfile] = useState(false);
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()
  
  function handleClick() {
    setProfile(!profile);
  }
  const handleLog = () => {
    dispatch(logoutUser());
  }

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
            <Link to="/profile">
              <li className={styles.btnNavbar}>Profile</li>
            </Link>
            <li>
            <img src={user.avatar || imagen} className={styles.iconUser} onClick={handleClick} alt="avatarsito" />
            </li>
            {profile && (
            <div className={styles.container}>
              <div className={styles.selectPerfil}>
                <span onClick={handleLog} className={styles.logOut}>
                  Log out
                </span>
              </div>{" "}
            </div>
          )}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default NavBarLanding;

/* 
 <div className="w-full text-white flex justify-between p-4 item-center">
        <div className={styles.conterImg}>
          <img className="w-10 h-10 mx-4" src="https://i.imgur.com/WJT6FaB.png" alt="logo" />
          <span className={styles.logoTxt}>MusicFy</span>
        </div>
        <nav>
          <ul className={"md:flex gap-8 p-4 hidden"}>
            <li>
              <Link to="/premium">Premium</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/login">Perfil</Link>
            </li>
          </ul>
        </nav>
      </div>
*/