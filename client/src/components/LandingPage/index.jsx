import Footer from "./Footer";
import BodyLanding from "./Body";
import NavBarLandingOff from "./NavBarLandingOff";
import NavBarLandingOn from "./NavBarLandingOn";
import { useSelector } from 'react-redux'


export default function LandingPage() {
  const { user } = useSelector(state => state.user) //aqui tienes la info del usuario


  

  return (
    <div className="landing">
      {
        user.online === true? <NavBarLandingOn /> : <NavBarLandingOff />
      }
      <BodyLanding />
      <Footer />
    </div>
  );
}
