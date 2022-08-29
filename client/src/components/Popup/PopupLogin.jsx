import { useNavigate } from "react-router-dom";

import s from './popup.module.css';
import Popup from './Popup.jsx';

export default function PopupLogin({ imagen }){
  const navigate = useNavigate();

  return (
    <Popup>
      <div className={s.logo}>
        <img
          src={ imagen || 'https://i.imgur.com/GiyjGcI.png' }
          alt='Musicfy Logo'
        />
      </div>
      <div className={s.info}>
        <p>Empieza a escuchar musica con Musicfy</p>
        <div>
          <button
            onClick={() => navigate('/register')}
          >
            Registrate Gratis
          </button>
        </div>
        <div className={s.login}>
          <span>¿Ya tienes cuenta?</span>
          <button
            onClick={() => navigate('/login')}
          >
            Inicia sesion
          </button>
        </div>
      </div>
    </Popup>
  )
}
