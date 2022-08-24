import Popup from './Popup.jsx';
import s from './popup.module.css';

export default function PopupExample(){
  return (
    <Popup>
      <div className={s.logo}>
        <img src='' alt='Musicfy Logo' />
      </div>
      <div className={s.info}>
        <p>Empieza a escuchar musica con Musicfy</p>
        <div>
          <button>Registrate Gratis</button>
        </div>
        <div className={s.login}>
          <span>¿Ya tienes cuenta?</span>
          <button>Inicia sesion</button>
        </div>
      </div>
    </Popup>
  )
}
