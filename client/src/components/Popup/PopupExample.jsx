import Popup from './index.js';
import '../../styles/popup.css';

export default function PopupExample(){
  return (
    <Popup>
      <div className='pp-logo'>
        <img src='' alt='Musicfy Logo' />
      </div>
      <div className='pp-info'>
        <p>Empieza a escuchar musica con Musicfy</p>
        <div>
          <button>Registrate Gratis</button>
        </div>
        <div className='pp-login'>
          <span>¿Ya tienes cuenta?</span>
          <button>Inicia sesion</button>
        </div>
      </div>
    </Popup>
  )
}
