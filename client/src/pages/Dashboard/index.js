import { Link, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import s from "./dashboard.module.css";
import DashboardHome from "./DashboardHome.jsx";
import DashboardFeedback from "./DashboardFeedback.jsx";
import PageAdmin from "../../components/PageAdmin";
import Loading from "../../components/Loading";
import { useLoading } from "../../hooks/useLoading.js";
import ModuleLogin from "../Login/ModuleLogin.jsx";
import { CardAlert } from "components/Cards";

import Navbar from "components/Navbar";

export default function Dashboard() {
  const { user } = useSelector((state) => state.user);
  const { display, loading } = useLoading();

  return (
    <div className={s.container}>
      {Object.keys(user).length ? (
        <>
          <Navbar>
            <Link to="">Dashboard</Link>
          </Navbar>
          <div className={s.content}>
            {user.admin ? (
              <Routes>
                <Route exact path="/" element={<DashboardHome />} />
                <Route exact path="/feedback" element={<DashboardFeedback />} />
                <Route exact path="/list" element={<PageAdmin />} />
              </Routes>
            ) : (
              <CardAlert>You must be admin to see the dashboard</CardAlert>
            )}
          </div>
        </>
      ) : loading ? (
        <Loading text={loading} />
      ) : (
        <div style={{ display }}>
          <ModuleLogin success={"dashboard - admin"} />
        </div>
      )}
    </div>
  );
}
