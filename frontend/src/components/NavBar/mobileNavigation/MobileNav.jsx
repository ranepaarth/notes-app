import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import Logo from "../Logo";
import SideBar from "./SideBar";

const MobileNav = () => {
  const [showNav, setShowNav] = useState(false);
  const toggleShowNav = () => {
    setShowNav((prev) => !prev);
  };
  return (
    <>
      <div className="mobile-nav">
        <Logo />
        <button
          type="button"
          className="mobile-nav-menu-btn"
          onClick={toggleShowNav}
        >
          <IoMenu />
        </button>
      </div>

      <SideBar toggleShowNav={toggleShowNav} showNav={showNav} />
    </>
  );
};

export default MobileNav;
