import { useNavigate, Link, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import s from "./dashboard.module.css";
import SideBar from "../../components/SideBar";
import DashboardHome from "./DashboardHome.jsx";
import DashboardFeedback from "./DashboardFeedback.jsx";
import PageAdmin from "../../components/PageAdmin";
import Loading from "../../components/Loading";
import { useLoading } from "../../hooks/useLoading.js";
import ModuleLogin from "../Login/ModuleLogin.jsx";

export default function Dashboard() {
  const { user } = useSelector(state => state.user)
  const { display, loading } = useLoading();
  const navigate = useNavigate();

  return (
    <div className={s.container}>
      {Object.keys(user).length ?
      <>
      <SideBar>
        <p>Dashboard</p>
        <hr />
        <Link to=''>Home</Link>
        <br />
        <Link to='feedback'>Feedback</Link>
        <br />
        <Link to='list'>List</Link>
      </SideBar>
      <div className={s.content}>
        <Routes>
          <Route exact path="/" element={<DashboardHome />} />
          <Route exact path="/feedback" element={<DashboardFeedback />} />
          <Route exact path="/list" element={<PageAdmin />} />
        </Routes>
      </div>
      </>
      : loading ?
        <Loading text={loading}/>
        : <div style={{display}}>
            <ModuleLogin success={'dashboard - admin'}/>
          </div>
      }
    </div>
  )
}
