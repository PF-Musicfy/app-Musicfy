import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import s from "./login.module.css";
import sLight from "./loginLight.module.css";
import setTitle from "../../utils/setTitle.js";
import ModuleLogin from "./ModuleLogin.jsx";
import Loading from "../../components/Loading";
import { useLoading } from "../../hooks/useLoading.js";
import Footer from "components/LandingPage/Footer";
import NavBarLandingOn from "../../components/LandingPage/NavBarLandingOn";
import NavBarLandingOff from "../../components/LandingPage/NavBarLandingOff";
// import { Link } from "react-router-dom";

export default function Login() {
  setTitle("Login - Musicfy");
  const { display, loading } = useLoading();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const theme = localStorage.getItem("theme");
  useEffect(() => {
    if (Object.keys(user).length) {
      navigate("/home");
    }
  }, [user, navigate]);
  return (
    <>
      {Object.keys(user).length ? (
        ""
      ) : loading ? (
        <Loading text={loading} />
      ) : (
        <>
          {Object.keys(user).length ? <NavBarLandingOn /> : <NavBarLandingOff />}
          <div className={theme === "light" ? sLight.login : s.login} style={{ display }}>
            <ModuleLogin />
            <span className={s.haveAccount}>Not registered on Musicfy yet?</span>
            <button
              className={theme === "light" ? sLight.btnRegister : s.btnRegister}
              onClick={() => navigate("/register")}
            >
              SIGN UP
            </button>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
