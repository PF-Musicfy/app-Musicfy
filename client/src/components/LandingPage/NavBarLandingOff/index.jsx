import { FaBars, FaTimes, FaRegLightbulb, FaLightbulb } from "react-icons/fa";
import styles from "./NavBarLandingOff.module.css";
import stylesLight from "./NavBarLandingOffLight.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function NavBarLanding() {
  const [details, setDetails] = useState(false);
  const navigate = useNavigate();
  const theme = localStorage.getItem("theme");

  function handlefabars() {
    setDetails(!details);
  }

  async function handleTheme() {
    if (theme === "light") {
      localStorage.clear();
      await navigate("/");
    } else {
      localStorage.setItem("theme", "light");
      await navigate("/");
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
                ? stylesLight.containerButtomNavbar
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
            <Link to="/register">
              <li
                className={
                  theme === "light" ? stylesLight.btnNavbar : styles.btnNavbar
                }
              >
                Register
              </li>
            </Link>
            <Link to="/login">
              <li
                className={
                  theme === "light" ? stylesLight.btnNavbar : styles.btnNavbar
                }
              >
                Login
              </li>
            </Link>
            <button
              onClick={handleTheme}
              className={
                theme === "light" ? stylesLight.btnTheme : styles.btnTheme
              }
            >
              {theme !== "light" ? <FaRegLightbulb /> : <FaLightbulb />}
            </button>
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
                ? stylesLight.containerfabars
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
            <Link to="/register">
              <span
                className={
                  theme === "light" ? stylesLight.btnNavbar : styles.btnNavbar
                }
              >
                Register
              </span>
            </Link>
            <Link to="/register">
              <span
                className={
                  theme === "light" ? stylesLight.btnNavbar : styles.btnNavbar
                }
              >
                Log in
              </span>
            </Link>
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
