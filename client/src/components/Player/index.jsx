import { useRef, useState, useEffect } from 'react';
import { IconContext } from "react-icons";
import { FaPlay, FaPause, FaVolumeDown } from "react-icons/fa"

import './player.css';
import toMinutes from '../../utils/toMinutes.js';
import { PopupLogin } from "../Popup";

const url = "https://ia800504.us.archive.org/33/items/TetrisThemeMusic/Tetris.mp3"

const usePlayerRef = (ref) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if(isPlaying){
      ref.current.play();
      ref.current.volume = 0.1;
    }else{
      ref.current.pause()
    }
  }, [isPlaying, ref])

  const changeState = () => {
    setIsPlaying(!isPlaying)
  }

  return { isPlaying, changeState };
}

export default function Player({ music }){
  const [dataSong, setDataSong] = useState({});
 
  const audioElem = useRef();
  const progressBar = useRef();
  const volumeBar = useRef();

  const { isPlaying, changeState } = usePlayerRef(audioElem);

  useEffect(() => {
    audioElem.current.play();
    audioElem.current.volume = 0.1;
  }, [music])

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
      {isPlaying ? '' : <PopupLogin image={''}/>}
      <audio
        src={music.previewURL || url}
        ref={audioElem}
        onTimeUpdate={onPlaying}
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
          <button
            className="player-button"
            onClick={changeState}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <span>
            {dataSong.current || '0:00'}/{dataSong.length || '0:00'}
          </span>
        </div>
        <div>
          <p>Name: {music.name}</p>
          <p>Artist Name: {music.artistName}</p>
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
