import { useEffect, useRef } from 'react';

import s from './popup.module.css';

export default function Popup({ open, onClose, children }){
  const ref = useRef();

  useEffect(() => {
    const clickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [onClose])

  if(!open) return null;

  return (
    <div className={s.popup}>
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
