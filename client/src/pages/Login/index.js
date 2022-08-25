import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaBackward } from "react-icons/fa";
import axios from "axios";
import jwt_decode from "jwt-decode";

import s from "./login.module.css";
import validate from "../../utils/validate.js";
import setTitle from "../../utils/setTitle.js";

export default function Login() {
  setTitle("Login - Musicfy");

  const navigate = useNavigate();
  const inputPass = useRef();
  const [user, setUser] = useState({});

  const [input, setInput] = useState({
    user: "",
    pass: "",
  });
  const [errors, setErrors] = useState({});

  const responseGoogle = (response) => {
    const userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }
  const signOut = (e) => {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "425370046788-u6dorcbq4s799p4rc5q5e7ik4j501gta.apps.googleusercontent.com",
      callback: responseGoogle
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large"}
    );

    google.accounts.id.prompt();
  },[])

  const inputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    setErrors(validate({ ...input, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/v1/auth/login", {
        email: input.user,
        password: input.pass,
      })
      .then(() => {
        alert("logeado");
        navigate("/home");
      })
      .catch((e) => {
        console.log(e);
        alert(
          "posibles errores:\n" +
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
          <div id="signInDiv"></div>
          {
            Object.keys(user).length !== 0 &&
            <button onClick={(e) => signOut(e)}>SignOut</button>
          }
          { user &&
            <div>
              <p>{user.name}</p>
            </div>
          }
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
            <FaEye className={s.eye}/>
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
