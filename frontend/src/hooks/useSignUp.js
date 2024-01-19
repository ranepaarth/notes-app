import { useState } from "react";

const useSignUp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const signupUser = async (data) => {
    setLoading(true);
    setError(null);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/signup`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(responseData.error);
      setSuccess(false);
    }

    if (response.ok) {
      setError(null);
      setLoading(false);
      setSuccess(true);
    }
  };

  return { signupUser, error, loading, success };
};

export default useSignUp;
