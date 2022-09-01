import { useNavigate } from "react-router-dom";

import s from './popup.module.css';
import Popup from './Popup.jsx';

export default function PopupPremium({ open, onClose, imagen , user }){
  const navigate = useNavigate();

  return (
    <Popup
      open={open}
      onClose={onClose}
    >
      <div className={s.logo}>
        <img
          src={ imagen || 'https://i.imgur.com/GiyjGcI.png' }
          alt='Musicfy Logo'
        />
      </div>
      <div className={s.info}>
        <p>Reproduce música sin anuncios.</p>
        <div>
          <button
            onClick={() => navigate('/premium')}
          >
            pasate a Premium
          </button>
        </div>
      </div>
    </Popup>
  )
}
