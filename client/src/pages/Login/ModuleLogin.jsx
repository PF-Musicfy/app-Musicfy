import { useState, useRef } from "react";
import { validateLogin } from "../../utils/validate.js";
import { FaEye } from "react-icons/fa";
import s from "./login.module.css";
import LoginWithGoogle from "./LoginWithGoogle.jsx";
import login from "../../utils/login.js";

export default function ModuleLogin({ success }) {
  const [input, setInput] = useState({
    user: "",
    pass: "",
  });
  const [errors, setErrors] = useState({});
  const inputPass = useRef();

  const inputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    setErrors(validateLogin({ ...input, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
  };

  return (
    <div className={s.container}>
      <div className={s.options}>
        <LoginWithGoogle />
      </div>
      <form className={s.form} onSubmit={handleSubmit}>
        <p className={s.emailTitle}>Email</p>
        <p className={s.msgError}>{errors.user || ""}</p>
        <input
          type="email"
          name="user"
          placeholder="Email"
          onChange={inputChange}
          value={input.user}
          className={errors.user ? s.inputError : ""}
        />
        
        <p className={s.emailTitle}>Password</p>
        <p className={s.msgError}>{errors.pass || ""}</p>
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
        
        <div className={s.containerSend}>
          <button className={s.btnSend}>Login</button>
        </div>
      </form>
    </div>
  );
}
