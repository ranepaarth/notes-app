import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ path, page }) => {
  return (
    <NavLink to={path} className="w-full flex">
      <span className="mobile-menu-item">{page}</span>
    </NavLink>
  );
};

NavItem.propTypes = {
  path: PropTypes.string,
  page: PropTypes.string,
};

export default NavItem;
