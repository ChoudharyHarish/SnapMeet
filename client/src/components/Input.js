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
      className={`border-2 rounded p-2  w-full my-2 outline-none  ${className}`}
    />
  );
};

export default Input;
