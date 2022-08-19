import './popup.css';
import {useState} from 'react';

export default function Popup({children}){
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`popup ${isOpen || 'pp-visible'}`}
    >
      <div
        className='popup-container'
      >
        Popup Modal - v2.0
        <hr></hr>
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
