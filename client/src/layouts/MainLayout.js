// MainLayout.js
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

import BottomBar from "../components/Navbar/BottomBar";
import SideBar from "../components/Navbar/SideBar";
import TopBar from "../components/Navbar/TopBar";

const MainLayout = (props) => {
  const { expanded } = props;
  return (
    <div className="flex">
      <Suspense>
        <div className="flex flex-col md:flex-row w-full">
          <SideBar expanded={expanded} />
          <TopBar />
          <div className="mt-[60px] md:mt-0 w-full">
            <Outlet />
          </div>
          <BottomBar />
        </div>
      </Suspense>
    </div>
  );
};

export default MainLayout;
