import { Link } from "react-router-dom";
import styles from "./body2.module.css";
import stylesLight from "./body2Light.module.css";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
import { IoHeadsetSharp } from "react-icons/io5";
import { MdHighQuality } from "react-icons/md";

export default function Body2() {
  const theme = localStorage.getItem("theme");

  return (
    <div
      className={
        theme === "light" ? stylesLight.containerall : styles.containerall
      }
    >
      <span
        className={theme === "light" ? stylesLight.titleIcon : styles.titleIcon}
      >
        Why Musicfy Premium?
      </span>
      <div
        className={theme === "light" ? stylesLight.container : styles.container}
      >
        <div
          className={theme === "light" ? stylesLight.element : styles.element}
        >
          <IoHeadsetSharp
            className={theme === "light" ? stylesLight.icon : styles.icon}
          />
          <h1 className={theme === "light" ? stylesLight.title : styles.title}>
            Music without Ads
          </h1>
          <p className={theme === "light" ? stylesLight.phrase : styles.phrase}>
            Enjoy playing music whitout interruptions
          </p>
        </div>
        <div
          className={theme === "light" ? stylesLight.element : styles.element}
        >
          <IoIosPeople
            className={theme === "light" ? stylesLight.icon : styles.icon}
          />
          <h1 className={theme === "light" ? stylesLight.title : styles.title}>
            Join our comunity
          </h1>
          <p className={theme === "light" ? stylesLight.phrase : styles.phrase}>
            We have a large comunity, join us in our social networks
          </p>
        </div>
        <div
          className={theme === "light" ? stylesLight.element : styles.element}
        >
          <BsFillCloudArrowUpFill
            className={theme === "light" ? stylesLight.icon : styles.icon}
          />
          <h1 className={theme === "light" ? stylesLight.title : styles.title}>
            Post your favorites songs
          </h1>
          <p className={theme === "light" ? stylesLight.phrase : styles.phrase}>
            Upload your own tracks, add favorites and more!
          </p>
        </div>
        <div
          className={theme === "light" ? stylesLight.element : styles.element}
        >
          <MdHighQuality
            className={theme === "light" ? stylesLight.icon : styles.icon}
          />
          <h1 className={theme === "light" ? stylesLight.title : styles.title}>
            High Quality
          </h1>
          <p className={theme === "light" ? stylesLight.phrase : styles.phrase}>
            High Fidelity sound
          </p>
          <br />
        </div>
      </div>
      <div
        className={
          theme === "light" ? stylesLight.container2 : styles.container2
        }
      >
        <h1
          className={theme === "light" ? stylesLight.titulo2 : styles.titulo2}
        >
          Not premium yet?
        </h1>
        <h2
          className={
            theme === "light" ? stylesLight.subtitulo2 : styles.subtitulo2
          }
        >
          Become premium and enjoy
        </h2>
        <Link to="/premium">
          <button
            className={theme === "light" ? stylesLight.button : styles.button}
          >
            Go Premium
          </button>
        </Link>
      </div>
    </div>
  );
}
