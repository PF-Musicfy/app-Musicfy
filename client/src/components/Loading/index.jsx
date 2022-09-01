import s from './loading.module.css';
import { Popup } from "../Popup";
import { useState } from "react";

export default function Loading({ text }){
  const [ open, setOpen ] = useState(false)

  return (
    <div className={s.container}>
      {text || 'Loading'}
      <div className={s.spinner}>
      </div>

      <button onClick={() => setOpen(true)}>
        abrir
      </button>
      <Popup
        open={open}
        onClose={() => setOpen(false)}
      >
        hola
      </Popup>
    </div>
  )
}
