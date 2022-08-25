import { FaBars, FaTimes } from "react-icons/fa";
import "./NavBarHome.css";
import imagen from "./img_avatar.png";
import { useRef, useState } from "react";
import imagen2 from "./WJT6FaB.png";
import SearchBar from "../SearchBar/Index";
import { Link, useNavigate } from "react-router-dom";

export default function NavBarHome() {
  const [profile, setProfile] = useState(false);
  const [logged, setLogged] = useState(true);
  const navRef = useRef();
  let navigate = useNavigate();
  const showNavBar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  function handleClick() {
    setProfile(!profile);
  }
  function handleLog() {
    setLogged(!logged);
  }
  function onClickHome(e) {    
    e.preventDefault()
    navigate(0)
  }

  return (
    <div>
      {logged ? (
        <div>
          <header>
            <div className='searchStyle'>
              <SearchBar />
            </div>
            <div className="logo-div">
              <a href="./">
                <img src={imagen2} className="logo" alt="loguito" />
              </a>
              <span>Musicfy</span>
            </div>
            <nav ref={navRef}>
              {/* <Link to='/home'> */}
                <span onClick={(e) => {onClickHome(e)}}>Home</span>
              {/* </Link> */}
              <Link to='/favorites'>
                <span>Favorites</span>
              </Link>
              <Link to='/favorites'>
                <span>+Playlist</span>
              </Link>
              <Link to='/library'>
                <span>Library</span>
              </Link>

              <Link to='/profile'>
                <span className="perfil">Profile</span>
              </Link>
              <button className="nav-btn nav-close-btn" onClick={showNavBar}>
                <FaTimes />
              </button>
              <img src={imagen} className="avatar" onClick={handleClick} alt='avatarsito'/>
            </nav>
            <button className="nav-btn" onClick={showNavBar}>
              <FaBars />
            </button>
          </header>
          {profile && (
            <div className="container">
              <div className="select-perfil">
              <Link to='/profile'>
                <span>Profile</span>
              </Link>
              <Link to='/premium'>
                <span>Premium</span>
              </Link>
                <span onClick={handleLog} className='logOut'>Log out</span>
              </div>{" "}
            </div>
          )}
        </div>
      ) : (
        <header>
          <div className="logo-div">
            <img src={imagen2} className="logo" alt="loguito2" />
            <span>Musicfy</span>
          </div>
          <nav ref={navRef}>
            <div className="no-logged">
              <Link to='/register'>
                <span>Register</span>
              </Link>
              <span onClick={handleLog}>Log in</span>
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
