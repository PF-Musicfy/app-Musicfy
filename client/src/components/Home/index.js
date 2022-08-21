import React from "react";
import NavBarHome from "../NavBarHome";
import HomeAlbum from "./HomeAlbums/index";
import styles from "./indexMain.module.css";

export default function Home() {
  return (
    <div className={styles.indexMainHome}>
      <NavBarHome />
      <HomeAlbum />
    </div>
  );
}
