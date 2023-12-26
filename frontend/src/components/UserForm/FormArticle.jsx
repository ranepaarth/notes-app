import React from "react";

const FormArticle = ({ children }) => {
  return (
    <article className="max-sm:w-[350px] max-md:w-[440px] md:w-[500px] p-5 rounded-lg bg-yellow-950/40 -rotate-3 shadow-xl shadow-yellow-950/40 border border-yellow-950/30">
      {children}
    </article>
  );
};

export default FormArticle;
