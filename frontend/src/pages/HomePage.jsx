import React from "react";
import { NavLink } from "react-router-dom";
import businessman from "../assets/businessman.svg";
import curlyMan from "../assets/curly-hair-man-holding-smartphone.svg";
import starsIcon from "../assets/stars-svgrepo-com.svg";
const HomePage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center my-auto h-[calc(100vh-72px)] text-sky-950">
      <img
        src={starsIcon}
        alt=""
        className="w-5 hidden md:block absolute top-20 right-10 lg:right-32"
      />
      <img
        src={starsIcon}
        alt=""
        className="w-20 absolute top-2 left-10 lg:left-24 md:block"
      />
      <img
        src={starsIcon}
        alt=""
        className="w-16 absolute bottom-20 left-60 lg:left-72 rotate-180 hidden md:block"
      />

      <span className="text-5xl xl:text-7xl font-extrabold relative -top-10">
        <img src={starsIcon} alt="" className="w-5 absolute top-10 left-5" />
        <img
          src={starsIcon}
          alt=""
          className="w-20 absolute bottom-0 right-5"
        />
        <img
          src={starsIcon}
          alt=""
          className="w-16 absolute bottom-60 right-16 rotate-180"
        />
        <p className="py-2 text-center">Write your</p>
        <p className="py-2 text-center">thoughts down</p>
        <p className="py-2 text-center">as they come to</p>
        <p className="py-2 text-center">you</p>
      </span>
      <img
        src={curlyMan}
        alt=""
        className="w-40 md:w-60 lg:w-72 absolute bottom-0 left-0 hidden lg:block"
      />
      <img
        src={businessman}
        alt=""
        className="w-40 md:w-60 lg:w-72 absolute bottom-0 right-0 -scale-x-100 hidden lg:block"
      />
      <span className="text-center w-[450px] mx-5">
        Notes is a simple to use free note taking app made with Node.Js,
        Express, MongoDB, ReactJs & TailwindCSS
      </span>
      <NavLink
        to="/signup"
        className="my-5 bg-sky-950 py-1 px-3 rounded-full text-yellow-200 hover:scale-110"
      >
        <span>Try Notes, it's FREE!</span>
      </NavLink>
    </div>
  );
};

export default HomePage;
