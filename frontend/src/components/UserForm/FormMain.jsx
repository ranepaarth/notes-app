import React from "react";

const FormMain = ({ handleSubmit, onFormSubmit, onFormErrors, children }) => {
  return (
    <form
      className="flex flex-col items-start justify-start mt-5 gap-4"
      onSubmit={handleSubmit(onFormSubmit, onFormErrors)}
      noValidate
      autoComplete="off"
    >
      {children}
    </form>
  );
};

export default FormMain;
