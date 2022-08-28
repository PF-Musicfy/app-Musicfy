import s from "./dashboard.module.css";
import { CardsFeedback } from "../../components/CardsFeedback";

export default function DashboardFeedback() {

  return (
    <div className={s.main}>
      <h2>Dashboard - Musicfy</h2>
      <h2>Dashboard - Feedback</h2>
      <CardsFeedback />
    </div>
  )
}
