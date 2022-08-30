import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaBackward } from "react-icons/fa";

import s from "./login.module.css";
import setTitle from "../../utils/setTitle.js";
import ModuleLogin from "./ModuleLogin.jsx";

export default function Login() {
  setTitle("Login - Musicfy");

  const { user } = useSelector(state => state.user)
  const navigate = useNavigate();

  useEffect(() => {
    if(Object.keys(user).length){
      navigate('/home')
    }
  }, [user,navigate])

  return (
    <div className={s.login}>
      <div className={s.navbar}>
        <div onClick={() => navigate("/")}>
          <img src="https://i.imgur.com/GiyjGcI.png" alt="Musicfy Logo" />
          <span>Musicfy</span>
        </div>
        <button onClick={() => navigate(-1)}>
          <FaBackward />
        </button>
      </div>
      <ModuleLogin />
      <p>¿You do not have an account?</p>
      <button className={s.btnRegister} onClick={() => navigate("/register")}>
        ¡ REGISTER IN MUSICFY !
      </button>
    </div>
  );
}
