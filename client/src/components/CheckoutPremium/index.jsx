import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { userTokenPremium } from "../../store/slice/user";
import { useNavigate } from "react-router-dom";
import styles from '../CheckoutPremium/checkout.module.css'

export default function CheckoutPremium() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    //preguntar algo antes de validar
    dispatch(userTokenPremium());
    // navigate("http://localhost:3000");
    // window.location.replace("http://localhost:3000/");
  }, []);

  const handleRedirect = () => {
    window.location.replace("http://localhost:3000/");
  }

  return (
    <div className={styles.containerCard}>
      <div className={styles.cardMessage}>
        <span className={styles.descripMessage}>Start enjoying your benefits as a premium, create playlists, add songs to favorites, without limits</span>
      </div>
      <button className={styles.buttonRedirect} onClick={() => handleRedirect()}><p className={styles.pHome}>Home</p></button>
    </div>
  );
}
