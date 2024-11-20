// MainLayout.js
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

import BottomBar from "../components/navbar/BottomBar";
import SideBar from "../components/navbar/SideBar";
import TopBar from "../components/navbar/TopBar";

const MainLayout = (props) => {
  const { expanded, addPadding } = props;
  return (
    <div className="flex">
      <Suspense>
        <div className="flex flex-col md:flex-row w-full">
          <SideBar expanded={expanded} />
          <TopBar />
          <div
            className={`mt-[60px] md:mt-0 w-full ${
              addPadding ? "md:pl-[72px] lg:pl-60" : "md:pl-[72px]"
            }`}
          >
            <Outlet />
          </div>
          <BottomBar />
        </div>
      </Suspense>
    </div>
  );
};

export default MainLayout;
