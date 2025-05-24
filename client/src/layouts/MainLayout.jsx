// import React from "react";
// import { Outlet } from "react-router-dom";
// import SideMenu from "../components/SideMenu";
// import { Navbar } from "../components/Navbar";

// const MainLayout = () => {
//   return (

// <>
// <Navbar />
// <div className="pt-[92px]"></div>
// <div className="flex h-screen bg-gray-50">
//       <SideMenu />
//       <main className="flex-1 overflow-auto p-6">
//         <Outlet />
//       </main>
//     </div>
// </>
//   );
// };

// export default MainLayout;



import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SideMenu from "../components/SideMenu";
import { Navbar } from "../components/Navbar";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-hot-toast";

const restrictedRoutes = ["/meditation", "/program"];

const MainLayout = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const [showUpgradeBanner, setShowUpgradeBanner] = useState(false);

  useEffect(() => {
    if (user?.subscription === "Free" && restrictedRoutes.some((route) => location.pathname.startsWith(route))) {
      setShowUpgradeBanner(true);
    } else {
      setShowUpgradeBanner(false);
    }
  }, [location.pathname, user]);

  const handleUpgradeClick = () => {
    navigate("/upgrade"); // 👈 Create this route to show subscription plans
  };

  return (
    <>
      <Navbar />
      {showUpgradeBanner && (
        <div className="bg-yellow-100 text-yellow-800 text-sm px-4 py-2 text-center">
          This content is only available for Premium users.
          <button
            onClick={handleUpgradeClick}
            className="ml-4 underline font-semibold text-yellow-900 hover:text-yellow-700"
          >
            Upgrade Now
          </button>
        </div>
      )}
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
