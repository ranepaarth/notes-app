import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const ErrorPage = () => {
  const location = useLocation();
  return (
    <section className="w-full min-h-screen flex items-center justify-center">
      <article className="flex flex-col items-center md:border md:border-yellow-300 md:px-8 md:py-4 rounded-md md:shadow-md md:shadow-yellow-600">
        <NavLink to="/">
          <span className="duration-200 text-5xl font-semibold text-sky-950 hover:underline ">
            Notes
          </span>
        </NavLink>
        <p className="mt-5 mb-2">
          <span className="text-xl font-bold px-1 text-yellow-950">404</span>
          <span className="font-medium text-yellow-950/80">
            That&apos;s an error
          </span>
        </p>
        <p className="w-[420px] text-center text-yellow-950/60">
          The requested URL
          <span className="text-lg font-medium px-2 text-yellow-950">
            {location.pathname}
          </span>{" "}
          was not found on this server. That&apos;s all we know{" "}
        </p>
        <NavLink to='/' className='mt-4'>
            <span className="capitalize py-2 px-4 rounded-full border border-yellow-300 font-medium text-yellow-950 hover:shadow hover:shadow-yellow-700 transition-shadow">go home</span>
        </NavLink>
      </article>
    </section>
  );
};

export default ErrorPage;
