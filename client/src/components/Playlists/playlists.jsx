import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import s from "./playlist.module.css";
import { setActual, setPlaylist } from "../../store/slice/player.js";
import { FaPlay } from "react-icons/fa";
import toMinutes from "../../utils/toMinutes.js";
import Player from "../Player";
import { PopupPremium } from "../Popup";
import NavBarLandingOn from "../LandingPage/NavBarLandingOn";
import NavBarLandingOff from "../LandingPage/NavBarLandingOff";
import { AiFillHeart } from "react-icons/ai";
import { removeFavorites, userTokenInfo } from "store/slice/user";

function Detail({ e }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(userTokenInfo());
    console.log(user.favorites);
  }, []);

  return (
    <>
      <div className={s.front}>
        <p className={s.nameUser}>
          Favorites of {user.username} <AiFillHeart className={s.favorites} />
        </p>
        <img src={user.avatar} alt={user.username} className={s.img} />
      </div>
    </>
  );
}

function DetailTable({ e }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const getTracksFavorites = () => {
    dispatch(removeFavorites(e.id));
  };

  return (
    <tr className={s.row}>
      <td>
        <button className={user.premium ? "" : s.invisible} onClick={() => dispatch(setActual(e))}>
          <FaPlay className={s.iconFlaplay} />
        </button>
      </td>
      <td className={s.text}>
        <span className={s.titleSong}>{e.name}</span>
        <br />
        <span className={s.artistSong}>{e.artistName}</span>
      </td>
      <td>
        <p>{toMinutes(e.playbackSeconds)}</p>
      </td>
    </tr>
  );
}

export default function PlaylistSongs() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const theme = localStorage.getItem("theme");
  console.log(user.playlists)
 

  useEffect(() => {
    if (user.favorites) {
      dispatch(setPlaylist(user.favorites));
    }
  }, [dispatch]);

 const variablesita = user.playlists[0]
 const newData = variablesita.playlist?.map((item) => item)
 console.log(newData)

  return (
    <>
      {Object.keys(user).length ? <NavBarLandingOn /> : <NavBarLandingOff />}
      <div className={theme === "light" ? s.containerPrincipalLight : s.containerPrincipal}>
        <div className={s.detailContainer}>
          <img src={user.avatar} alt={user.username} className={s.avatar}></img>
          <span className={s.nameInfo}>
            Playlist:
            <br /> {variablesita.name}
          </span>
        </div>
        <PopupPremium open={open} onClose={() => setOpen(false)} user={user} imagen="https://i.imgur.com/GiyjGcI.png" />
        <div className={theme === "light" ? s.scrollLight : s.scroll}>
          <table className={theme === "light" ? s.tableLight : s.table}>
            <tbody>{user === undefined ? "" : newData?.map((e, i) => <DetailTable key={i} e={e} />)}</tbody>
          </table>
        </div>
        <Player open={() => setOpen(true)} />
      </div>
    </>
  );
}
