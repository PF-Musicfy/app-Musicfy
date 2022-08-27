import { useRef, useState, useEffect } from 'react';
import { IconContext } from "react-icons";
import { FaPlay, FaPause, FaVolumeDown } from "react-icons/fa"

import './player.css';
import toMinutes from '../../utils/toMinutes.js';

const url = "https://ia800504.us.archive.org/33/items/TetrisThemeMusic/Tetris.mp3"

export default function Player({ detail, music }){
  const [dataSong, setDataSong] = useState({});
  const [listSong, setListSong] = useState([]);
 
  const audioElem = useRef();
  const progressBar = useRef();
  const volumeBar = useRef();

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audioElem.current.play();
    audioElem.current.volume = 0.1;
    setListSong([music])
  }, [music])

  useEffect(() => {
    audioElem.current.play();
    audioElem.current.volume = 0.1;
  }, [listSong])

  useEffect(() => {
    if(isPlaying){
      audioElem.current.play();
      audioElem.current.volume = 0.1;
    }else{
      audioElem.current.pause()
    }
    console.log('detail',detail);
    console.log('list',listSong);
  }, [isPlaying])

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
  const adelantar = () => {
    const index = detail.tracksMusic.indexOf(listSong[0]);
    setListSong([detail.tracksMusic[index + 1]])
    audioElem.current.play();
    audioElem.current.volume = 0.1;
    console.log('index',listSong);
  }

  return (
    <div className="player">
      <audio
        ref={audioElem}
        src={(listSong.length
              ? listSong[0].previewURL
              :  music.previewURL) || url}
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
            onClick={adelantar}
          >
            +1
          </button>
          <button
            className="player-button"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <span>
            {dataSong.current || '0:00'}/{dataSong.length || '0:00'}
          </span>
        </div>
        <div className="player-info">
          {/*<img
            src={
              Object.keys(detail).length
              ? detail.track[0]?.images || detail.album[0].images
              : ''
            }
            alt='' 
          />*/}
          <div>
          <p>Name: {(listSong.length
              ? listSong[0].name
              :  music.name)}</p>
          <p>Artist Name: {(listSong.length
              ? listSong[0].artistName
              :  music.artistName)}</p>
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
