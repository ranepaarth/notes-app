import React from "react";
import useAuth from "../../hooks/useAuth";
import { useNotes } from "../../hooks/useNotes";
import { NavLink } from "react-router-dom";

const ServerError = ({serverError}) => {
  const { user } = useAuth();
  const { notes } = useNotes();

  return (
    (!user || (serverError && notes?.length !== 0)) && (
      <div className="flex items-center justify-center">
        <span className="text-center bg-red-500/30 px-4 py-2 rounded text-red-700 border border-red-500">
          <p className=" text-xl font-medium my-1">
            {serverError || "Oops!! Seems like you are not logged in."}
          </p>
          <p className="text-sm">
            Have an account?
            <NavLink
              className="px-1 font-semibold text-base hover:underline"
              to="/signin"
            >
              Log in
            </NavLink>
          </p>
          <p className="text-lg">OR</p>
          <p>
            <NavLink
              className="px-1 font-semibold text-base hover:underline"
              to="/signup"
            >
              Create new account
            </NavLink>
          </p>
        </span>
      </div>
    )
  );
};

export default ServerError;
