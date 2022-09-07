import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import s from "./favoritos.module.css";
import { setActual, setPlaylist } from "../../store/slice/player.js";
import { FaPlay } from "react-icons/fa";
import toMinutes from "../../utils/toMinutes.js";
import Player from "../Player";
import { PopupPremium } from "../Popup";
import NavBarLandingOn from "../LandingPage/NavBarLandingOn";
import NavBarLandingOff from "../LandingPage/NavBarLandingOff";
import { ImHeart } from "react-icons/im";
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
          Favorites of {user.username} <ImHeart />
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
          <FaPlay />
        </button>
      </td>
      <td className={s.text}>
        <p>{e.name}</p>
        <p>{e.artistName}</p>
      </td>
      <td>
        <ImHeart className={s.favorites} onClick={() => getTracksFavorites()} />
      </td>
      <td>
        <p>{toMinutes(e.playbackSeconds)}</p>
      </td>
    </tr>
  );
}

export default function Favorites() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user.favorites) {
      dispatch(setPlaylist(user.favorites));
    }
  }, [dispatch]);

  return (
    <>
      {Object.keys(user).length ? <NavBarLandingOn /> : <NavBarLandingOff />}
      <div className={s.containerPrincipal}>
        <Detail />
        <PopupPremium open={open} onClose={() => setOpen(false)} user={user} imagen="https://i.imgur.com/GiyjGcI.png" />
        <div className={s.scroll}>
          <table className={s.table}>
            <tbody>{user === undefined ? "" : user.favorites?.map((e, i) => <DetailTable key={i} e={e} />)}</tbody>
          </table>
        </div>
        <Player open={() => setOpen(true)} />
      </div>
    </>
  );
}
