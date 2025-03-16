import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

const AppLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-[92px]"></div>
      <Outlet />
    </div>
  );
};

export default AppLayout;

