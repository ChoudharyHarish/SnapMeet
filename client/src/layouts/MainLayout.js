// MainLayout.js
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import CreateModal from "../components/modals/CreateModal";
import BottomBar from "../components/Navbar/BottomBar";
import SideBar from "../components/Navbar/SideBar";
import TopBar from "../components/Navbar/TopBar";

const MainLayout = (props) => {
  const { expanded, addPadding } = props;
  const { createModalOpen } = useSelector((state) => state.user);
  return (
    <>
      <div className="flex">
        <Suspense>
          <div className="flex flex-col md:flex-row w-full">
            <SideBar expanded={expanded} />
            <TopBar />
            <div
              className={`mt-[73px] md:mt-0 w-full ${
                addPadding ? "md:pl-[72px] lg:pl-60" : "md:pl-[72px]"
              }`}
            >
              <Outlet />
            </div>
            <BottomBar />
          </div>
        </Suspense>
      </div>
      {createModalOpen && <CreateModal />}
    </>
  );
};

export default MainLayout;
