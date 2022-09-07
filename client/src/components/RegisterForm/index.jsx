import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./RegisterForm.module.css";
import stylesLight from "./RegisterFormLight.module.css";
import axios from "axios";
import { FaBackward } from "react-icons/fa";
import Swal from "sweetalert2";
import Footer from "../LandingPage/Footer/index";
import { validateRegister } from "utils/validate";

export default function RegisterForm() {
  const theme = localStorage.getItem("theme");
  let navigate = useNavigate();
  let [errors, setErrors] = useState({});
  const [newUser, setNewUser] = useState({
    name: "",
    eMail: "",
    password: "",
    rePassword: "",
  });

  function onClick(e) {
    e.preventDefault();
    navigate(-1);
  }

  function onInputChange(e) {
    e.preventDefault();
    const { name, value } = e.target;

    setNewUser({ ...newUser, [e.target.name]: e.target.value });
    setErrors(validateRegister({ ...newUser, [name]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    axios
      .post(`${axios.defaults.baseURL}/api/v1/auth/validate`, {
        username: newUser.name,
        email: newUser.eMail,
        password: newUser.password,
        repassword: newUser.rePassword,
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title:
            "Check your email and click in the link to validate your registration",
        });
        navigate(-1);
      })
      .catch((error) => {
        if (error.response) {
          Swal.fire({
            icon: "error",
            title: "Oops try again!",
            text: "Email already exist",
          });
        }
      });
  }
  return (
    <>
      <div className={theme === "light" ? stylesLight.create : styles.create}>
        <div
          className={
            theme === "light" ? stylesLight.register_logo : styles.register_logo
          }
          onClick={() => navigate("/")}
        >
          <img src="https://i.imgur.com/GiyjGcI.png" alt="Musicfy Logo" />
          <span>Musicfy</span>
        </div>
        <div
          className={theme === "light" ? stylesLight.space : styles.space}
        ></div>
        <button
          className={theme === "light" ? stylesLight.back : styles.back}
          onClick={onClick}
        >
          <FaBackward />
        </button>
        <h2 className={theme === "light" ? stylesLight.title : styles.title}>
          REGISTER
        </h2>
        <form
          className={
            theme === "light" ? stylesLight.form_register : styles.form_register
          }
          onSubmit={(e) => onSubmit(e)}
        >
          <div className={theme === "light" ? stylesLight.form : styles.form}>
            <div className={theme === "light" ? stylesLight.item : styles.item}>
              <label
                className={
                  theme === "light"
                    ? stylesLight.labelsStyles
                    : styles.labelsStyles
                }
                htmlFor=""
              >
                * Username
              </label>
              <input
                required
                type="text"
                name="name"
                onChange={onInputChange}
                value={newUser.name}
                placeholder="Username"
                minLength="3"
              />
              <p
                className={theme === "light" ? stylesLight.error : styles.error}
              >
                {errors.user || ""}
              </p>
              <p
                className={theme === "light" ? stylesLight.error : styles.error}
              >
                {errors.symbols || ""}
              </p>
            </div>
            <div className={theme === "light" ? stylesLight.item : styles.item}>
              <label
                htmlFor=""
                className={
                  theme === "light" ? stylesLight.labels234 : styles.labels234
                }
              >
                * Email
              </label>
              <input
                required
                type="email"
                name="eMail"
                id="eMail"
                onChange={onInputChange}
                value={newUser.eMail}
                placeholder="Email"
              />
              <p
                className={theme === "light" ? stylesLight.error : styles.error}
              >
                {errors.eMail || ""}
              </p>
            </div>
            <div className={theme === "light" ? stylesLight.item : styles.item}>
              <label
                htmlFor=""
                className={
                  theme === "light" ? stylesLight.labels234 : styles.labels234
                }
              >
                * Password
              </label>
              <input
                required
                type="password"
                name="password"
                onChange={onInputChange}
                value={newUser.password}
                placeholder="Password"
                minLength="8"
              />
              <p
                className={theme === "light" ? stylesLight.error : styles.error}
              >
                {errors.password || ""}
              </p>
            </div>
            <div className={theme === "light" ? stylesLight.item : styles.item}>
              <label
                htmlFor=""
                className={
                  theme === "light" ? stylesLight.labels234 : styles.labels234
                }
              >
                * Repeat password
              </label>
              <input
                required
                type="password"
                name="rePassword"
                onChange={onInputChange}
                value={newUser.rePassword}
                placeholder="Repeat password"
              />
              <p
                className={theme === "light" ? stylesLight.error : styles.error}
              >
                {errors.doNotMatch || ""}
              </p>
            </div>
          </div>
          <button
            disabled={errors.doNotMatch ? true : false}
            className={theme === "light" ? stylesLight.submit : styles.submit}
            type="submit"
          >
            <span
              className={
                errors.doNotMatch
                  ? theme === "light"
                    ? stylesLight.disabled
                    : styles.disabled
                  : ""
              }
            >
              Register
            </span>
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
