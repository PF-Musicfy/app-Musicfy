import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { userTokenPremium } from "../../store/slice/user";
import { useNavigate } from "react-router-dom";
import styles from '../CheckoutPremium/checkout.module.css'
import axios from "axios";

export default function CheckoutPremium() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.user);
  useEffect(() => {
    console.log(user)
    if (Object.keys(user).length === 0 || user.premium === true) return console.log('PREMIUM');
    dispatch(userTokenPremium())
    .then(()=> {
      let email = user.email,
      subject = 'MusicFy premium',
      text = `<p> Congrats! You have become a premium user!!! Enjoy the benefits of your plan. Start making your own playlist and much more! <p>`
      axios
      .post(`${axios.defaults.baseURL}/send-message`, {
        email,
        subject,
        text,
      })
    })
    .catch((e) => console.log(e));
  
    // navigate("http://localhost:3000");
    // window.location.replace("http://localhost:3000/");
  }, [user]);

  const handleRedirect = () => {
    setTimeout(() => navigate("/"), 2000);
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
