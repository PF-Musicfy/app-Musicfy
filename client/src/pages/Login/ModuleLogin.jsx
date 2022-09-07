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
    pass: "",
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
          password: input.pass,
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
      <div className={theme === "light" ? sLight.options : s.options}>
        <LoginWithGoogle />
      </div>
      <form
        className={theme === "light" ? sLight.form : s.form}
        onSubmit={handleSubmit}
      >
        <div className={theme === "light" ? sLight.inputs : s.inputs}>
          <p className={theme === "light" ? sLight.emailTitle : s.emailTitle}>
            Email
          </p>
          <input
            type="email"
            name="user"
            placeholder="Email"
            onChange={inputChange}
            value={input.user}
            className={errors.user ? s.inputError : ""}
          />
          <p className={theme === "light" ? sLight.msgError : s.msgError}>
            {errors.user || ""}
          </p>
        </div>

        <div className={theme === "light" ? sLight.inputs : s.inputs}>
          <p className={theme === "light" ? sLight.emailTitle : s.emailTitle}>
            Password
          </p>
          <input
            ref={inputPass}
            type="password"
            name="pass"
            placeholder="Password"
            onChange={inputChange}
            value={input.pass}
            className={errors.pass ? s.inputError : ""}
          />
          <p className={theme === "light" ? sLight.msgError : s.msgError}>
            {errors.pass || ""}
          </p>
        </div>
        <button
          type="button"
          className={theme === "light" ? sLight.button : s.button}
          onClick={() => {
            if (inputPass.current.type === "password") {
              inputPass.current.type = "text";
            } else {
              inputPass.current.type = "password";
            }
          }}
        >
          <FaEye className={theme === "light" ? sLight : s.eye} />
        </button>

        <div
          className={theme === "light" ? sLight.containerSend : s.containerSend}
        >
          <button
            disabled={hasSubmit}
            className={theme === "light" ? sLight.btnSend : s.btnSend}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
