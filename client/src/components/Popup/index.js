import './popup.css';
import { useEffect, useState, useRef } from 'react';

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
    <div className={`popup ${isOpen || 'pp-visible'}`}>
      <div
        ref={ref}
        className='popup-container'
      >
        <div className='popup-content'>
          {children}
        </div>
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
      >
        cerrar
      </button>
    </div>
  )
}
