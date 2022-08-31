import { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeDown } from "react-icons/fa"
import { IoPlayForward, IoRepeatSharp } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux";
import { goPlaylist } from "../../store/slice/player.js";

import s from './player.module.css';
import toMinutes from '../../utils/toMinutes.js';

const url = "https://ia800504.us.archive.org/33/items/TetrisThemeMusic/Tetris.mp3"

export default function Player(){
  const { detailTracks } = useSelector((state) => state.music);
  const { actual } = useSelector((state) => state.player);
  const dispatch = useDispatch();

  const [dataSong, setDataSong] = useState({});
  const [allSongs, setAllSongs] = useState([]);
 
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
        onPlay={() => {console.log('play')}}
        onPause={() => {console.log('pause')}}
      >
      </audio>
      <input
        type='range'
        defaultValue="0"
        ref={progressBar}
        onChange={() => {
          audioElem.current.currentTime = progressBar.current.value;
        }}
      />
      <div className={s.controls}>
        <div className={s.tools}>
          <button className={s.button}
            onClick={() => {
              audioElem.current.loop = !audioElem.current.loop
              console.log(audioElem.current.loop);
            }}
          >
            {audioElem.current ?
              (audioElem.current.loop ? 'on' : 'off') : 'loop'}
              <IoRepeatSharp />
          </button>
          <button className={s.button}
            onClick={() => {
              dispatch(goPlaylist(actual));
            }}
          >
            <IoPlayForward />
          </button>
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
          <span>{dataSong.current || '0:00'}/{dataSong.length || '0:00'}</span>
        </div>
        <div className={s.info}>
          {actual.name ? 
            <>
              <img src={allSongs[0] ? allSongs[0][0].images : ''} alt='' />
              <div>
                <p>Name: {actual.name}</p>
                <p>Artist: {actual.artistName}</p>
              </div>
            </>
          : <p>selecciona una cancion</p>
          }
        </div>
        <div>
          <input
            className={s.volume}
            type='range'
            defaultValue="0"
            max='10'
            ref={volumeBar}
            onChange={() => {
              audioElem.current.volume = volumeBar.current.value/10;
            }}
          />
          <FaVolumeDown style={{display: 'inline'}}/>
        </div>
      </div>
    </div>
  )
}
