import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./RegisterForm.module.css";
import stylesLight from "./RegisterFormLight.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import Footer from "../LandingPage/Footer/index";
import { validateRegister } from "utils/validate";
import { useSelector } from "react-redux";
import NavBarLandingOn from "../LandingPage/NavBarLandingOn";
import NavBarLandingOff from "../LandingPage/NavBarLandingOff";
import { Link } from "react-router-dom";

export default function RegisterForm() {
  const { user } = useSelector((state) => state.user);
  const theme = localStorage.getItem("theme");
  let navigate = useNavigate();
  let [errors, setErrors] = useState({});
  const [newUser, setNewUser] = useState({
    name: "",
    eMail: "",
    password: "",
    rePassword: ""
  });
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
        repassword: newUser.rePassword
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Check your email and click in the link to validate your registration"
        });
        navigate(-1);
      })
      .catch((error) => {
        if (error.response) {
          Swal.fire({
            icon: "error",
            title: "Oops try again!",
            text: "Email already exist"
          });
        }
      });
  }
  return (
    <>
      {Object.keys(user).length ? <NavBarLandingOn /> : <NavBarLandingOff />}
      <div className={theme === "light" ? stylesLight.create : styles.create}>
        <span className={theme === "light" ? stylesLight.title : styles.title}>Sign up for free</span>
        <span className={styles.textContainer}>
          Already have a Musicfy account?{" "}
          <Link to={"/login"}>
            <span className={styles.textLink}>LOG IN</span>
          </Link>
        </span>
        <form
          className={theme === "light" ? stylesLight.form_register : styles.form_register}
          onSubmit={(e) => onSubmit(e)}
        >
          <label className={theme === "light" ? stylesLight.labelsStyles : styles.labelsStyles} htmlFor="">
            Username
          </label>
          <div className={styles.errorUser}>
            <span className={theme === "light" ? stylesLight.error : styles.error}>{errors.user || ""}</span>
            <span className={theme === "light" ? stylesLight.error : styles.error}>{errors.symbols || ""}</span>
          </div>
          <input
            className={styles.inputForm}
            required
            type="text"
            name="name"
            onChange={onInputChange}
            value={newUser.name}
            placeholder="Username"
            minLength="3"
          />
          <label htmlFor="" className={theme === "light" ? stylesLight.labelsStyles : styles.labelsStyles}>
            Email
          </label>
          <div className={styles.errorEmail}>
            <span className={theme === "light" ? stylesLight.error : styles.error}>{errors.eMail || ""}</span>
          </div>
          <input
            className={styles.inputForm}
            required
            type="email"
            name="eMail"
            id="eMail"
            onChange={onInputChange}
            value={newUser.eMail}
            placeholder="Email"
          />
          <label htmlFor="" className={theme === "light" ? stylesLight.labelsStyles : styles.labelsStyles}>
            Password
          </label>
          <input
            className={styles.inputForm}
            required
            type="password"
            name="password"
            onChange={onInputChange}
            value={newUser.password}
            placeholder="Password"
            minLength="8"
          />
          <div className={styles.errorPasswor}>
            <span className={theme === "light" ? stylesLight.error : styles.error}>{errors.password || ""}</span>
          </div>
          <label htmlFor="" className={theme === "light" ? stylesLight.labelsStyles : styles.labelsStyles}>
            Repeat password
          </label>
          <input
            className={styles.inputForm}
            required
            type="password"
            name="rePassword"
            onChange={onInputChange}
            value={newUser.rePassword}
            placeholder="Repeat password"
          />
          <div className={styles.errorRepeatPass}>
            <span className={theme === "light" ? stylesLight.error : styles.error}>{errors.doNotMatch || ""}</span>
          </div>
          <button
            disabled={errors.doNotMatch ? true : false}
            className={theme === "light" ? stylesLight.submit : styles.button}
            type="submit"
          >
            <span className={errors.doNotMatch ? (theme === "light" ? stylesLight.disabled : styles.disabled) : ""}>
              Register
            </span>
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
