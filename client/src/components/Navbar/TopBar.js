import React, { useState } from "react";

import { Images } from "../../assets";
import Input from "../Input";
import Button from "../Button";
import { Icon } from "@iconify/react/dist/iconify.js";

const TopBar = () => {
  const [searchVal, setSearchVal] = useState("");

  return (
    <header className="md:hidden  flex items-center fixed w-full gap-6 px-8">
      <img src={Images.Logo} alt="logo" className="h-8 w-8" />
      <Input
        type="text"
        placeholder="Search"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
      />
      <Button icon=<Icon icon="mdi:heart-outline" className="h-6 w-6" /> />
    </header>
  );
};

export default TopBar;
