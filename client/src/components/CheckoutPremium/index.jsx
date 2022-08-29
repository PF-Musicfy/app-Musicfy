import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { userTokenPremium } from "../../store/slice/user";
import { useNavigate } from "react-router-dom";

export default function CheckoutPremium() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    //preguntar algo antes de validar
    dispatch(userTokenPremium());
    navigate("/");
  }, []);
  return (
    <>
      <h1>{user.username}</h1>
    </>
  );
}
