import React from "react";
import { NavLink } from "react-router-dom";

const FormHeader = ({ heading, subheader, linkTo, linkToPage }) => {
  return (
    <header>
      <p className="text-center text-yellow-950 text-2xl font-bold divide-x divide-solid">
        {heading}
      </p>
      <hr className="border-yellow-950/20 mt-1" />
      <p className="text-center py-2 text-xs font-normal text-yellow-950/70">
        {subheader}
        <NavLink
          to={linkTo}
          className="text-yellow-950/70 font-semibold hover:underline px-1 text-sm"
        >
          {linkToPage}
        </NavLink>
      </p>
    </header>
  );
};

export default FormHeader;
