import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import axios from 'axios';

import { setUser, userTokenInfo } from "../../store/slice/user.js";

export default function LoginWithGoogle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user)
  const clientId =  "425370046788-u6dorcbq4s799p4rc5q5e7ik4j501gta.apps.googleusercontent.com";

  useEffect(() => {
    const initClient = () => {
      gapi.auth2.init({
        clientId: clientId,
        scope: ''
      })
    }
    gapi.load("client:auth2", initClient)
  }, [])

  const onSuccess = (res) => {
    axios.post(`${axios.defaults.baseURL}/user/google`,{
      username: res.profileObj.name,
      email: res.profileObj.email,
      //avatar: res.profileObj.imageUrl,
    },{
      withCredentials: true,
    })
    .then((e) => {
      alert("logeado con google");
      
      dispatch(userTokenInfo())
      navigate("/home");
    })
    .catch((e) => {
      console.log(e);
      alert("posibles errores:\n" +
          "- el back no se ha iniciado\n" +
          "- alguno de los campos falta o es incorrecto\n" +
          "- el usuario no existe en la base de datos"
      );
    });
  }
  const onFailure = (res) => {
    console.log('failed', res);
  }
  const logOut = () => {
    console.log('logout');
    dispatch(setUser({}))
  }

  return (
    <div>
      {Object.keys(user).length ?
        <GoogleLogout
          clientId={clientId}
          buttonText="Log out"
          onLogoutSuccess={logOut}
        />
        :
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
        />
      }
          {/*isSignedIn={true}*/}
    </div>
  )
}
