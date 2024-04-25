import { useState } from "react";
import ContextApi from "./context-api";

function ContextProvider(props) {
  const localStorageToken = localStorage.getItem("token");
  const [Token, setToken] = useState(localStorageToken);
  const isLoggedin = !!Token;

  const removeTokenHandler = () => {
    setToken(null);
  };

  const addTokenHandler = (token) => {
    setToken(token);
  };

  const contextValue = {
    token: Token,
    isLoggedin: isLoggedin,
    removeToken: removeTokenHandler,
    addToken: addTokenHandler,
  };

  return (
    <ContextApi.Provider value={contextValue}>
      {props.children}
    </ContextApi.Provider>
  );
}

export default ContextProvider;
