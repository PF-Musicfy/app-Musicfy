import s from "./navbar.module.css";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

import DropDown from "./DropDown"
import { useSelector } from "react-redux";

export default function Navbar({ children }) {
  const { user } = useSelector(state => state.user);

  return (
    <div className={s.containerNavbar}>
      <div>
        <Link to="/" className={s.logo}>
          <img className={s.logoImg} src="https://i.imgur.com/GiyjGcI.png" alt="Musicfy Logo" />
          <span className={s.logoTxt}>MusicFy</span>
        </Link>
      </div>
      <nav className={s.navbar}>
        {Object.keys(user).length
        ? <>
            <Link to='/'>Home</Link>
            <Link to='/feedback'>Feedback</Link>
            <Link to='/favorites'>Favorites</Link>
          </>
        : <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </>
        }
        <DropDown />
        {children}
      </nav>
    </div>
  );
}
