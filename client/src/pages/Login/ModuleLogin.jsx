import { useState, useRef } from "react";
import { validateLogin } from "../../utils/validate.js";
import { FaEye } from "react-icons/fa";
import s from "./login.module.css";
import sLight from "./loginLight.module.css";
import LoginWithGoogle from "./LoginWithGoogle.jsx";
import login from "../../utils/login.js";

export default function ModuleLogin({ success }) {
  const [input, setInput] = useState({
    user: "",
    pass: ""
  });
  const [errors, setErrors] = useState({});
  const [hasSubmit, setHasSubmit] = useState(false);
  const inputPass = useRef();
  const theme = localStorage.getItem("theme");

  const inputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    setErrors(validateLogin({ ...input, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmit(true);
    try {
      await login(
        {
          email: input.user,
          password: input.pass
        },
        "/api/v1/auth/login",
        success
      );
    } catch (e) {
      console.log("error login", e);
    }
    setHasSubmit(false);
  };

  return (
    <div className={theme === "light" ? sLight.container : s.container}>
      <span className={theme === "light" ? sLight.title : s.title}>Log in</span>
      <div className={theme === "light" ? sLight.options : s.options}>
        <LoginWithGoogle />
      </div>
      <form className={theme === "light" ? sLight.form : s.formCon} onSubmit={handleSubmit}>
        <label className={theme === "light" ? sLight.emailTitle : s.emailTitle}>Email</label>
        <input
          type="email"
          name="user"
          placeholder="Email"
          onChange={inputChange}
          value={input.user}
          className={s.inputForm}
        />

        <span className={theme === "light" ? sLight.msgError : s.msgErrorEmail}>{errors.user || ""}</span>

        <label className={theme === "light" ? sLight.emailTitle : s.emailTitle}>Password</label>
        <input
          ref={inputPass}
          type="password"
          name="pass"
          placeholder="Password"
          onChange={inputChange}
          value={input.pass}
          className={s.inputForm}
        />
        <p className={theme === "light" ? sLight.msgError : s.msgError}>{errors.pass || ""}</p>

        <FaEye
          className={theme === "light" ? sLight : s.eye}
          onClick={() => {
            if (inputPass.current.type === "password") {
              inputPass.current.type = "text";
            } else {
              inputPass.current.type = "password";
            }
          }}
        />

        <div className={s.prueba}>
          <button disabled={hasSubmit} className={theme === "light" ? sLight.btnSend : s.buttonReg}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
