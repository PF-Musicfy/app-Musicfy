import { useNavigate } from "react-router-dom";

import s from "./dashboard.module.css";
import { CardsFeedbackCompact } from "../../components/CardsFeedback";

export default function DashboardHome() {
  const navigate = useNavigate();

  return (
    <>
      <div className={s.module} onClick={() => navigate('list')}>
        <div className={s.preview}>
          <div className={s.statusbar}>
            <div>
              free 1376
            </div>
            <div>
              premium 113
            </div>
            <div>
              online 12
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
