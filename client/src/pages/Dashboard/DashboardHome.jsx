import s from "./dashboard.module.css";
import CompactCard from "./CompactCard.jsx";
import { CardsFeedbackCompact } from "../../components/CardsFeedback";

export default function DashboardHome() {
  return (
    <div>
      <div className={s.module}>
        <CompactCard
          total={'2,123'}
          title={'free'}
        />
        <CompactCard
          total={'4,643'}
          title={'premium'}
        />
        <CompactCard
          total={'$1,012'}
          title={'collect'}
        />
      </div>
      <div className={s.module}>
        <p>FeedbackCompact</p>
        <CardsFeedbackCompact />
      </div>
      <div className={s.module}>
        Ultimas compras de cuenta Premium
      </div>
    </div>
  )
}
