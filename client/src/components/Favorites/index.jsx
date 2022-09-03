import React from 'react'
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import s from "./favoritos.module.css"
import { setActual, setPlaylist } from "../../store/slice/player.js";
import { FaPlay} from "react-icons/fa"
import toMinutes from '../../utils/toMinutes.js'
import Player from "../Player";
import { PopupPremium } from "../Popup";

function DetailTable({ e }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  return (
    <tr className={s.row}>
      <td>
        <button
          className={user.premium ? '' : s.invisible}
          onClick={() => dispatch(setActual(e))}
        >
          <FaPlay />
        </button>
      </td>
      <td className={s.text}>
        <p>{e.name}</p>
        <p>{e.artistName}</p>
        <p>{toMinutes(e.playbackSeconds)}</p>
      </td>
    </tr>
  );
}

export default function Favorites(){
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user)
    const [ open, setOpen ] = useState(false)
    
    console.log(user.username)
    console.log(user.favorites)//[{},{},{}]

    useEffect(() => {
      if(user.favorites.length){
        dispatch(setPlaylist(user.favorites));
      }
    }, [dispatch]);

    return(
        <>
          <PopupPremium
            open={open}
            onClose={() => setOpen(false)}
            user={user}
            imagen="https://i.imgur.com/GiyjGcI.png"
          />
          <table className={s.table}>
            <tbody>
            {user === undefined
              ? ''
              : user.favorites?.map((e, i) => (
                  <DetailTable key={i} e={e} />
                ))
            }
            </tbody>
          </table>
          <Player open={() => setOpen(true)}/>
        </>
    )
}