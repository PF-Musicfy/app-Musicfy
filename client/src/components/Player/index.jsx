import './player.css';
import { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause } from "react-icons/fa"
import toMinutes from '../../utils/toMinutes.js';
import { IconContext } from "react-icons";

//const url = "https://cdn.pixabay.com/download/audio/2022/08/02/audio_884fe92c21.mp3"
const url = "https://ia800504.us.archive.org/33/items/TetrisThemeMusic/Tetris.mp3"

export default function Player(){
  const [isPlaying, setIsPlaying] = useState(false);
  const [dataSong, setDataSong] = useState({});
  
  const audioElem = useRef();
  const progressBar = useRef();

  useEffect(() => {
    if(isPlaying){
      audioElem.current.play();
      audioElem.current.volume = 0.1;
    }else{
      audioElem.current.pause()
    }
  }, [isPlaying])

  const onPlaying = () => {
    const duration = Math.floor(audioElem.current.duration);
    const ct = Math.floor(audioElem.current.currentTime);

    setDataSong({
      current: ct,
      length: duration
    })

    progressBar.current.value = ct;
    progressBar.current.max = duration;
  }

  const changeRange = () => {
    audioElem.current.currentTime = progressBar.current.value;
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
        onChange={changeRange}
      />
      <IconContext.Provider value={{className: 'react-icons'}}>
      <div className="player-tools">
        <button
          className="player-button"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <span>
          {toMinutes(dataSong.current)}/{toMinutes(dataSong.length)}
        </span>
      </div>
      </IconContext.Provider>
    </div>
  )
}
