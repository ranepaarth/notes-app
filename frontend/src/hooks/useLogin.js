import { useState } from "react";
import useAuth from "./useAuth";

const useLoginUser = () => {
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuth();
  const login = async (data) => {
    setServerError(null);
    setLoading(true);
    const response = await fetch("http://localhost:4000/api/users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      // console.log(responseData.error);
      setServerError(responseData.error);
      setLoading(false);
    }

    if (response.ok) {
      // console.log(responseData);
      localStorage.setItem(
        "notesUser",
        JSON.stringify({
          userName: responseData.userName,
          jwt: responseData.jwt,
        })
      );

      dispatch({ type: "LOGIN", payload: responseData });
      setServerError(null);
      setLoading(false);
    }
  };

  return { login, serverError, loading };
};

export default useLoginUser;
