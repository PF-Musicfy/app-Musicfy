import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/slice/user.js";

import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

export default function LoginWithGoogle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user)
  const clientId =  "425370046788-u6dorcbq4s799p4rc5q5e7ik4j501gta.apps.googleusercontent.com";

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      })
    }
    gapi.load("client:auth2", initClient)
  }, [])

  const onSuccess = (res) => {
    console.log('success', res.profileObj);
    const data = {
      username: res.profileObj.name,
      email: res.profileObj.email,
      avatar: res.profileObj.imageUrl,
      admin: false,
      premium: false,
      isblocked: false,
      online: true,
    }
    dispatch(setUser(data))
    console.log(data)
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
          isSignedIn={true}
        />
      }
    </div>
  )
}
