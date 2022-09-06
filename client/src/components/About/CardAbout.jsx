import styles from "./about.module.css";
import stylesLight from "./aboutLight.module.css";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";

function CardAbout({ name, title, location, images, linkedin, github }) {
  const theme = localStorage.getItem("theme");

  return (
    <div className="card-about">
      <div
        className={
          theme === "light" ? stylesLight.containerCards : styles.containerCards
        }
      >
        <div
          className={
            theme === "light" ? stylesLight.containerTxt : styles.containerTxt
          }
        >
          <h2
            className={
              theme === "light" ? stylesLight.cardName : styles.cardName
            }
          >
            {name}
          </h2>
          <h3
            className={
              theme === "light" ? stylesLight.cardTitle : styles.cardTitle
            }
          >
            {title}
          </h3>
          <h4
            className={
              theme === "light" ? stylesLight.cardLocation : styles.cardLocation
            }
          >
            <MdLocationOn />
            {location}
          </h4>
          <div
            className={
              theme === "light" ? stylesLight.footerSocial : styles.footerSocial
            }
          >
            <BsGithub
              onClick={() => window.open(github, "_blank")}
              className={
                theme === "light" ? stylesLight.gitHubIcon : styles.gitHubIcon
              }
            />
            <BsLinkedin
              onClick={() => window.open(linkedin, "_blank")}
              className={
                theme === "light"
                  ? stylesLight.linkedinIcon
                  : styles.linkedinIcon
              }
            />
          </div>
        </div>
        <img
          src={images}
          alt="avatar"
          className={theme === "light" ? stylesLight.imgCard : styles.imgCard}
        />
      </div>
    </div>
  );
}

export default CardAbout;
