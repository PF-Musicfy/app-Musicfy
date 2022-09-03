import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./RegisterForm.module.css";
import axios from "axios";
import { FaBackward } from "react-icons/fa";
import Swal from 'sweetalert2';

export default function RegisterForm() {
  const [newUser, setNewUser] = useState({
    name: "",
    eMail: "",
    password: "",
    rePassword: "",
  });
  let navigate = useNavigate();
  let error = true;
  let errorName = false;
  let errorEMail = false;
  let errorPassword = false;
  let errorRePassword = false;

  if (newUser.name.length < 3 || /[^0-9a-zñáéíóú]/i.test(newUser.name) === true) {
    errorName = true;
  }
  if (
    newUser.eMail.length === 0 ||
    /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(
      newUser.eMail
    ) === false
  ) {
    errorEMail = true;
  }

  if (
    newUser.password.length < 8 ||
    /[^a-z0-9ñ]/i.test(newUser.password) === true
  ) {
    errorPassword = true;
  }

  if (
    newUser.rePassword !== newUser.password ||
    newUser.rePassword.length === 0
  ) {
    errorRePassword = true;
  }

  if (
    errorName === false &&
    errorEMail === false &&
    errorPassword === false &&
    errorRePassword === false
  ) {
    error = false;
  }

  function onClick(e) {
    e.preventDefault();
    navigate(-1);
  }

  function onInputChange(e) {
    e.preventDefault();
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
    console.log(newUser);
  }

  // const Toast = Swal.mixin({
  //   toast: true,
  //   position: 'center',
  //   showConfirmButton: false,
  //   timer: 2000,
  //   timerProgressBar: true,
  //   // didOpen: (toast) => {
  //   //   toast.addEventListener('mouseenter', Swal.stopTimer)
  //   //   toast.addEventListener('mouseleave', Swal.resumeTimer)
  //   // }
  // })
  

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
          icon: 'success',
          title: 'Check your email and click in the link to validate your registration'
        }) 
        navigate(-1);     
      })     
      .catch((error) => {
        if (error.response) {
          Swal.fire({
            icon: 'error',
            title: 'Oops try again!',
            text: 'Email already exist',
          })
        }
      });
  }
  return (
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
            <label htmlFor="">* Username</label>
            <input
              type="text"
              name="name"
              onChange={onInputChange}
              value={newUser.name}
              placeholder="Username"
            />
            {errorName && (
              <span className={styles.error_span}>At least 3 characters</span>
            )}
          </div>
          <div className={styles.item}>
            <label htmlFor="">* Email</label>
            <input
              type="text"
              name="eMail"
              id="eMail"
              onChange={onInputChange}
              value={newUser.eMail}
              placeholder="Email"
            />
            {errorEMail && (
              <span className={styles.error_span}>Enter email</span>
            )}
          </div>
          <div className={styles.item}>
            <label htmlFor="">* Password</label>
            <input
              type="password"
              name="password"
              onChange={onInputChange}
              value={newUser.password}
              placeholder="Password"
            />
            {errorPassword && (
              <span className={styles.error_span}>At least 8 characters</span>
            )}
          </div>
          <div className={styles.item}>
            <label htmlFor="">* Repeat password</label>
            <input
              type="password"
              name="rePassword"
              onChange={onInputChange}
              value={newUser.rePassword}
              placeholder="Repeat password"
            />
            {errorRePassword !== errorPassword && (
              <span className={styles.error_span}>Passwords do not match</span>
            )}
          </div>        
        </div>
        <button
          className={error ? styles.registerDisabled : styles.submit}
          type="submit"
          disabled={error ? true : false}
        >
          <span>Register</span>
        </button>
      </form>
    </div>
  );
}
