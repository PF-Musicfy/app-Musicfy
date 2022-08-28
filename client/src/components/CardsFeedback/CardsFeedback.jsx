import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import s from './cardsfeedback.module.css';
import { getFeedback } from "../../store/slice/user.js";

export default function CardsFeedback() {
  const dispatch = useDispatch();
  const { feedback } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getFeedback())
  },[dispatch])

  return (
    <div className={s.feedbackComments}>
      {feedback.map((e) => (
        <div
          key={e._id}
          className={s.feedbackComment}
        >
          <div
            className={s.feedbackAvatar}
          >
            <img src={e.avatar} alt='' />
            <div>
              <p>username: {e.username}</p>
              <p>date: {e.date}</p>
            </div>
          </div>
          <p>title: {e.title}</p>
          <p>description: {e.description}</p>
        </div>
      ))}
    </div>
  )
}
