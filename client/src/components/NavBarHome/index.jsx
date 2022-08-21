import { FaBars, FaTimes } from "react-icons/fa";
import "./NavBarHome.css";
import imagen from "./img_avatar.png";
import { useRef, useState } from "react";
import imagen2 from "./WJT6FaB.png";

export default function NavBarHome() {
  const [profile, setProfile] = useState(false);
  const [logged, setLogged] = useState(true);
  const navRef = useRef();
  const showNavBar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  function handleClick() {
    setProfile(!profile);
  }
  function handleLog() {
    setLogged(!logged);
  }

  return (
    <div>
      {logged ? (
        <div>
          <header>
            <div className="logo-div">
              <a href="./">
                <img src={imagen2} className="logo" alt="imagen" />
              </a>
              <span>Musicfy</span>
            </div>
            <nav ref={navRef}>
              <a href="/home">Home</a>
              <a href="/favorites">Favorites</a>
              <a href="/favorites">+Playlist</a>
              <a href="/library">Library</a>
              <a>Search</a>
              <a href="/profile" className="perfil">
                Profile
              </a>
              <button className="nav-btn nav-close-btn" onClick={showNavBar}>
                <FaTimes />
              </button>
              <img src={imagen} className="avatar" onClick={handleClick} />
            </nav>
            <button className="nav-btn" onClick={showNavBar}>
              <FaBars />
            </button>
          </header>
          {profile && (
            <div className="container">
              <div className="select-perfil">
                <a href="/profile">Profile</a>
                <a href="/premium">Premium</a>
                <a onClick={handleLog}>Log out</a>
              </div>{" "}
            </div>
          )}
        </div>
      ) : (
        <header>
          <div className="logo-div">
            <img src={imagen2} className="logo" alt="imagen" />
            <span>Musicfy</span>
          </div>
          <nav ref={navRef}>
            <div className="no-logged">
              <a href="/register">Register</a>
              <a onClick={handleLog}>Log in</a>
            </div>

            <button className="nav-btn nav-close-btn" onClick={showNavBar}>
              <FaTimes />
            </button>
          </nav>
          <button className="nav-btn" onClick={showNavBar}>
            <FaBars />
          </button>
        </header>
      )}
    </div>
  );
}
