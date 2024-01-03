import PropTypes from "prop-types";
import React, { useState } from "react";
import { FaCaretDown, FaUserPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { TbLogin, TbLogout2 } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useLogout from "../../../hooks/useLogout";
import NavItem from "./NavItem";
import { navigation } from "./navigation";
const SideBar = ({ toggleShowNav, showNav }) => {
  const [showUserOption, setShowUserOption] = useState(false);
  const { user } = useAuth();
  const { logout } = useLogout();

  const toggleShowUserOption = () => {
    setShowUserOption((prev) => !prev);
  };
  return (
    <>
      <div
        className={showNav ? "mobile-menu-sidebar-container" : "-z-0"}
        onClick={toggleShowNav}
        onKeyDown={toggleShowNav}
      ></div>
      <aside
        className={`mobile-menu-sidebar ${
          showNav ? " translate-x-0" : " translate-x-full"
        }`}
      >
        <div>
          <div className="grid place-items-end">
            <button
              type="button"
              className="mobile-menu-close-btn"
              onClick={toggleShowNav}
            >
              <IoClose />
            </button>
          </div>
          <div className="flex flex-col items-center my-4">
            {navigation.map((item) => {
              // if(item.page === "my notes" && !user) return "";
              return (
                <NavItem key={item?.page} path={item?.path} page={item?.page} />
              );
            })}
          </div>
          {user && (
            <button
              className="mobile-menu-item justify-center flex items-center gap-2"
              onClick={logout}
            >
              <span className="text-2xl">
                <TbLogout2 />
              </span>
              <span>Logout</span>
            </button>
          )}
        </div>

        <div className={user ? "hidden" : "block"}>
          <button className="mobile-menu-user" onClick={toggleShowUserOption}>
            <p>User</p>
            <p
              className={`${
                showUserOption ? "rotate-180 ease-linear duration-300" : ""
              } ease-linear duration-300`}
            >
              <FaCaretDown />
            </p>
          </button>
          <div
            className={`user-option-container linear ${
              showUserOption ? "translate-y-3" : "invisible"
            }`}
          >
            <NavLink to="/signup" className="user-option-item">
              <span>
                <FaUserPlus />
              </span>
              <span>Sign Up</span>
            </NavLink>
            <NavLink to="/signin" className="user-option-item">
              <span>
                <TbLogin/>
              </span>
              <span>Sign In</span>
            </NavLink>
          </div>
        </div>

        <div className="mobile-menu-footer">
          Copyright &copy; 2023 | ranepaarth
        </div>
      </aside>
    </>
  );
};

SideBar.proptypes = {
  toggleShowNav: PropTypes.func,
  showNav: PropTypes.bool,
};

export default SideBar;
