import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { setUser } from "../../store/slice/user.js";

export default function LoginWithGoogle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

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
    //google.accounts.id.prompt();
  },[])

  const responseGoogle = (response) => {
    const userObject = jwt_decode(response.credential);
    console.log(userObject);

    alert("logeado");
    dispatch(setUser(userObject))

    window.localStorage.setItem(
      'loggedAppUser', JSON.stringify(userObject)
    )

    navigate("/home");
  }

  return (
    <div id="signInDiv"></div>
  )
}
