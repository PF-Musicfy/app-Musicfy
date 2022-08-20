import './player.css';
import { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause } from "react-icons/fa"
import toMinutes from '../../utils/toMinutes.js';
import { IconContext } from "react-icons";

//const url = "https://cdn.pixabay.com/download/audio/2022/08/02/audio_884fe92c21.mp3"
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

export default function Player(){
  const [dataSong, setDataSong] = useState({});
 
  const audioElem = useRef();
  const progressBar = useRef();

  const { isPlaying, changeState } = usePlayerRef(audioElem);

  const onPlaying = () => {
    const duration = Math.floor(audioElem.current.duration);
    const ct = Math.floor(audioElem.current.currentTime);

    setDataSong({
      current: toMinutes(ct),
      length: toMinutes(duration)
    })

    progressBar.current.value = ct;
    progressBar.current.max = duration;
  }

  return (
    <div className="player">
      <audio
        src={url}
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
      <IconContext.Provider value={{className: 'react-icons'}}>
      <div className="player-tools">
        <button
          className="player-button"
          onClick={changeState}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <span>
          {dataSong.current}/{dataSong.length}
        </span>
      </div>
      </IconContext.Provider>
    </div>
  )
}
