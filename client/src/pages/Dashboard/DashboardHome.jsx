import s from "./dashboard.module.css";
import CompactCard from "./CompactCard.jsx";
import { CardsFeedbackCompact } from "../../components/CardsFeedback";

export default function DashboardHome() {
  return (
    <div className={s.main}>
      <h2>Dashboard - Musicfy</h2>
      <CompactCard
        total={'2,123'}
        title={'free'}
        value={'1,123'}
      />
      <CompactCard
        total={'4,643'}
        title={'premium'}
        value={'123'}
      />
      <CompactCard
        total={'$1,012'}
        title={'collect'}
        value={'$23'}
      />
      <CardsFeedbackCompact />
      <div>
        Ultimas compras de cuenta Premium
      </div>
      <div>
        Musicas mas escuchadas - con filtros
      </div>
    </div>
  )
}
