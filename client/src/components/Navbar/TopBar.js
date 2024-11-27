import React, { useState } from "react";

import { Images } from "../../assets";
import Input from "../Input";
import Button from "../Button";
import { Icon } from "@iconify/react/dist/iconify.js";

const TopBar = () => {
  const [searchVal, setSearchVal] = useState("");

  return (
    <header className="md:hidden  flex items-center fixed w-full gap-6 px-2 bg-background z-[1000] border-b border-border py-4">
      <img src={Images.Logo} alt="logo" className="h-8 w-8" />
      <Input
        type="text"
        placeholder="Search"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        className=""
      />
      <Button
        icon=<Icon
          icon="mdi:heart-outline"
          className="h-6 w-6 text-textPrimary"
        />
      />
    </header>
  );
};

export default TopBar;
