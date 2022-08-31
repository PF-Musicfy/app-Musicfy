import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrackId } from "../../store/slice";
import { setActual, setPlaylist } from "../../store/slice/player.js";
import { useParams } from "react-router-dom";
import "./index.css";
import Player from "../Player";
import { PopupLogin, PopupPremium } from "../Popup";
import NavBarLandingOn from "../LandingPage/NavBarLandingOn";
import NavBarLandingOff from "../LandingPage/NavBarLandingOff";
import toMinutes from '../../utils/toMinutes.js';

function DetailFront({ e }) {
  return (
    <div className="containerMusic">
      <img src={e.images} alt={e.name} className="containerImg" />
      <div className="containerInfo">
        <h1>{e.name}</h1>
        <h2>{e.albumName}</h2>
        <h2>{e.artistName}</h2>
      </div>
    </div>
  );
}
function DetailList({ e }) {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="divTracks">
        <li className="liTracks">
          <div className="containerLi">
            <button className="btn-detail" onClick={() => {
              dispatch(setActual(e))
            }}>
              <div className="arrow-up"></div>
            </button>
            <p className="name">{e.name}</p>
            <p className="artistName">{e.artistName}</p>
            <p className="seconds">{toMinutes(e.playbackSeconds)}</p>
          </div>
        </li>
      </div>
    </div>
  );
}
function DetailAll({ arr }) {
  return (
    <>
      {arr[0]?.map((e, id) => (
        <DetailFront key={id} e={e} />
      ))}
      {arr[1]?.map((e, id) => (
        <DetailList key={id} e={e} />
      ))}
    </>
  );
}

export default function Detail() {
  const dispatch = useDispatch();
  const { detailTracks } = useSelector((state) => state.music);
  const { user } = useSelector((state) => state.user);

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
    <>
      {Object.keys(user).length ? <NavBarLandingOn /> : <NavBarLandingOff />}
      <div className="allcontainer">
        {Object.keys(user).length ? (
          <PopupPremium imagen={allSongs[0] ? allSongs[0][0].images : ""} user={user} />
        ) : (
          <PopupLogin imagen={allSongs[0] ? allSongs[0][0].images : ""} />
        )}
        <DetailAll arr={allSongs} />
        <Player />
      </div>
    </>
  );
}
