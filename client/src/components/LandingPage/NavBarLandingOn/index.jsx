import { FaBars, FaTimes, FaRegLightbulb, FaLightbulb } from "react-icons/fa";
import styles from "./NavBarLandingOn.module.css";
import stylesLight from "./NavBarLandingOnLight.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../store/slice/user";
import { useState } from "react";
import imagen from "../.././NavBarHome/img_avatar.png";

function NavBarLanding() {
  const [profile, setProfile] = useState(false);
  const [details, setDetails] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = localStorage.getItem("theme");

  function handlefabars() {
    setDetails(!details);
  }

  function handleClick() {
    setProfile(!profile);
  }

  function handleLog() {
    dispatch(logoutUser());
  }

  function handleTheme() {
    if (theme === "light") {
      localStorage.clear();
      localStorage.setItem("theme", "dark");
      navigate("/");
    } else {
      localStorage.setItem("theme", "light");
      navigate("/");
    }
  }

  return (
    <>
      <div
        className={
          theme === "light"
            ? stylesLight.containerNavbar
            : styles.containerNavbar
        }
      >
        <div
          className={
            theme === "light" ? stylesLight.conterImg : styles.conterImg
          }
        >
          <Link to="/">
            <img
              className={
                theme === "light" ? stylesLight.logoImg : styles.logoImg
              }
              src="https://i.imgur.com/GiyjGcI.png"
              alt="Musicfy Logo"
            />
          </Link>
          <Link to="/">
            <span
              className={
                theme === "light" ? stylesLight.logoTxt : styles.logoTxt
              }
            >
              MusicFy
            </span>
          </Link>
        </div>
        <nav>
          <ul
            className={
              theme === "light"
                ? styles.containerButtomNavbar
                : styles.containerButtomNavbar
            }
          >
            <Link to="/premium">
              <li
                className={
                  theme === "light" ? stylesLight.btnNavbar : styles.btnNavbar
                }
              >
                Premium
              </li>
            </Link>
            <Link to="/about">
              <li
                className={
                  theme === "light" ? stylesLight.btnNavbar : styles.btnNavbar
                }
              >
                About
              </li>
            </Link>
            <Link to="/profile">
              <li
                className={
                  theme === "light" ? stylesLight.btnNavbar : styles.btnNavbar
                }
              >
                Profile
              </li>
            </Link>

            <li>
              <img
                src={user.avatar || imagen}
                className={
                  theme === "light" ? stylesLight.iconUser : styles.iconUser
                }
                onClick={handleClick}
                alt="avatarsito"
              />
            </li>
            {profile && (
              <div
                className={
                  theme === "light" ? stylesLight.container : styles.container
                }
              >
                <div
                  className={
                    theme === "light"
                      ? styles.selectPerfil
                      : styles.selectPerfil
                  }
                >
                  <span
                    onClick={handleLog}
                    className={
                      theme === "light" ? stylesLight.logOut : styles.logOut
                    }
                  >
                    Logout
                  </span>
                </div>
              </div>
            )}
          </ul>
        </nav>
        <button
          className={theme === "light" ? stylesLight.navbtn : styles.navbtn}
        >
          <FaBars
            className={theme === "light" ? stylesLight.fabars : styles.fabars}
            onClick={handlefabars}
          />
        </button>
        {details && (
          <div
            className={
              theme === "light"
                ? styles.containerfabars
                : styles.containerfabars
            }
          >
            <button
              className={
                theme === "light" ? stylesLight.closebtn : styles.closebtn
              }
              onClick={handlefabars}
            >
              <FaTimes
                className={
                  theme === "light" ? stylesLight.fatimes : styles.fatimes
                }
              />
            </button>
            <Link to="/premium">
              <span
                className={
                  theme === "light" ? stylesLight.btnNavbar : styles.btnNavbar
                }
              >
                Premium
              </span>
            </Link>
            <Link to="/about">
              <span
                className={
                  theme === "light" ? stylesLight.btnNavbar : styles.btnNavbar
                }
              >
                About
              </span>
            </Link>
            <Link to="/profile">
              <span
                className={
                  theme === "light" ? stylesLight.btnNavbar : styles.btnNavbar
                }
              >
                Profile
              </span>
            </Link>
            <button
              onClick={handleTheme}
              className={
                theme === "light" ? stylesLight.btnTheme : styles.btnTheme
              }
            >
              {theme !== "light" ? <FaRegLightbulb /> : <FaLightbulb />}
            </button>
          </div>
        )}
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
