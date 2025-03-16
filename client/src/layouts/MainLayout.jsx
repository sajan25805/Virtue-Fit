import React from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "../components/SideMenu";
import { Navbar } from "../components/Navbar";

const MainLayout = () => {
  return (

<>
<Navbar />
<div className="pt-[92px]"></div>
<div className="flex h-screen bg-gray-50">
      <SideMenu />
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
</>
  );
};

export default MainLayout;
