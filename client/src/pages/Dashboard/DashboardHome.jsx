import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getUsers } from "store/slice/user";

import s from "./dashboard.module.css";
import { CardsFeedbackCompact } from "components/Cards";

export default function DashboardHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <div className={s.module} onClick={() => navigate('list')}>
        <div className={s.preview}>
          <div className={s.statusbar}>
            <div>
              free {Object.keys(users).length}
            </div>
            <div>
              premium {Object.values(users).reduce((sum, val)=>(val.premium ? sum+1 : sum),0)}
            </div>
            <div>
              online {Object.values(users).reduce((sum, val)=>(val.online ? sum+1 : sum),0)}
            </div>
          </div>
          <div className={s.submodule}>
            lista de usuarios
          </div>
        </div>
      </div>
      <div className={s.module} onClick={() => navigate('feedback')}>
        <p>FeedbackCompact</p>
        <CardsFeedbackCompact />
      </div>
    </>
  )
}
