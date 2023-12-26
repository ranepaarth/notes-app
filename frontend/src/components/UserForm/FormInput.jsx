import React from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { RiEyeCloseFill } from "react-icons/ri";

const FormInput = ({
  Icon,
  type,
  width,
  placeholder,
  error,
  register,
  toggleShowPwd,
  showPwd,
}) => {
  return (
    <div className="flex flex-col items-start justify-start w-full">
      <span
        className={`${
          error ? "border-red-600 " : "border-transparent"
        } border-2  bg-yellow-950/20 flex items-center ${width}`}
      >
        <p className="p-2 text-lg text-yellow-950">{Icon}</p>
        <input
          type={type}
          className={
            "bg-transparent rounded w-full h-8 outline-none border-none tet-lg text-yellow-950 font-medium  placeholder:text-yellow-950/40"
          }
          placeholder={placeholder}
          autoFocus
          {...register}
        />
        {placeholder === "Password" && (
          <button
            type="button"
            onClick={toggleShowPwd}
            className="pr-4 text-lg text-yellow-950/80"
          >
            {showPwd ? <BsFillEyeFill /> : <RiEyeCloseFill />}
          </button>
        )}
      </span>
      <p className="text-xs md:text-sm text-red-600 font-medium">{error}</p>
    </div>
  );
};

export default FormInput;
