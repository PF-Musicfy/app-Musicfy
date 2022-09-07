import s from "./loading.module.css";
import sLight from "./loadingLight.module.css";

export default function Loading({ text }) {
  const theme = localStorage.getItem("theme");

  return (
    <div className={theme === "light" ? sLight.container : s.container}>
      {text || "Loading"}
      <div className={theme === "light" ? sLight.spinner : s.spinner}></div>
    </div>
  );
}
