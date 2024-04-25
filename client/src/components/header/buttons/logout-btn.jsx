import { useContext } from "react";
import { useHistory } from "react-router-dom";

import ContextApi from "../../../context/context-api";

function LogoutButton({ isOpen, setIsOpen }) {
  const { removeToken } = useContext(ContextApi);
  const history = useHistory();

  const removeTokenHandler = async () => {
    await removeToken();
    localStorage.removeItem("token");
    setIsOpen(!isOpen);
    return history.replace("/login");
  };

  return (
    <button
      type="button"
      onClick={removeTokenHandler}
      className="opacity-0 text-bone_white bg-custom_pink px-6 py-1 border-2 border-custom_pink duration-500 hover:bg-inherit hover:text-custom_pink animate-slidedown [--slidedown-delay:500ms]"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
