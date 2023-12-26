import React from "react";
import pin from "../../assets/push-pin-svgrepo-com (1).svg";
const FormPinIcon = () => {
  return (
    <>
      <img
        src={pin}
        alt=""
        className="absolute max-sm:right-0 max-sm:-top-6 max-md:right-2 md:right-2 max-md:-top-4 md:-top-4"
      />
      <p className="p-1 rounded-md bg-yellow-950/40 rounded- absolute max-sm:right-[2.1rem] max-sm:top-[0.6rem] max-md:right-[2.6rem] md:right-[2.6rem] max-md:top-[1.1rem] md:top-[1.1rem] shadow-sm shadow-yellow-950"></p>
    </>
  );
};

export default FormPinIcon;
