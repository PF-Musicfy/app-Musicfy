import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Footer from "components/LandingPage/Footer";
import NavBarHome from "../NavBarHome";
import HomeAlbum from "./HomeAlbums/index";
import styles from "./indexMain.module.css";
import stylesLight from "./indexMainLight.module.css";
import { setActual } from "store/slice/player.js";

export default function Home() {
  const dispatch = useDispatch();
  const theme = localStorage.getItem("theme");

  useEffect(() => {
    dispatch(setActual({}));
  }, []);

  return (
    <div
      className={
        theme === "light" ? stylesLight.indexMainHome : styles.indexMainHome
      }
    >
      <NavBarHome />
      <HomeAlbum />
      <Footer />
    </div>
  );
}
