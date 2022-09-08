import { FaBars, FaTimes } from "react-icons/fa";
import styles from "./NavBarLandingOn.module.css";
import stylesLight from "./NavBarLandingOnLight.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../store/slice/user";
import { useState } from "react";
import imagen from "../.././NavBarHome/img_avatar.png";
import Swal from "sweetalert2";

function NavBarLanding() {
  const [profile, setProfile] = useState(false);
  const [details, setDetails] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const theme = localStorage.getItem("theme");
  const navigate = useNavigate();

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  })

  function handlefabars() {
    setDetails(!details);
  }

  function handleClick() {
    setProfile(!profile);
  }

  function handleLog() {
    Toast.fire({
      icon: 'success',
      title: 'Logout successfully'
    }).then(()=> {
      setTimeout(() => {
        dispatch(logoutUser()); 
        navigate('/')
      }, 1000);
    })
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
            <Link to="/home">
              <li className={styles.btnNavbar}>Home</li>
            </Link>
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
                  {user.admin === true || user.master === true ? <Link to="/dashboard">
                    <span className={theme === "light" ? stylesLight.logOut : styles.logOut} >Dashboard</span>
                  </Link> : false}
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
          </div>
        )}
      </div>
    </>
  );
}

export default NavBarLanding;
