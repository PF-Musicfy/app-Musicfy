import Footer from "./Footer";
import BodyLanding from "./Body";
import NavBarLandingOff from "./NavBarLandingOff";
import NavBarLandingOn from "./NavBarLandingOn";
import { useDispatch, useSelector } from 'react-redux'
import { userTokenInfo } from "../../store/slice/user";
import { useEffect } from "react";

export default function LandingPage() {
  const { userToken } = useSelector(state => state.user) //aqui tienes la info del usuario
  const dispatch = useDispatch()

  

  return (
    <div className="landing">
      {
        userToken.online === true? <NavBarLandingOn /> : <NavBarLandingOff />
      }
      {/* <NavBarLandingOff /> */}
      <BodyLanding />
      <Footer />
    </div>
  );
}
