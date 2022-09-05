import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Footer from "components/LandingPage/Footer";
import NavBarHome from "../NavBarHome";
import HomeAlbum from "./HomeAlbums/index";
import styles from "./indexMain.module.css";
import { setActual } from "store/slice/player.js";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActual({}));
  }, [])

  return (
    <div className={styles.indexMainHome}>
      <NavBarHome />
      <HomeAlbum />
      <Footer />
    </div>
  );
}
