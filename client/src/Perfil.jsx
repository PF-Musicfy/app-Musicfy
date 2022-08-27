import { useSelector, useDispatch } from "react-redux";
import { userTokenPremium } from "./store/slice/user";

const Perfil = () => {
  const { userToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      userTokenPremium("http://localhost:5000/api/v1/auth/premium", true)
    );
  };

  console.log(userToken);

  return (
    <div>
      <h2>Mi Perfil BEBE {userToken.username}</h2>
      <button onClick={handleClick}>Premium: </button>
    </div>
  );
};

export default Perfil;
