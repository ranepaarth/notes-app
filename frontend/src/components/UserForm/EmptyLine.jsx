import React from "react";

const EmptyLine = ({ width }) => {
  return (
    <span className={"flex items-center bg-yellow-950/20 h-8 " + width}></span>
  );
};

export default EmptyLine;
