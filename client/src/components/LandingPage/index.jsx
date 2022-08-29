import Footer from "./Footer";
import BodyLanding from "./Body";
import NavBarLandingOn from "./NavBarLandingOn";
import Body2 from "./Body2";
import NavBarLandingOff from "./NavBarLandingOff";
import { useSelector } from "react-redux";


export default function LandingPage() {
  
  const { user } = useSelector(state => state.user)

  return (
    <div className="landing">
      {
        Object.keys(user).length? <NavBarLandingOn /> : <NavBarLandingOff />
      }
      <BodyLanding />
      <Body2 />
      <Footer />
    </div>
  );
}
