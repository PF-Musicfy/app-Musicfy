import { useEffect, useState, useRef } from 'react';

import s from './popup.module.css';

export default function Popup({children}){
  const [isOpen, setIsOpen] = useState(true);
  const ref = useRef();

  useEffect(() => {
    const clickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [])

  return (
    <div className={`${s.popup} ${isOpen || s.visible}`}>
      <div
        ref={ref}
        className={s.container}
      >
        <div className={s.content}>
          {children}
        </div>
      </div>
    </div>
  )
}
      //<button
      //  onClick={() => setIsOpen(!isOpen)}
      //>
      //  cerrar
      //</button>
