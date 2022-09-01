import { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeDown } from "react-icons/fa"
import { IoPlayForward, IoPlayBack, IoShuffle } from "react-icons/io5"
import { TbRepeat, TbRepeatOff } from "react-icons/tb"
import { useDispatch, useSelector } from "react-redux";
import { forwardPlaylist, backPlaylist, randomPlaylist } from "../../store/slice/player.js";

import s from './player.module.css';
import toMinutes from '../../utils/toMinutes.js';

const url = "https://ia800504.us.archive.org/33/items/TetrisThemeMusic/Tetris.mp3"

export default function Player({ open }){
  const { detailTracks } = useSelector((state) => state.music);
  const { actual } = useSelector((state) => state.player);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [dataSong, setDataSong] = useState({});
  const [allSongs, setAllSongs] = useState([]);
  const [count, setCount] = useState(0);
 
  const audioElem = useRef();
  const progressBar = useRef();
  const volumeBar = useRef();

  useEffect(() => {
    if(!Object.keys(actual).length) return;

    audioElem.current.play();
    audioElem.current.volume = 0.1;
  }, [actual])

  useEffect(() => {
    setAllSongs(Object.values(detailTracks));
  }, [detailTracks])

  const onPlaying = () => {
    const duration = Math.floor(audioElem.current.duration);
    const ct = Math.floor(audioElem.current.currentTime);

    setDataSong({
      current: toMinutes(ct),
      length: toMinutes(duration)
    })

    progressBar.current.value = ct;
    progressBar.current.max = duration;

    volumeBar.current.value = audioElem.current.volume * 10;
  }

  return (
    <div className={s.container}>
      <audio
        ref={audioElem}
        src={actual.previewURL || url}
        onTimeUpdate={onPlaying}
      >
      </audio>
      <input
        type='range'
        defaultValue="0"
        ref={progressBar}
        onChange={() => audioElem.current.currentTime = progressBar.current.value}
      />
      {actual.name ?
      <div className={s.controls}>
        <div className={s.tools}>
          <div className={s.options}>
            {user.premium ?
              <button className={s.button} onClick={() => dispatch(backPlaylist(actual))}>
                <IoPlayBack />
              </button>
            : ''}
            <button className={s.button}
              onClick={() => {
                if(audioElem.current){
                  if(audioElem.current.paused){
                    audioElem.current.play()
                  }else{
                    audioElem.current.pause()
                  }
                }
              }} >
              {audioElem.current
                ? (audioElem.current.paused ? <FaPlay /> : <FaPause />) 
                : ''
              }
            </button>
            {user.premium ?
              <button className={s.button} onClick={() => dispatch(forwardPlaylist(actual))}>
                <IoPlayForward />
              </button>
            : ''}
            <p>{dataSong.current || '0:00'}/{dataSong.length || '0:00'}</p>
          </div>
        </div>
        <div className={s.info}>
          <img src={allSongs[0] ? allSongs[0][0].images : ''} alt='' />
          <div>
            <p className={s.name}>Name: {actual.name}</p>
            <p>Artist: {actual.artistName}</p>
          </div>
        </div>
        <div className={s.extra}>
          <div className={s.volumen}>
            <input
              type='range'
              defaultValue="0"
              max='10'
              ref={volumeBar}
              onChange={() => {
                audioElem.current.volume = volumeBar.current.value/10;
              }}
            />
            <FaVolumeDown />
          </div>
          {user.premium ?
            <button className={s.button}
              onClick={() => {audioElem.current.loop = !audioElem.current.loop}}
            >
              {audioElem.current ?
                (audioElem.current.loop ? <TbRepeat /> : <TbRepeatOff />) : 'loop'}
            </button>
          : ''}
          <button className={s.button} onClick={() => {
            dispatch(randomPlaylist())
            if(count === 3){
              open();
              setCount(0);
            }
            setCount(count => count+1)
          }}>
            <IoShuffle />
          </button>
        </div>
      </div>
      :
      <>
        <p className={s.msg}>
          {Object.keys(user).length
            ? <> <span>empieza a escuchar => </span>
              <button className={s.button} onClick={() => dispatch(randomPlaylist())}>
                <IoShuffle />
              </button></>
            : 'Logeate para escuchar musica en Musicfy'
          }
        </p>
      </>
      }
    </div>
  )
}
