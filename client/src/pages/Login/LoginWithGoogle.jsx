import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function LoginWithGoogle() {
  //const [user, setUser] = useState({});
  const navigate = useNavigate();

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

    google.accounts.id.prompt();
  },[])

  const responseGoogle = (response) => {
    const userObject = jwt_decode(response.credential);
    console.log(userObject);
   // verifyUser({
   //   email: userObject.email,
   // })
   // .then(() => {
   //   navigate("/home");
   // })
   // .catch((e) => {
   //   console.log(e);
   //   alert("posibles errores:\n" +
   //     "- el back no se ha iniciado\n" +
   //     "- alguno de los campos falta o es incorrecto\n" +
   //     "- el usuario no existe en la base de datos"
   //   );
   // });
    //setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
    //navigate("/home");
  }

  const signOut = (e) => {
    //setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

    //{
    //  Object.keys(user).length !== 0 &&
    //  <button onClick={(e) => signOut(e)}>SignOut</button>
    //}
    //{ user &&
    //  <div>
    //    <p>{user.name}</p>
    //  </div>
    //}
  return (
    <div id="signInDiv"></div>
  )
}
