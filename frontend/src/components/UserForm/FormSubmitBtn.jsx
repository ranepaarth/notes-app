import React from "react";
import sticker from "../../assets/sticker-svgrepo-com.svg";

const FormSubmitBtn = () => {
  return (
    <span className="flex items-center justify-center">
      <button className="opacity-25 hover:opacity-90 transition-opacity">
        <img src={sticker} alt="" className="w-12" />
      </button>
    </span>
  );
};

export default FormSubmitBtn;
