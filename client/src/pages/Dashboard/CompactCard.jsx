import s from "./compactcard.module.css";

export default function CompactCard({ total, title, value}) {
  return (
    <div className={s.container}>
      <div className={s.info}>
        <span className={s.big}>{total}</span>
        <span>{title}</span>
      </div>
      <div className={s.info}>
        <span className={s.small}>{value}</span>
        <span>Last 24 hours</span>
      </div>
    </div>
  )
} 
