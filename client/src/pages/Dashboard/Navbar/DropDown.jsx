import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";

import s from "./dropdown.module.css";
import imagen from "../../../components/NavBarHome/img_avatar.png";
import { logoutUser } from "../../../store/slice/user";

export default function DropDown() {
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(false);
  const { user } = useSelector((state) => state.user);

  return (
    <div>
      <div className={s.action}>
        <div className={s.profile}>
          <img
            src={user.avatar || imagen}
            onClick={() => setProfile(!profile)} alt="avatarsito"
          />
        </div>
        <div className={profile ? `${s.menu} ${s.active}` : s.menu}>
          <Link to='/profile'>Profile</Link>
          <Link to='/home'>Home</Link>
          <button onClick={() => dispatch(logoutUser())}>Log out</button>
        </div>
      </div>
    </div>
  )
}
