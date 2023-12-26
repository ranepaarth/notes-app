import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar/NavBar";

const AppLayout = () => {
  return (
    <div className="px-6 md:px-10">
      <NavBar />
      <main className="min-h-[calc(100vh-76px)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
