import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaPlay } from "react-icons/fa"

import s from "./detail.module.css";
import toMinutes from '../../utils/toMinutes.js';
import { getTrackId } from "../../store/slice";
import { setActual, setPlaylist } from "../../store/slice/player.js";
import Player from "../Player";
import { PopupLogin, PopupPremium } from "../Popup";
import NavBarLandingOn from "../LandingPage/NavBarLandingOn";
import NavBarLandingOff from "../LandingPage/NavBarLandingOff";

function DetailTable({ e }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  return (
    <tr className={s.row}>
      <td>
        <button
          className={user.premium ? '' : s.invisible}
          onClick={() => dispatch(setActual(e))}
        >
          <FaPlay />
        </button>
      </td>
      <td className={s.text}>
        <p>{e.name}</p>
        <p>{e.artistName}</p>
      </td>
      <td>
        <p>{toMinutes(e.playbackSeconds)}</p>
      </td>
    </tr>
  );
}
function DetailAll({ arr }) {
  return (
    <div className={s.detail}>
      {arr[0]?.map((e, i) => (
        <div key={i}>
          <div className={s.front}>
            <h1>{e.name}</h1>
            <h2>{e.albumName}</h2>
            <h2>{e.artistName}</h2>
          </div>
          <img src={e.images} alt={e.name} className={s.img}/>
        </div>
      ))}
      <div className={s.scroll}>
      <table className={s.table}>
        <tbody>
          {arr[1]?.map((e, i) => (
            <DetailTable key={i} e={e} />
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default function Detail() {
  const dispatch = useDispatch();
  const { detailTracks } = useSelector((state) => state.music);
  const { user } = useSelector((state) => state.user);

  const [ open, setOpen ] = useState(false)

  const [allSongs, setAllSongs] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getTrackId(id));
  }, [dispatch, id]);

  useEffect(() => {
    setAllSongs(Object.values(detailTracks));
  }, [detailTracks]);

  useEffect(() => {
    if(allSongs.length){
      dispatch(setPlaylist(allSongs[1]));
    }
  }, [dispatch, allSongs]);

  return (
    <div>
      <PopupPremium
        open={open}
        onClose={() => setOpen(false)}
        user={user}
        imagen={allSongs[0] ? allSongs[0][0].images : ""}
      />
      {Object.keys(user).length ? (
        <PopupPremium imagen={allSongs[0] ? allSongs[0][0].images : ""} user={user} />
      ) : (
        <PopupLogin
          open={open}
          onClose={() => setOpen(false)}
          imagen={allSongs[0] ? allSongs[0][0].images : ""}
        />
      )}
      {Object.keys(user).length ? <NavBarLandingOn /> : <NavBarLandingOff />}
      <DetailAll arr={allSongs} />
      <Player open={() => setOpen(true)}/>
    </div>
  );
}
