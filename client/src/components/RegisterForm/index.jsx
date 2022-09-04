import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./RegisterForm.module.css";
import axios from "axios";
import { FaBackward } from "react-icons/fa";
import Swal from "sweetalert2";
import Footer from "../LandingPage/Footer/index";
import { validateRegister } from "utils/validate";

export default function RegisterForm() {
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
      <div className={styles.create}>
        <div className={styles.register_logo} onClick={() => navigate("/")}>
          <img src="https://i.imgur.com/GiyjGcI.png" alt="Musicfy Logo" />
          <span>Musicfy</span>
        </div>
        <div className={styles.space}></div>
        <button className={styles.back} onClick={onClick}>
          <FaBackward />
        </button>
        <h2 className={styles.title}>REGISTER</h2>
        <form className={styles.form_register} onSubmit={(e) => onSubmit(e)}>
          <div className={styles.form}>
            <div className={styles.item}>
              <label className={styles.labelTop} htmlFor="">
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
              <p className={styles.error}>{errors.user || ""}</p>
              <p className={styles.error}>{errors.symbols || ""}</p>
            </div>
            <div className={styles.item}>
              <label htmlFor="">* Email</label>
              <input
                required
                type="email"
                name="eMail"
                id="eMail"
                onChange={onInputChange}
                value={newUser.eMail}
                placeholder="Email"
              />
              <p className={styles.error}>{errors.eMail || ""}</p>
            </div>
            <div className={styles.item}>
              <label htmlFor="">* Password</label>
              <input
                required
                type="password"
                name="password"
                onChange={onInputChange}
                value={newUser.password}
                placeholder="Password"
                minLength="8"
              />
              <p className={styles.error}>{errors.password || ""}</p>
            </div>
            <div className={styles.item}>
              <label htmlFor="">* Repeat password</label>
              <input
                required
                type="password"
                name="rePassword"
                onChange={onInputChange}
                value={newUser.rePassword}
                placeholder="Repeat password"
              />
              <p className={styles.error}>{errors.doNotMatch || ""}</p>
            </div>
          </div>
          <button disabled={errors.doNotMatch ? true : false} className={styles.submit} type="submit">
            <span className={errors.doNotMatch ? styles.disabled : ""}>Register</span>
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
