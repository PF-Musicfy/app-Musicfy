import { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeDown } from "react-icons/fa"
import { useSelector } from "react-redux";

import s from './player.module.css';
import toMinutes from '../../utils/toMinutes.js';

const url = "https://ia800504.us.archive.org/33/items/TetrisThemeMusic/Tetris.mp3"

export default function Player({ detail, music }){
  const { detailTracks } = useSelector((state) => state.music);

  const [dataSong, setDataSong] = useState({});
  const [allSongs, setAllSongs] = useState([]);
 
  const audioElem = useRef();
  const progressBar = useRef();
  const volumeBar = useRef();

  useEffect(() => {
    if(!Object.keys(music).length) return;

    audioElem.current.play();
    audioElem.current.volume = 0.1;
  }, [music])

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
        src={music.previewURL || url}
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
          <img src={allSongs[0] ? allSongs[0][0].images : ''} alt='' />
          <div>
          {music.name ? 
            <>
            <p>Name: {music.name}</p>
            <p>Artist: {music.artistName}</p>
            </>
          : <p>selecciona una cancion</p>
          }
          </div>
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
