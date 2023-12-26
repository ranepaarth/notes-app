import React from "react";
import sticker from "../../assets/sticker-svgrepo-com.svg";

const FormSubmitBtn = () => {
  return (
    <span className="flex items-center justify-between w-full">
      <p className="grow aspect-video bg-yellow-950/20 h-8 mr-5"></p>
      <button className="px-2 opacity-25 hover:opacity-90 transition-opacity">
        <img src={sticker} alt="" className="w-10" />
      </button>
    </span>
  );
};

export default FormSubmitBtn;
