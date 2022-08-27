import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaBackward } from "react-icons/fa";
import axios from "axios";

import s from "./login.module.css";
import validate from "../../utils/validate.js";
import setTitle from "../../utils/setTitle.js";
import { setUser } from "../../store/slice/user.js";
import LoginWithGoogle from "./LoginWithGoogle.jsx";

export default function Login() {
  setTitle("Login - Musicfy");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const inputPass = useRef();

  const [input, setInput] = useState({
    user: "",
    pass: "",
  });
  const [errors, setErrors] = useState({});

  //useEffect(() => {
  //  if(Object.keys(user).length){
  //    navigate('/home')
  //  }
  //}, [user,navigate])

  const inputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    setErrors(validate({ ...input, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${axios.defaults.baseURL}/api/v1/auth/login`, {
      email: input.user,
      password: input.pass,
    },{
      withCredentials: true
    })
    .then((e) => {
      console.log(e.data);
      alert("logeado");
      //dispatch(setUser(e.data.user))

      //navigate("/home");
    })
    .catch((e) => {
      console.log(e);
      alert("posibles errores:\n" +
          "- el back no se ha iniciado\n" +
          "- alguno de los campos falta o es incorrecto\n" +
          "- el usuario no existe en la base de datos"
      );
    });
  };

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
      <div className={s.container}>
        <div className={s.options}>
          <LoginWithGoogle />
        </div>
        <form className={s.form} onSubmit={handleSubmit}>
          <p>Email</p>
          <input
            type="text"
            name="user"
            placeholder="Email"
            onChange={inputChange}
            value={input.user}
            className={errors.user ? s.inputError : ""}
          />
          <p className={s.msgError}>{errors.user || ""}</p>
          <p>Password</p>
          <input
            ref={inputPass}
            type="password"
            name="pass"
            placeholder="Password"
            onChange={inputChange}
            value={input.pass}
            className={errors.pass ? s.inputError : ""}
          />
          <button
            type="button"
            className={s.button}
            onClick={() => {
              if (inputPass.current.type === "password") {
                inputPass.current.type = "text";
              } else {
                inputPass.current.type = "password";
              }
            }}
          >
            <FaEye className={s.eye} />
          </button>
          <p className={s.msgError}>{errors.pass || ""}</p>
          <div className={s.containerSend}>
            <button className={s.btnSend}>Login</button>
          </div>
        </form>
        <p>¿You do not have an account?</p>
        <button className={s.btnRegister} onClick={() => navigate("/register")}>
          ¡ REGISTER IN MUSICFY !
        </button>
      </div>
    </div>
  );
}
