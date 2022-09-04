import s from "./cardalert.module.css";

export default function CardAlert({ children }) {
  return (
    <div className={s.card}>
      {children}
    </div>
  )
}
