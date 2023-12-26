import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <span className="logo">Notes</span>
    </Link>
  );
};

export default Logo;
