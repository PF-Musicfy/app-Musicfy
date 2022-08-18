import Footer from "./Footer";
import BodyLanding from "./Body";
import NavBarLanding from "../NavBarLanding";
import './landingpage.css';
//import Player from '../Reproductor';
//<Player />
export default function LandingPage() {
  return (
    <div className='landing'>
      <NavBarLanding />
      <BodyLanding />
      <Footer />
    </div>
  );
}
