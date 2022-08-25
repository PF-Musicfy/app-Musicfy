import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import s from "./dashboard.module.css";
import { getFeedback } from "../../store/slice/user.js";

export default function DashboardFeedback() {
  const dispatch = useDispatch();
  const postsFeedback = useSelector((state) => state.user.feedback);

  useEffect(() => {
    dispatch(getFeedback())
  },[dispatch])

  return (
    <div className={s.main}>
      <h2>Dashboard - Musicfy</h2>
      <h2>Dashboard - Feedback</h2>
      <div className={s.feedbackComments}>
        {postsFeedback.map((e) => (
          <div
            key={e._id}
            className={s.feedbackComment}
          >
            <div
              className={s.feedbackAvatar}
            >
              <img src={e.avatar} alt='' />
              <div>
                <p>id: {e._id}</p>
                <p>date: {e.date}</p>
              </div>
            </div>
            <p>plan: {e.plan}</p>
            <p>title: {e.title}</p>
            <p>description: {e.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
