import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { setUser } from "../../store/slice/user.js";

export default function LoginWithGoogle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
