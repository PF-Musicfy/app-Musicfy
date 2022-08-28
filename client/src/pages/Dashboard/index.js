import { Link, Route, Routes } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import st from "../Login/login.module.css";

import s from "./dashboard.module.css";
import { userTokenInfo } from "../../store/slice/user";
import SideBar from "../../components/SideBar";
import DashboardHome from "./DashboardHome.jsx";
import DashboardFeedback from "./DashboardFeedback.jsx";
import PageAdmin from "../../components/PageAdmin";

function LoginForm() {
  const inputPass = useRef();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${axios.defaults.baseURL}/api/v1/auth/login`, {
      email: e.target[0].value,
      password: e.target[1].value,
    },{
      withCredentials: true
    })
    .then(() => {
      alert("Ingresando al dashboard - Admin");
      dispatch(userTokenInfo())
    })
    .catch((e) => {
      alert("posibles errores:\n" +
          "- el back no se ha iniciado\n" +
          "- alguno de los campos falta o es incorrecto\n" +
          "- el usuario no existe en la base de datos"
      );
    });
  };
  return (
    <div className={st.container}>
      <form className={st.form} onSubmit={handleSubmit}>
        <p>Email</p>
        <input
          type="text"
          name="user"
          placeholder="Email"
        />
        <p>Password</p>
        <input
          ref={inputPass}
          type="password"
          name="pass"
          placeholder="Password"
        />
        <button
          type="button"
          className={st.button}
          onClick={() => {
            if (inputPass.current.type === "password") {
              inputPass.current.type = "text";
            } else {
              inputPass.current.type = "password";
            }
          }}
        >
          mostrar contraseña
        </button>
        <div className={st.containerSend}>
          <button className={st.btnSend}>Login</button>
        </div>
      </form>
    </div>
  )
}

export default function Dashboard() {
  const { user } = useSelector(state => state.user)

  return (
    <div className={s.container}>
      {Object.keys(user).length ?
      <>
      <SideBar>
        <Link to=''>Home</Link>
        <br />
        <Link to='feedback'>Feedback</Link>
        <br />
        <Link to='list'>List</Link>
      </SideBar>
      <div className={s.content}>
        <Routes>
          <Route exact path="/" element={<DashboardHome />} />
          <Route exact path="/feedback" element={<DashboardFeedback />} />
          <Route exact path="/list" element={<PageAdmin />} />
        </Routes>
      </div>
      </>
      : <LoginForm />
      }
    </div>
  )
}
