import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CgArrowUpO } from "react-icons/cg"

import s from './cardsfeedback.module.css';
import { getFeedback } from "../../store/slice/user.js";
import getPagination from "../../utils/getPagination.js";

export default function CardsFeedback() {
  const dispatch = useDispatch();
  const { feedback } = useSelector((state) => state.user);

  const [pagina, setPagina] = useState(1);
  const [porPagina] = useState(4);

  const {arr,maximo} = getPagination(feedback,porPagina,pagina);

  const nextPage = () => {setPagina(pagina + 1)}
  const previousPage = () => {setPagina(pagina - 1)}
  const reset = () => {setPagina(1)}

  useEffect(() => {
    dispatch(getFeedback())
  },[dispatch])

  return (
    <div className={s.feedbackComments}>
      <button disabled={pagina <= 1} onClick={previousPage}>&lt;</button>
      <span>{pagina} de {maximo}</span>
      <button disabled={pagina >= maximo} onClick={nextPage}>&gt;</button>
      {arr.map((e) => (
        <div key={e._id} className={s.feedbackComment}>
          <div className={s.feedbackAvatar}>
            <div>
              <p>Register User</p>
              <p className={s.date}>{e.date}</p>
            </div>
          </div>
          <p className={s.description}>{e.description}</p>
        </div>
      ))}
    </div>
  )
}
