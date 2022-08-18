import './player.css';
import {useRef, useState, useEffect} from 'react';

export default function Player(){
  const audioElem = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [dataSong, setDataSong] = useState({});

  useEffect(() => {
    if(isPlaying){
      audioElem.current.play()
    }else{
      audioElem.current.pause()
    }
  }, [isPlaying])

  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;

    setDataSong({
      progress: Math.floor(ct / duration * 100),
      current: Math.floor(ct),
      length: Math.floor(duration)
    })
  }

  const formatTime = (seconds) => {
    if(isNaN(seconds)) return '0:00';

    const minute = Math.floor((seconds / 60) % 60);

    let second = seconds % 60;
    second = (second < 10)? '0' + second : second;

    return minute + ':' + second;
  }

  return (
    <div className="player">
      <audio
        src="https://ia800504.us.archive.org/33/items/TetrisThemeMusic/Tetris.mp3"
        controls
        muted
        ref={audioElem}
        onTimeUpdate={onPlaying}
      >
      </audio>
      <button
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? 'pause' : 'play'}
      </button>
      <p>porcentaje (ranger): {dataSong.progress}%</p>
      <input type='range' />
      <p>actual: {formatTime(dataSong.current)}</p>
      <p>tiempo: {formatTime(dataSong.length)}</p>
    </div>
  )
}
