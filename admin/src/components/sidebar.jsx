// // "use client";

// // import { Link } from "react-router-dom";
// // import { Home, Dumbbell, Utensils, Wind, Layers, LogOut } from "lucide-react";

// // export function Sidebar({ activeTab, setActiveTab }) {
// //   const menuItems = [
// //     { id: "home", label: "Home", icon: Home, to: "/home" },
// //     { id: "workouts", label: "Workouts", icon: Dumbbell, to: "/workouts" },
// //     { id: "meals", label: "Meals", icon: Utensils, to: "/meals" },
// //     { id: "meditations", label: "Meditations", icon: Wind, to: "/meditations" },
// //     { id: "programs", label: "Programs", icon: Layers, to: "/programs" },
// //   ];

// //   return (
// //     <aside className="w-64 bg-[#0E0E2C] text-white">
// //       <div className="p-6">
// //         <h1 className="text-xl font-bold">Trainer Dashboard</h1>
// //       </div>
// //       <nav className="mt-6">
// //         <ul>
// //           {menuItems.map((item) => (
// //             <li key={item.id}>
// //               <Link
// //                 to={item.to}
// //                 onClick={() => setActiveTab(item.id)}
// //                 className={`flex w-full items-center px-6 py-3 text-left transition-colors ${
// //                   activeTab === item.id
// //                     ? "bg-[#00A8FF] text-white"
// //                     : "text-gray-300 hover:bg-[#1A1A3A]"
// //                 }`}
// //               >
// //                 <item.icon className="mr-3 h-5 w-5" />
// //                 {item.label}
// //               </Link>
// //             </li>
// //           ))}
// //           <li className="mt-auto">
// //             <button className="flex w-full items-center px-6 py-3 text-left text-gray-300 transition-colors hover:bg-[#1A1A3A]">
// //               <LogOut className="mr-3 h-5 w-5" />
// //               Logout
// //             </button>
// //           </li>
// //         </ul>
// //       </nav>
// //     </aside>
// //   );
// // }



// "use client";

// import { Link } from "react-router-dom";
// import { Home, Dumbbell, Utensils, Pizza ,Wind, Layers, LogOut, Menu, X } from "lucide-react";
// import { useState, useEffect } from "react";

// export function Sidebar({ activeTab, setActiveTab }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   const menuItems = [
//     { id: "home", label: "Overview", icon: Home, to: "/trainer/dashboard" },
//     { id: "workouts", label: "Workouts", icon: Dumbbell, to: "/workout" },
//     { id: "meals", label: "Meals", icon: Utensils, to: "/meals" },
//     { id: "snacks", label: "Snacks", icon: Pizza, to: "/snacks" }, 
//     { id: "meditations", label: "Meditations", icon: Wind, to: "/meditations" },
//     { id: "programs", label: "Programs", icon: Layers, to: "/programs" },
//   ];

//   // Handle responsive behavior
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 768);
//       if (window.innerWidth < 768) {
//         setIsOpen(false);
//       } else {
//         setIsOpen(true);
//       }
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <aside
//         className={`fixed md:static h-screen left-0 top-0 z-40 transition-all duration-300 ease-in-out ${
//           isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
//         } ${isMobile ? "w-64" : "w-64"}`}
//       >
//         <div className="p-6 bg-gradient-to-r from-[#0E0E2C] to-[#004366] text-white h-full">
//           <h1 className="text-xl font-bold">Trainer Dashboard</h1>

//           <nav className="mt-6">
//             <ul>
//               {menuItems.map((item) => (
//                 <li key={item.id}>
//                   <Link
//                     to={item.to}
//                     onClick={() => setActiveTab(item.id)}
//                     className={`flex w-full items-center px-6 py-3 text-left transition-colors ${
//                       activeTab === item.id
//                         ? "bg-[#00A8FF] text-white"
//                         : "text-gray-300 hover:bg-[#1A1A3A]"
//                     }`}
//                   >
//                     <item.icon className="mr-3 h-5 w-5" />
//                     {item.label}
//                   </Link>
//                 </li>
//               ))}
//               <li className="mt-auto">
//                 <button className="flex w-full items-center px-6 py-3 text-left text-gray-300 transition-colors hover:bg-[#1A1A3A]">
//                   <LogOut className="mr-3 h-5 w-5" />
//                   Logout
//                 </button>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </aside>

//       {/* Mobile menu button */}
//       {isMobile && (
//         <button
//           onClick={toggleSidebar}
//           className="fixed top-4 left-4 z-50 p-2 rounded-md bg-[#0E0E2C] text-white"
//         >
//           {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//         </button>
//       )}

//       {/* Main content */}
//       <div className="flex-1 overflow-auto">{/* Your main content goes here */}</div>
//     </div>
//   );
// }




import { Link, useNavigate } from "react-router-dom";
import { Home, Dumbbell, Utensils, Pizza, Wind, Layers, LogOut, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/auth-store"; // Correct path based on your setup

export function Sidebar({ activeTab, setActiveTab }) {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const menuItems = [
    { id: "home", label: "Overview", icon: Home, to: "/trainer/dashboard" },
    { id: "workouts", label: "Workouts", icon: Dumbbell, to: "/workout" },
    { id: "meals", label: "Meals", icon: Utensils, to: "/meals" },
    { id: "snacks", label: "Snacks", icon: Pizza, to: "/snacks" },
    { id: "meditations", label: "Meditations", icon: Wind, to: "/meditations" },
    { id: "programs", label: "Programs", icon: Layers, to: "/programs" },
  ];

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) setIsOpen(false);
      else setIsOpen(true);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    await logout();
    navigate("/trainer/login");
  };

  return (
    <div className="flex h-screen">
      <aside className={`fixed md:static h-screen left-0 top-0 z-40 transition-all duration-300 ${isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"} ${isMobile ? "w-64" : "w-64"}`}>
        <div className="p-6 bg-gradient-to-r from-[#0E0E2C] to-[#004366] text-white h-full">
          <h1 className="text-xl font-bold">Trainer Dashboard</h1>
          <nav className="mt-6">
            <ul>
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.to}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center px-6 py-3 text-left transition-colors ${activeTab === item.id ? "bg-[#00A8FF] text-white" : "text-gray-300 hover:bg-[#1A1A3A]"}`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mt-auto">
                <button onClick={handleLogout} className="flex w-full items-center px-6 py-3 text-left text-gray-300 hover:bg-[#1A1A3A]">
                  <LogOut className="mr-3 h-5 w-5" />
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {isMobile && (
        <button onClick={toggleSidebar} className="fixed top-4 left-4 z-50 p-2 rounded-md bg-[#0E0E2C] text-white">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      )}

      <div className="flex-1 overflow-auto">{/* Main Content */}</div>
    </div>
  );
}

