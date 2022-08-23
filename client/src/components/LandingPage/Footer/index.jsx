import { Link } from "react-router-dom";
import { CgFacebook, CgInstagram } from "react-icons/cg";
import { BsTwitter, BsGithub } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import styles from "./footer.module.css";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <Link to="/">
          <div className={styles.conterImg}>
            <img
              className={styles.logoImg}
              src="https://i.imgur.com/GiyjGcI.png"
              alt="Musicfy Logo"
              onClick={() => navigate("/")}
            />
            <span className={styles.logoTxt}>MusicFy</span>
          </div>
        </Link>
        <div className={styles.footerLinkContainer}>
          <span className={styles.footerSubtitle}>USEFUL LINKS</span>
          <Link to="/home">
            <span className={styles.footerSubtitleTxt}>Web Player</span>
          </Link>
          <Link to="/register">
            <span>Register</span>
          </Link>
          <Link to="/login">Login</Link>
        </div>
        <div className={styles.footerLinkContainer}>
          <span className={styles.footerSubtitle}>COMPANY</span>
          <Link to="/about">About</Link>
          <Link to="/premium">Premium</Link>
        </div>
        <div className={styles.footerLinkContainer}>
          <span className={styles.footerSubtitle}>LICENCES</span>
          <Link to="/license">Copyright</Link>
          <Link to="/ads">Advertising</Link>
        </div>
        <div className={styles.footerSocial}>
          <CgFacebook onClick={() => window.location.assign("http://facebook.com")} className={styles.faceIcon} />
          <CgInstagram onClick={() => window.location.assign("http://instagram.com")} className={styles.instaIcon} />
          <BsTwitter onClick={() => window.location.assign("http://twitter.com")} className={styles.twitterIcon} />
          <BsGithub onClick={() => window.location.assign("http://github.com")} className={styles.gitHubIcon} />
        </div>
      </div>
    </footer>
  );
}