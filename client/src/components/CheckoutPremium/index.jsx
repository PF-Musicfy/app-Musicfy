import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { userTokenPremium } from "../../store/slice/user";

export default function CheckoutPremium() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    //preguntar algo antes de validar

    dispatch(userTokenPremium());
  }, []);
  return (
    <>
      <h1>{user.username}</h1>
    </>
  );
}
