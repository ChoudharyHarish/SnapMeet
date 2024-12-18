import React from "react";

const Button = (props) => {
  const { handleClick, name, icon, className } = props;
  return (
    <button
      className={`${className} flex gap-2 text-textPrimary`}
      onClick={handleClick}
    >
      {name} {icon}
    </button>
  );
};

export default Button;
