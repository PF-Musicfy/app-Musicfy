import Footer from "./Footer";
import BodyLanding from "./Body";
import NavBarLanding from "../NavBarLanding";
import './landingpage.css';
import PopupLogin from '../Popup/PopupLogin.jsx';
//import Login from '../Login';
//import Logout from '../Logout';
//import Profile from '../Profile';
//import { useAuth0 } from '@auth0/auth0-react'

      //{isAuthenticated ?
      //  <>
      //    <Profile />
      //    <Logout />
      //  </>
      //  : <Login />
      //}

export default function LandingPage(){                            
  //const { isAuthenticated } = useAuth0();

  return (                                                        
    <div className='landing'>
      <NavBarLanding />
      <BodyLanding />
      <Footer />
      <PopupLogin />
    </div>
  );
}
