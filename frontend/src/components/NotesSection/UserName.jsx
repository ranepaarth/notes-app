import React from "react";
import useAuth from "../../hooks/useAuth";

const UserName = () => {
  const { user } = useAuth();

  return (
    user && (
      <h3 className="text-center mb-2 flex justify-center items-baseline gap-1">
        <span className="font-medium text-yellow-950/70 text-xl">Hello</span>
        <span className="font-semibold text-2xl text-yellow-950/90">
          {user?.userName}
        </span>
      </h3>
    )
  );
};

export default UserName;
