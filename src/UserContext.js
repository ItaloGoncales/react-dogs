import React from "react";
import * as api from "./api";
import { useNavigate } from "react-router-dom";
import useFetch from "./Hooks/useFetch";

export const UserContext = React.createContext();

// eslint-disable-next-line react/prop-types
export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);

  const { loading, error, request } = useFetch();
  const navigate = useNavigate();

  async function getUser(token) {
    const { url, options } = api.USER_GET(token);

    const { json } = await request(url, options);

    setData(json);
    setLogin(true);
  }

  async function userLogin(username, password) {
    const { url, options } = api.TOKEN_POST({
      username,
      password,
    });

    try {
      const { response, json } = await request(url, options);
      const { token, ...responseData } = json;

      if (!response.ok) throw new Error(`${responseData.message}`);

      window.localStorage.setItem("token", token);

      await getUser(token);
      navigate("/conta");
    } catch (error) {
      setLogin(false);
    }
  }

  async function userCreate(username, password, email) {
    const { url, options } = api.USER_POST({
      username,
      password,
      email,
    });

    try {
      const { response, json } = await request(url, options);

      if (!response.ok) throw new Error(`${json.message}`);

      userLogin(username, password);
    } catch (error) {
      setLogin(false);
    }
  }

  const userLogout = React.useCallback(
    function () {
      setData(null);
      setLogin(false);

      window.localStorage.removeItem("token");
      navigate("/login");
    },
    [navigate]
  );

  React.useEffect(() => {
    async function autologin() {
      const token = window.localStorage.getItem("token");

      if (token) {
        const { url, options } = api.TOKEN_VALIDATE_POST(token);

        try {
          let { response } = await request(url, options);

          if (!response.ok) throw new Error("Token inválido");
          await getUser(token);
        } catch (error) {
          await userLogout();
        }
      } else {
        await userLogout();
      }
    }

    autologin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{
        userLogin,
        userLogout,
        userCreate,
        data,
        error,
        loading,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
