import { createContext, useCallback, useEffect, useState } from "react";
import { postRequest } from "../utils/services";
import { baseURL } from "../utils/services";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(JSON.parse(user));
  }, []);

  // console.log(user);

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsRegisterLoading(true);
      setRegisterError(null);

      const res = await postRequest(
        `${baseURL}/user/register`,
        JSON.stringify(registerInfo)
      );

      setIsRegisterLoading(false);

      if (res.error) {
        return setRegisterError(res);
      }

      localStorage.setItem("user", JSON.stringify(res));
      setUser(res);
    },
    [registerInfo]
  );

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsRegisterLoading(true);
      setRegisterError(null);

      const res = await postRequest(
        `${baseURL}/user/login`,
        JSON.stringify(loginInfo)
      );

      setIsRegisterLoading(false);

      if (res.error) {
        return setRegisterError(res);
      }

      localStorage.setItem("user", JSON.stringify(res));
      setUser(res);
    },
    [loginInfo]
  );

  const logoutUser = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        logoutUser,
        loginUser,
        updateLoginInfo,
        loginInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
