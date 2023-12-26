import React from "react";

const FormDiv = ({ children }) => {
  return (
    <div className="w-full h-full bg-yellow-500 py-4 px-6 rounded-lg relative">
      {children}
    </div>
  );
};

export default FormDiv;
