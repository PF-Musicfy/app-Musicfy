import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { userTokenInfo } from "./store/slice/user";
import RegisterForm from "./components/RegisterForm";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import Page404 from "./components/Page404";
//import Detail from "./components/Detail";
import PageDev from "./components/PageInDev";
import Detail from "./components/Detail";
import Premium from "./components/Premium";
import About from "./components/About";
import Feedback from "./pages/Feedback";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProfileInfo from "./components/Profile";
import Avatar from "./components/Avatar";
import UserMP3 from "./components/UserMP3";
import Validation from "./components/Validation";
import CheckoutPremium from "./components/CheckoutPremium";
import TestMP from "./components/TestMP";
import Favorites from "./components/Favorites";

import Loading from "./components/Loading";
import { CardCookie } from "components/Cards";
import Mp3Show from "components/Mp3Uploaded/mp3";
import PlaylistSongs from "components/Playlists/playlists";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userTokenInfo());
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/register" element={<RegisterForm />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/home/:id" element={<Detail />} />
        <Route exact path="/library" element={<PageDev />} />
        <Route exact path="/premium" element={<Premium />} />
        <Route exact path="/feedback" element={<Feedback />} />
        <Route exact path="/dashboard/*" element={<Dashboard />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/profile" element={<ProfileInfo />} />
        <Route
          path="/validate/:email/:username/:hashPassword/*"
          element={<Validation />}
        />
        <Route exact path="/avatar" element={<Avatar />} />
        <Route exact path="/usermp3" element={<UserMP3 />} />
        <Route exact path="/loading" element={<Loading />} />
        <Route exact path="/checkoutpremium" element={<CheckoutPremium />} />
        <Route exact path="/mercadopago" element={<TestMP />} />
        <Route exact path="/favorites" element={<Favorites />} />
        <Route path="*" element={<Page404 />} />
        <Route exact path="/mp3uploaded" element={<Mp3Show />} />
        <Route exact path="/playlistSongs" element={<PlaylistSongs />} />
      </Routes>
      <CardCookie />
    </div>
  );
}
export default App;
