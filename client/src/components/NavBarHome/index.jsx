import { FaBars, FaTimes } from "react-icons/fa";
import styles from "./NavBarHome.module.css";
import stylesLight from "./NavBarHomeLight.module.css";
import imagen from "./img_avatar.png";
import { useRef, useState } from "react";
import SearchBar from "../SearchBar/Index";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/slice/user";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function NavBarHome() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user); //aqui tienes la info del usuario
  const theme = localStorage.getItem("theme");
  const [profile, setProfile] = useState(false);
  const navRef = useRef();
  const navigate = useNavigate();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
  });

  const showNavBar = () => {
    navRef.current.classList.toggle(styles.responsiveNav);
  };

  async function handleClick() {
    setProfile(!profile);
  }

  function handleLog() {
    Toast.fire({
      icon: "success",
      title: "Logout successfully"
    }).then(() => {
      setTimeout(() => {
        dispatch(logoutUser());
        navigate("/");
      }, 1000);
    });
  }

  function onClickHome(e) {
    e.preventDefault();
    navigate("/home");
  }

  return (
    <div>
      {Object.keys(user).length ? (
        <div>
          <header className={theme === "light" ? stylesLight.header : styles.header}>
            <div className={theme === "light" ? stylesLight.searchStyle : styles.searchStyle}>
              <SearchBar />
            </div>
            <div className={theme === "light" ? stylesLight.logoDiv : styles.logoDiv}>
              <Link to="/">
                <img
                  className={theme === "light" ? stylesLight.logo : styles.logo}
                  src="https://i.imgur.com/GiyjGcI.png"
                  alt="Musicfy Logo"
                />
              </Link>
              <Link to="/">
                <span className={theme === "light" ? stylesLight.logoTxt : styles.logoTxt}>MusicFy</span>
              </Link>
            </div>
            <nav className={theme === "light" ? stylesLight.nav : styles.nav} ref={navRef}>
              <span
                onClick={(e) => {
                  onClickHome(e);
                }}
                className={theme === "light" ? stylesLight.btnHomeLoco : styles.btnHomeLoco}
              >
                Home
              </span>
              <Link to="/mp3uploaded">
                <span className={theme === "light" ? stylesLight.profile : styles.profile}>Mp3 Uploaded</span>
              </Link>
              <Link to="/favorites">
                <span className={styles.btnFavorites}>Favorites</span>
              </Link>
              <button
                className={
                  theme === "light"
                    ? `${(stylesLight.navBtn, stylesLight.navCloseBtn)}`
                    : `${(styles.navBtn, styles.navCloseBtn)}`
                }
                onClick={showNavBar}
              >
                <FaTimes />
              </button>
              <img
                src={user.avatar || imagen}
                className={theme === "light" ? stylesLight.avatar : styles.avatar}
                onClick={handleClick}
                alt="avatarsito"
              />
            </nav>
            <button className={theme === "light" ? stylesLight.navBtn : styles.navBtn} onClick={showNavBar}>
              <FaBars />
            </button>
          </header>
          {profile && (
            <div className={theme === "light" ? stylesLight.container : styles.container}>
              <div className={theme === "light" ? stylesLight.selectPerfil : styles.selectPerfil}>
                {user.admin === true || user.master === true ? (
                  <Link to="/dashboard">
                    <span className={styles.logOut}>Dashboard</span>
                  </Link>
                ) : (
                  false
                )}
                <Link to="/profile">
                  <span>Profile</span>
                </Link>
                <Link to="/feedback">
                  <span>Reviews</span>
                </Link>
                <Link to="/premium">
                  <span>Premium</span>
                </Link>
                <span onClick={handleLog} className={theme === "light" ? stylesLight.logOut : styles.logOut}>
                  Logout
                </span>
              </div>{" "}
            </div>
          )}
        </div>
      ) : (
        <header>
          <div className={theme === "light" ? stylesLight.searchStyleNologged : styles.searchStyleNologged}>
            <SearchBar />
          </div>
          <div className={theme === "light" ? stylesLight.logoDiv : styles.logoDiv}>
            <Link to="/">
              <img
                className={theme === "light" ? stylesLight.logo : styles.logo}
                src="https://i.imgur.com/GiyjGcI.png"
                alt="Musicfy Logo"
              />
            </Link>
            <Link to="/">
              <span className={theme === "light" ? stylesLight.logoTxt : styles.logoTxt}>MusicFy</span>
            </Link>
          </div>
          <nav ref={navRef}>
            <div className={theme === "light" ? stylesLight.noLogged : styles.noLogged}>
              <Link to="/home">
                <span className={styles.btnhomenologged}>Home</span>
              </Link>
              <Link to="/register">
                <span>Register</span>
              </Link>
              <Link to="/login">
                <span>Login</span>
              </Link>
            </div>

            {/* <button
              className={
                theme === "light"
                  ? `${stylesLight.navBtn} navCloseBtn"`
                  : `${styles.navBtn} navCloseBtn"`
              }
              onClick={showNavBar}
            >
              <FaTimes />
            </button> */}
          </nav>
          {/* <button
            className={theme === "light" ? stylesLight.navBtn : styles.navBtn}
            onClick={showNavBar}
          >
            <FaBars />
          </button> */}
        </header>
      )}
    </div>
  );
}
