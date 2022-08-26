import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrackId } from "../../store/slice";
import { useParams } from "react-router-dom";
import "./index.css";
import Player from "../Player";

function DetailFront({e}) {
  return (
    <div className="containerMusic">
      <img src={e.images} alt={e.name} className="containerImg" />
      <div className="containerInfo">
        <h1>{e.name}</h1>
        <h2>{e.albumName}</h2>
        <h2>{e.artistName}</h2>
      </div>
    </div>
  )
}
function DetailList({e, setEvoker}) {
  return (
    <div>
      <div className="divTracks">
        <li className="liTracks">
          <div className="containerLi">
            <button className="btn-detail" onClick={() => setEvoker(e)}>
              <div className="arrow-up"></div>
            </button>
            <p className="name">{e.name}</p>
            <p className="artistName">{e.artistName}</p>
            <p className="seconds">{e.playbackSeconds}</p>
          </div>
        </li>
      </div>
    </div>
  )
}
function DetailAll({a,setEvoker}) {
  const arr = Object.values(a);
  return (
    <>
    {arr[0]?.map((e, id) => (
      <DetailFront key={id} e={e} />
    ))}
    {arr[1]?.map((e, id) => (
      <DetailList key={id} e={e} setEvoker={setEvoker}/>
    ))}
    </>
  )
}

export default function Detail() {
  const dispatch = useDispatch();
  const { detailTracks } = useSelector((state) => state.music);
  const [evoker, setEvoker] = useState({});

  const { id } = useParams();

  useEffect(() => {
    dispatch(getTrackId(id));
  }, [dispatch, id]);

  return (
<<<<<<< HEAD
    <div className="allcontainer">
      {detailTracks.track?.map((e, id) => {
        return (
          <div key={id} className="containerMusic">
            <img src={e.images} alt={e.name} className="containerImg" />
            <div className="containerInfo">
              <h1>{e.name}</h1>
              <h2>{e.albumName}</h2>
              <h2>{e.artistName}</h2>
            </div>
          </div>
        );
      })}

      {detailTracks.tracksMusic?.map((e, id) => {
        return (
          <div key={id}>
            <div className="divTracks">
              <li className="liTracks">
                <div className="containerLi">
                  <button className="btn-detail" onClick={() => setEvoker(e)}>
                    <div className="arrow-up"></div>
                  </button>
                  <p className="name">{e.name}</p>
                  <p className="artistName">{e.artistName}</p>
                  <p className="seconds">{e.playbackSeconds}</p>
                </div>
              </li>
            </div>
          </div>
        );
      })}

      {detailTracks.album?.map((e, id) => {
        return (
          <div key={id} className="containerMusic">
            <img src={e.images} alt={e.name} className="containerImg" />
            <div className="containerInfo">
              <h1>{e.name}</h1>
              <h2>{e.albumName}</h2>
              <h2>{e.artistName}</h2>
            </div>
          </div>
        );
      })}

      {detailTracks.albumMusic?.map((e, id) => {
        return (
          <div key={id}>
            <div className="divTracks">
              <li className="liTracks">
                <div className="containerLi">
                  <button onClick={() => setEvoker(e)}>
                    <div className="arrow-up"></div>
                  </button>
                  <p className="name">{e.name}</p>
                  <p className="artistName">{e.artistName}</p>
                  <p className="seconds">{e.playbackSeconds}</p>
                </div>
              </li>
            </div>
          </div>
        );
      })}

      {detailTracks.artist?.map((e, id) => {
        return (
          <div key={id} className="containerMusic">
            <img src={e.images} alt={e.name} className="containerImg" />
            <div className="containerInfo">
              <h1>{e.name}</h1>
              <h2>{e.albumName}</h2>
              <h2>{e.artistName}</h2>
            </div>
          </div>
        );
      })}

      {detailTracks.artistMusic?.map((e, id) => {
        return (
          <div key={id}>
            <div className="divTracks">
              <li className="liTracks">
                <div className="containerLi">
                  <button onClick={() => setEvoker(e)}>
                    <div className="arrow-up"></div>
                  </button>
                  <p className="name">{e.name}</p>
                  <p className="artistName">{e.artistName}</p>
                  <p className="seconds">{e.playbackSeconds}</p>
                </div>
              </li>
            </div>
          </div>
        );
      })}

      {detailTracks.playlist?.map((e, id) => {
        return (
          <div key={id} className="containerMusic">
            <img src={e.images} alt={e.name} className="containerImg" />
            <div className="containerInfo">
              <h1>{e.name}</h1>
              <h2>{e.albumName}</h2>
              <h2>{e.artistName}</h2>
            </div>
          </div>
        );
      })}

      {detailTracks.playlistMusic?.map((e, id) => {
        return (
          <div key={id}>
            <div className="divTracks">
              <li className="liTracks">
                <div className="containerLi">
                  <button onClick={() => setEvoker(e)}>
                    <div className="arrow-up"></div>
                  </button>
                  <p className="name">{e.name}</p>
                  <p className="artistName">{e.artistName}</p>
                  <p className="seconds">{e.playbackSeconds}</p>
                </div>
              </li>
            </div>
          </div>
        );
      })}
      <Player music={evoker} />
=======
    <div>
      <Player detail={detailTracks} music={evoker} />
      <DetailAll a={detailTracks} setEvoker={setEvoker}/>
>>>>>>> 7445e76ec24f05b7be70c5fd425912dfc869848d
    </div>
  );
}
