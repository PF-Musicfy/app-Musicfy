import { Link, Route, Routes } from "react-router-dom";

import s from "./dashboard.module.css";
import SideBar from "../../components/SideBar";
import DashboardHome from "./DashboardHome.jsx";
import DashboardFeedback from "./DashboardFeedback.jsx";

export default function Dashboard() {
  return (
    <div className={s.container}>
      <SideBar>
        <Link to=''>Home</Link>
        <br />
        <Link to='feedback'>Feedback</Link>
      </SideBar>
      <Routes>
        <Route exact path="/" element={<DashboardHome />} />
        <Route exact path="/feedback" element={<DashboardFeedback />} />
      </Routes>
    </div>
  )
}
