import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

import s from "./dropdown.module.css";
import imagen from "components/NavBarHome/img_avatar.png";
import { logoutUser } from "store/slice/user";

export default function DropDown() {
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(false);
  const { user } = useSelector((state) => state.user);

  return (
    <div>
      <div className={s.action}>
        {Object.keys(user).length
        ? <div className={s.profile}>
            <img
              src={user.avatar || imagen}
              onClick={() => setProfile(!profile)} alt="avatarsito"
            />
          </div>
        : <FaBars
            onClick={() => setProfile(!profile)}
            className={s.responsiveOff}
          />
        }
        <div className={profile ? `${s.menu} ${s.active}` : s.menu}>
        {Object.keys(user).length
        ? <>
          <Link to='/profile'>Profile</Link>
            <Link to='/premium'>Premium</Link>
            <div className={s.responsive}>
              <Link to='/'>Home</Link>
              <Link to='/feedback'>Feedback</Link>
              <Link to='/favorites'>Favorites</Link>
            </div>
            <button
              onClick={() => dispatch(logoutUser())}
            >
              Log out
            </button>
          </>
        : <div className={s.responsiveOff}>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
          </div>
        }
        </div>
      </div>
    </div>
  )
}
