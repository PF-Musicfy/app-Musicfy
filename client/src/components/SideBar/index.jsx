import s from "./sidebar.module.css";

export default function SideBar({ children }){
  return (
    <div className={s.container}>
      {children}
    </div>
  )
}
