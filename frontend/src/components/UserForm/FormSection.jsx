import React from "react";

const FormSection = ({ children }) => {
  return (
    <section className="flex items-center justify-center h-[calc(100vh-76px)]">
      {children}
    </section>
  );
};

export default FormSection;
