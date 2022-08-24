import Popup from './index.js';
import '../../styles/popup.css';
import { useNavigate } from "react-router-dom";

export default function PopupLogin(){
  const navigate = useNavigate();

  return (
    <Popup>
      <div className='pp-logo'>
        <img
          src='https://i.imgur.com/GiyjGcI.png'
          alt='Musicfy Logo'
        />
      </div>
      <div className='pp-info'>
        <p>Empieza a escuchar musica con Musicfy</p>
        <div>
          <button
            onClick={() => navigate('/register')}
          >
            Registrate Gratis
          </button>
        </div>
        <div className='pp-login'>
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
