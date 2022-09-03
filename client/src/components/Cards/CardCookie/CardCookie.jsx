import s from "./cardcookie.module.css";
import { useCookies } from "react-cookie";
import { BiCookie } from "react-icons/bi";

export default function CardCookie() {
  const [cookie, setCookie] = useCookies();

  return (
    <div className={cookie.accessCookie ? `${s.cookie} ${s.close}` : s.cookie}>
      <p className={s.title}>
        <BiCookie />Éste sitio web usa cookies.
      </p>
      {Object.keys(cookie).length
        ? <button
            onClick={() => setCookie('accessCookie', true, {path: '/'})}
          >
            Aceptar y cerrar éste mensaje
          </button>
        : <div>
          <p>Si ve este mensaje significa que tiene bloqueada las cookies.</p>
          <p>Habilite las cookies y vuelva a cargar la pagina.</p>
          </div>
      }
    </div>
  )
}
