import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import s from "./detail.module.css";
import sLight from "./detailsLight.module.css";
import { AiFillHeart } from "react-icons/ai";
import toMinutes from "../../utils/toMinutes.js";
import { getTrackId, clearObject } from "../../store/slice";
import { setActual, setPlaylist } from "../../store/slice/player.js";
import { favoritesUser, userTokenInfo, musicPlaylist } from "../../store/slice/user";
import Player from "../Player";
import { PopupLogin, PopupPremium } from "../Popup";
import NavBarLandingOn from "../LandingPage/NavBarLandingOn";
import NavBarLandingOff from "../LandingPage/NavBarLandingOff";
import Swal from "sweetalert2";
import { BsThreeDots } from "react-icons/bs";
import MenuTresPuntos from "./MenuTresPuntos";

function DetailTable({ e }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [modal, setModal] = useState(false);
  const theme = localStorage.getItem("theme");

  const toggleModal = () => {
    setModal(!modal);
  };

  // ---- TOAST ALERT ----
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
  });

  // ---- TOAST ALERT ----

  useEffect(() => {
    dispatch(userTokenInfo());
  }, [dispatch]);

  const getTracksFavorites = () => {
    dispatch(favoritesUser(e));
    Toast.fire({
      icon: "success",
      title: "The song has added to favorites"
    });
  };

  // const addMusicPlaylist = () => {
  //   dispatch(musicPlaylist())
  // }

  return (
    <>
      <tr className={theme === "light" ? sLight.row : s.row}>
        <td>
          <button
            className={theme === "light" ? (user.premium ? "" : sLight.invisible) : user.premium ? "" : s.invisible}
            onClick={() => dispatch(setActual(e))}
          >
            <FaPlay className={theme === "light" ? sLight.iconFlaplay : s.iconFlaplay} />
          </button>
        </td>
        <td className={theme === "light" ? sLight.text : s.text}>
          <span className={theme === "light" ? sLight.titleSong : s.titleSong}>{e.name}</span>
          <br />
          <span className={theme === "light" ? sLight.artistSong : s.artistSong}>{e.artistName}</span>
        </td>
        <td>
          {/* {color ? ( */}
          <AiFillHeart
            className={theme === "light" ? sLight.favorites : s.favorites}
            onClick={() => getTracksFavorites()}
          />
        </td>
        <td>
          <p>{toMinutes(e.playbackSeconds)}</p>
        </td>
        <td>
          <span className={theme === "light" ? sLight.trespuntitos : s.trespuntitos}>
            <BsThreeDots onClick={() => toggleModal()} />
          </span>
          {modal && (
            <div className={theme === "light" ? sLight.mainContainerModal : s.mainContainerModal}>
              <div className={theme === "light" ? sLight.containerModal : s.containerModal}>
                <MenuTresPuntos setModal={setModal} />
              </div>
            </div>
          )}
        </td>
      </tr>
    </>
  );
}
function DetailAll({ arr }) {
  const theme = localStorage.getItem("theme");

  return (
    <div className={theme === "light" ? sLight.detail : s.detail}>
      {arr[0]?.map((e, i) => (
        <div key={i}>
          <div className={theme === "light" ? sLight.front : s.front}>
            <img src={e.images} alt={e.name} className={theme === "light" ? sLight.img : s.img} />
            <div className={theme === "light" ? sLight.containerTapaTitulo : s.containerTapaTitulo}>
              <span className={theme === "light" ? sLight.nameInfo : s.nameInfo}>{e.name}</span>
              <span className={theme === "light" ? sLight.albumNameInfo : s.albumNameInfo}>{e.albumName}</span>
              <span className={theme === "light" ? sLight.artisNameInfo : s.artisNameInfo}>{e.artistName}</span>
            </div>
          </div>
        </div>
      ))}
      <div className={theme === "light" ? sLight.scroll : s.scroll}>
        <table className={theme === "light" ? sLight.table : s.table}>
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
    dispatch(clearObject());
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
