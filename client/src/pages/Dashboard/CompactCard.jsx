import s from "./compactcard.module.css";

export default function CompactCard({ total, title }) {
  return (
    <div className={s.container}>
      <div className={s.info}>
        <span className={s.big}>{total}</span>
        <span>{title}</span>
      </div>
    </div>
  )
} 
