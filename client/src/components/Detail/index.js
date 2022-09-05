import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import s from "./detail.module.css";
import { AiFillHeart } from "react-icons/ai";
import toMinutes from "../../utils/toMinutes.js";
import { getTrackId } from "../../store/slice";
import { setActual, setPlaylist } from "../../store/slice/player.js";
import { favoritesUser } from "../../store/slice/user"
import Player from "../Player";
import { PopupLogin, PopupPremium } from "../Popup";
import NavBarLandingOn from "../LandingPage/NavBarLandingOn";
import NavBarLandingOff from "../LandingPage/NavBarLandingOff";
import { userTokenInfo } from "store/slice/user"

// const colorLocal = JSON.parse(localStorage.getItem('favorites')|| true)

function DetailTable({ e }) {
  // const [color, setColor] = useState(true);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);


  
  useEffect(()=> {
    dispatch(userTokenInfo())
  },[dispatch])

  const getTracksFavorites = () => {
      dispatch(favoritesUser(e))
  }


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
        {/* {color ? ( */}
          <AiFillHeart className={s.favorites} onClick={() => getTracksFavorites()} />
        {/* ) : (
          <AiFillHeart className={s.favorites1} onClick={() => getTracksFavorites()} />
        )} */}
        {/* <FaRegHeart className={s.favorites} onClick={()=> getTracksFavorites()}/> */}
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
            <span className={s.nameInfo}>{e.name}</span>
            <br />
            <span className={s.albumNameInfo}>{e.albumName}</span>
            <br />
            <span className={s.artisNameInfo}>{e.artistName}</span>
          </div>
          <img src={e.images} alt={e.name} className={s.img} />
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
  const [open, setOpen] = useState(false);
  const [allSongs, setAllSongs] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getTrackId(id));
  }, [dispatch, id]);

  useEffect(() => {
    setAllSongs(Object.values(detailTracks));
  }, [detailTracks]);

  useEffect(() => {
    if (allSongs.length) {
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
        <PopupLogin open={open} onClose={() => setOpen(false)} imagen={allSongs[0] ? allSongs[0][0].images : ""} />
      )}
      {Object.keys(user).length ? <NavBarLandingOn /> : <NavBarLandingOff />}
      <DetailAll arr={allSongs} />
      <Player open={() => setOpen(true)} />
    </div>
  );
}
