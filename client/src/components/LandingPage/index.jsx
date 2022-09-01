import Footer from "./Footer";
import BodyLanding from "./Body";
import NavBarLandingOn from "./NavBarLandingOn";
import Body2 from "./Body2";
import NavBarLandingOff from "./NavBarLandingOff";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTopMusic } from "../../store/slice";


export default function LandingPage() {
  
  const { user } = useSelector(state => state.user)
  const {topMusic} = useSelector(state => state.music)
  let dispatch = useDispatch()

  useEffect(() => {
    if (topMusic.length === 0){
    dispatch(getTopMusic())
    };
  }, []);

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
