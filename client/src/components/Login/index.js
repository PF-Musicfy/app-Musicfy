import "./login.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useRef } from "react";
import validate from "../../utils/validate.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaBackward } from "react-icons/fa";

import Logout from "../Logout";
import Profile from "../Profile";
import setTitle from "../../utils/setTitle.js";

export default function Login() {
  setTitle("Login - Musicfy");

  const { loginWithPopup, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const inputPass = useRef();

  const [input, setInput] = useState({
    user: "",
    pass: "",
  });
  const [errors, setErrors] = useState({});

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
    <div className="login">
      <div className="login-logo" onClick={() => navigate("/")}>
        <img src="https://i.imgur.com/GiyjGcI.png" alt="Musicfy Logo" />
        <span>Musicfy</span>
      </div>
      <hr></hr>
      <div className="login-container">
        <button className="btn-back" onClick={() => navigate(-1)}>
          <FaBackward />
        </button>
        <div className="login-options">
          {isAuthenticated ? (
            <>
              <Profile />
              <Logout />
            </>
          ) : (
            <>
              <div className="container-auth0" onClick={loginWithPopup}>
                <button className="auth0">SIGN IN WITH AUTH0</button>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE_5Ua8TSSEwKZbpKvZDXZcVo4Ts40PLkAhg&usqp=CAU"
                  alt="auth0"
                />
              </div>
            </>
          )}
        </div>
        <hr></hr>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="label">Email</label>
          <input
            type="text"
            name="user"
            placeholder="Email"
            onChange={inputChange}
            value={input.user}
            className={errors.user ? "input-err" : ""}
          />
          <p className="msg-err">{errors.user || ""}</p>
          <label className="label">Password</label>
          <input
            ref={inputPass}
            type="password"
            name="pass"
            placeholder="Password"
            onChange={inputChange}
            value={input.pass}
            className={errors.pass ? "input-err" : ""}
          />
          <button
            type="button"
            onClick={() => {
              if (inputPass.current.type === "password") {
                inputPass.current.type = "text";
              } else {
                inputPass.current.type = "password";
              }
            }}
          >
            <span className="icon-see-password">
              <FaEye />
            </span>
          </button>
          <p className="msg-err">{errors.pass || ""}</p>
          <div className="container-btn-send">
            <button className="btn-send">Login</button>
          </div>
        </form>
        <hr></hr>
        <span className="span-account">¿You do not have an account?</span>
        <button className="btn-register" onClick={() => navigate("/register")}>
          ¡ REGISTER IN MUSICFY !
        </button>
      </div>
    </div>
  );
}
