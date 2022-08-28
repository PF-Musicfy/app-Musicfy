import { useRef, useState, useEffect } from 'react';
import { IconContext } from "react-icons";
import { FaPlay, FaPause, FaVolumeDown } from "react-icons/fa"
import { useSelector } from "react-redux";

import './player.css';
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
    <div className="player">
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
      <IconContext.Provider value={{className: 'player-icons'}}>
      <div className="player-controls">
        <div className="player-tools">
          <button className="player-button"
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
        <div className="player-info">
          <img src={allSongs[0] ? allSongs[0][0].images : ''} alt='' />
          <div>
          <p>Name: {music.name || ''}</p>
          <p>Artist: {music.artistName || ''}</p>
          </div>
        </div>
        <div>
          <input
            className='player-volume'
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
      </div>
      </IconContext.Provider>
    </div>
  )
}
