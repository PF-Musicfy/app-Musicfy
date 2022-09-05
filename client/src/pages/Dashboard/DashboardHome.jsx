import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getUsers } from "store/slice/user";

import s from "./dashboard.module.css";
import CardsFeedbackCompact from "../.././components/Cards/CardsFeedback/CardsFeedbackCompact";

export default function DashboardHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <div className={s.module}>
        <div className={s.preview}>
          <div className={s.containerstatus}>
            <div className={s.statusbar} onClick={() => navigate("list")}>
              <div>Free {Object.keys(users).length}</div>
              <div>
                Premium{" "}
                {Object.values(users).reduce(
                  (sum, val) => (val.premium ? sum + 1 : sum),
                  0
                )}
              </div>
              <div>
                Online{" "}
                {Object.values(users).reduce(
                  (sum, val) => (val.online ? sum + 1 : sum),
                  0
                )}
              </div>
            </div>
            <div className={s.containerrol}>
              <div className={s.rol}>Master</div>
            </div>
          </div>
          <div className={s.submodule} onClick={() => navigate("list")}>
            <span className={s.openuser}>Open User List</span>
          </div>
        </div>
      </div>
      <div className={s.module} onClick={() => navigate("feedback")}>
        <p>FeedbackCompact</p>
        <CardsFeedbackCompact />
      </div>
    </>
  );
}
