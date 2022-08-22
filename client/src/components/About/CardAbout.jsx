import styles from "./about.module.css";
import { BsLinkedin, BsGithub } from "react-icons/bs";

function CardAbout({ name, title, location, images }) {
  return (
    <div className="card-about">
      <div className={styles.containerCards}>
        <img src={images} alt="avatar" className={styles.imgCard} />
        <div className={styles.containerTxt}>
          <h2 className={styles.cardName}>{name}</h2>
          <h3 className={styles.cardTitle}>{title}</h3>
          <h4 className={styles.cardLocation}>{location}</h4>
          <div className={styles.footerSocial}>
            <BsGithub onClick={() => window.open("http://github.com", "_blank")} className={styles.gitHubIcon} />
            <BsLinkedin onClick={() => window.open("http://linkedin.com", "_blank")} className={styles.linkedinIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardAbout;
