import s from "./navbar.module.css";
import { Link } from "react-router-dom";

import DropDown from "./DropDown"

export default function Navbar({ children }) {
  return (
    <div className={s.containerNavbar}>
      <div>
        <Link to="/" className={s.logo}>
          <img className={s.logoImg} src="https://i.imgur.com/GiyjGcI.png" alt="Musicfy Logo" />
          <span className={s.logoTxt}>MusicFy</span>
        </Link>
      </div>
      <nav className={s.navbar}>
        {children}
        <DropDown />
      </nav>
    </div>
  );
}
