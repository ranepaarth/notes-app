import React from "react";
import DesktopNav from "./desktopNavigation/DesktopNav";
import MobileNav from "./mobileNavigation/MobileNav";
const NavBar = () => {
  return (
    <>
      <nav className="md:hidden">
        <MobileNav />
      </nav>
      <nav className="hidden md:block">
        <DesktopNav />
      </nav>
    </>
  );
};

export default NavBar;
