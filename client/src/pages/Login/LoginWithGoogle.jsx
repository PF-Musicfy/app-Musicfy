import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

import { setUser } from "../../store/slice/user.js";
import login from "../../utils/login.js";

export default function LoginWithGoogle() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user)
  const clientId =  "425370046788-u6dorcbq4s799p4rc5q5e7ik4j501gta.apps.googleusercontent.com";
  const [ error, setError ] = useState('');

  useEffect(() => {
    const initClient = () => {
      gapi.auth2.init({
        clientId: clientId,
        scope: ''
      })
    }
    gapi.load("client:auth2", initClient)
  }, [])

  const onSuccess = async (res) => {
    try{
      await login({
        username: res.profileObj.name,
        email: res.profileObj.email,
      }, '/user/google', 'logeado with goooogle')
    }catch(e){
      console.log('error login')
    }
  }
  const onFailure = (res) => {
    console.log('failed', res);
    setError('habilita las cookies')
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
          buttonText={error || "Sign in with Google"}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
        />
      }
          {/*isSignedIn={true}*/}
    </div>
  )
}
