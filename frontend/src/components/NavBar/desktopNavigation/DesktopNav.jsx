import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Logo from "../Logo";
import { navigation } from "../mobileNavigation/navigation";
import useLogout from "../../../hooks/useLogout";

const DesktopNav = () => {
  const { user } = useAuth();
  const {logout} = useLogout()
  return (
    <div className="desktop-nav">
      <Logo />
      <div className="desktop-nav-center">
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="desktop-nav-center-item"
          >
            {item.page}
          </NavLink>
        ))}
      </div>
      {user ? (
        <button className="" onClick={logout}>Logout</button>
      ) : (
        <div className="desktop-nav-right">
          <NavLink to="/signup" className="desktop-signup-btn">
            New Account
          </NavLink>
          <NavLink to="/signin" className="desktop-signin-btn">
            Log In
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default DesktopNav;
