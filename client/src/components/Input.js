import React, { useState } from "react";

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  onKeyDown,
  className,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={`p-2 w-full outline-none bg-background text-textPrimary ${className} `}
    />
  );
};

export default Input;
