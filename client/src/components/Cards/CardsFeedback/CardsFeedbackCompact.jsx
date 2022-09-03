import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import s from './cardsfeedback.module.css';
import { getFeedback } from "store/slice/user.js";

export default function CardsFeedbackCompact() {
  const dispatch = useDispatch();
  const { feedback } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getFeedback())
  },[dispatch])

  return (
    <div className={s.feedbackComments}>
      {feedback.slice(0,3).map((e) => (
        <div key={e._id} className={s.feedbackComment}>
          <div className={s.feedbackAvatar}>
            <div>
              <p>Register User</p>
              <p className={s.date}>{e.date}</p>
            </div>
          </div>
          <p className={s.description}>{e.description}</p>
        </div>
      ))}
    </div>
  )
}
