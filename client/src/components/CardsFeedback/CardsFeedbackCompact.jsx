import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import s from './cardsfeedback.module.css';
import { getFeedback } from "../../store/slice/user.js";

export default function CardsFeedbackCompact() {
  const dispatch = useDispatch();
  const { feedback } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getFeedback())
  },[dispatch])

  return (
    <div className={s.feedbackComments}>
      {feedback.slice(0,3).map((e) => (
        <div
          key={e._id}
          className={s.feedbackComment}
          style={{
            padding: '5px 0px'
          }}
        >
          <div
            className={s.feedbackAvatar}
          >
            <div>
              <p>username: {e.username}</p>
            </div>
          </div>
          <p>title: {e.title}</p>
          <p>description: {e.description}</p>
        </div>
      ))}
    </div>
  )
}
