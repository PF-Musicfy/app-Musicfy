import { useSelector, useDispatch } from "react-redux";
import { userTokenInfo } from "./store/slice/user";

const Perfil = () => {
  const { userToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      userTokenInfo()
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
