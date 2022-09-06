import { Link } from "react-router-dom";
import { CgFacebook, CgInstagram } from "react-icons/cg";
import { BsTwitter, BsGithub } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import styles from "./footer.module.css";
import stylesLight from "./footerLight.module.css";

export default function Footer() {
  const navigate = useNavigate();
  const theme = localStorage.getItem("theme");

  return (
    <footer className={theme === "light" ? stylesLight.footer : styles.footer}>
      <div
        className={
          theme === "light" ? stylesLight.footerContent : styles.footerContent
        }
      >
        <Link to="/">
          <div
            className={
              theme === "light" ? stylesLight.conterImg : styles.conterImg
            }
          >
            <img
              className={
                theme === "light" ? stylesLight.logoImg : styles.logoImg
              }
              src="https://i.imgur.com/GiyjGcI.png"
              alt="Musicfy Logo"
              onClick={() => navigate("/")}
            />
            <span
              className={
                theme === "light" ? stylesLight.logoTxt : styles.logoTxt
              }
            >
              MusicFy
            </span>
          </div>
        </Link>
        <div
          className={
            theme === "light"
              ? stylesLight.footerLinkContainer
              : styles.footerLinkContainer
          }
        >
          <span
            className={
              theme === "light"
                ? stylesLight.footerSubtitle
                : styles.footerSubtitle
            }
          >
            USEFUL LINKS
          </span>
          <Link to="/home">
            <span
              className={
                theme === "light"
                  ? stylesLight.footerSubtitleTxt
                  : styles.footerSubtitleTxt
              }
            >
              Web Player
            </span>
          </Link>
          <Link to="/register">
            <span>Register</span>
          </Link>
          <Link to="/login">Login</Link>
        </div>
        <div
          className={
            theme === "light"
              ? stylesLight.footerLinkContainer
              : styles.footerLinkContainer
          }
        >
          <span
            className={
              theme === "light"
                ? stylesLight.footerSubtitle
                : styles.footerSubtitle
            }
          >
            COMPANY
          </span>
          <Link to="/about">About</Link>
          <Link to="/premium">Premium</Link>
        </div>
        <div
          className={
            theme === "light"
              ? stylesLight.footerLinkContainer
              : styles.footerLinkContainer
          }
        >
          <span
            className={
              theme === "light"
                ? stylesLight.footerSubtitle
                : styles.footerSubtitle
            }
          >
            LICENCES
          </span>
          <Link to="/license">Copyright</Link>
          <Link to="/ads">Advertising</Link>
        </div>
        <div
          className={
            theme === "light" ? stylesLight.footerSocial : styles.footerSocial
          }
        >
          <CgFacebook
            onClick={() => window.open("http://facebook.com")}
            className={
              theme === "light" ? stylesLight.faceIcon : styles.faceIcon
            }
          />
          <CgInstagram
            onClick={() => window.open("http://instagram.com")}
            className={
              theme === "light" ? stylesLight.instaIcon : styles.instaIcon
            }
          />
          <BsTwitter
            onClick={() => window.open("http://twitter.com")}
            className={
              theme === "light" ? stylesLight.twitterIcon : styles.twitterIcon
            }
          />
          <BsGithub
            onClick={() => window.open("http://github.com")}
            className={
              theme === "light" ? stylesLight.gitHubIcon : styles.gitHubIcon
            }
          />
        </div>
      </div>
    </footer>
  );
}
