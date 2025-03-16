



// // // // import {
// // // //     CalendarIcon,
// // // //     CubeTransparentIcon,
// // // //     ArrowLeftOnRectangleIcon,
// // // //     UserCircleIcon,
// // // //     QuestionMarkCircleIcon,
// // // //     FaceSmileIcon,
// // // //     ListBulletIcon,
// // // //     UserIcon,
// // // //     ChatBubbleLeftEllipsisIcon,
// // // //     AtSymbolIcon,
// // // //   } from "@heroicons/react/24/outline"
  
// // // //   const SideMenu = () => {
// // // //     return (
// // // //       <div className="h-full w-64 py-3 px-2 bg-gradient-to-r from-[#0E0E2C] to-[#004366] flex flex-col">
// // // //         <div className="space-y-1">
// // // //           {MainNavigation.map((item, i) => {
// // // //             return <SideMenuButton Icon={item.iconName} labelName={item.labelName} key={i} />
// // // //           })}
// // // //         </div>
  
// // // //         <h3 className="font-semibold text-sm px-2 my-2">Train</h3>
// // // //         <div className="space-y-1">
// // // //           {Train.map((item, i) => {
// // // //             return <SideMenuButton Icon={item.iconName} labelName={item.labelName} key={i} />
// // // //           })}
// // // //         </div>
// // // //         <h3 className="font-semibold text-sm px-2 my-2">Eat</h3>
// // // //         <div className="space-y-1">
// // // //           {Eat.map((item, i) => {
// // // //             return <SideMenuButton Icon={item.iconName} labelName={item.labelName} key={i} />
// // // //           })}
// // // //         </div>
// // // //         <h3 className="font-semibold text-sm px-2 my-2">Live</h3>
// // // //         <div className="space-y-1 border-b-2 mb-4 pb-2 border-gray-300">
// // // //           {Live.map((item, i) => {
// // // //             return <SideMenuButton Icon={item.iconName} labelName={item.labelName} key={i} />
// // // //           })}
// // // //         </div>
// // // //         <div className="space-y-1 border-b-2 mb-4 pb-2 border-gray-300">
// // // //           {social.map((item, i) => {
// // // //             return <SideMenuButton Icon={item.iconName} labelName={item.labelName} key={i} />
// // // //           })}
// // // //         </div>
// // // //         <div className="space-y-1">
// // // //           {Tools.map((item, i) => {
// // // //             return <SideMenuButton Icon={item.iconName} labelName={item.labelName} key={i} />
// // // //           })}
// // // //         </div>
// // // //       </div>
// // // //     )
// // // //   }
  
// // // //   export default SideMenu
  
// // // //   const SideMenuButton = ({ labelName, Icon }) => {
// // // //     return (
// // // //       <div className="w-full cursor-pointer px-2 hover:bg-green-100 py-1 gap-6 rounded-md flex">
// // // //         <Icon className="h-5 w-5 text-gray-800" />
// // // //         <p className="text-sm">{labelName}</p>
// // // //       </div>
// // // //     )
// // // //   }
  
// // // //   const MainNavigation = [
// // // //     {
// // // //       id: 1,
// // // //       iconName: CalendarIcon,
// // // //       labelName: "Planner",
// // // //     },
// // // //     {
// // // //       id: 2,
// // // //       iconName: CubeTransparentIcon,
// // // //       labelName: "Programs",
// // // //     },
// // // //     {
// // // //       id: 3,
// // // //       iconName: UserCircleIcon,
// // // //       labelName: "Profile",
// // // //     },
// // // //     {
// // // //       id: 4,
// // // //       iconName: ListBulletIcon,
// // // //       labelName: "Shopping List",
// // // //     },
// // // //   ]
  
// // // //   const Train = [
// // // //     {
// // // //       id: 1,
// // // //       iconName: UserIcon,
// // // //       labelName: "Workout",
// // // //     },
// // // //   ]
  
// // // //   const Eat = [
// // // //     {
// // // //       id: 1,
// // // //       iconName: FaceSmileIcon,
// // // //       labelName: "Meals",
// // // //     },
// // // //     {
// // // //       id: 2,
// // // //       iconName: FaceSmileIcon,
// // // //       labelName: "Snacks",
// // // //     },
// // // //   ]
  
// // // //   const Live = [
// // // //     {
// // // //       id: 1,
// // // //       iconName: ListBulletIcon,
// // // //       labelName: "Meditations and Sleep",
// // // //     },
// // // //   ]
  
// // // //   const social = [
// // // //     {
// // // //       id: 1,
// // // //       iconName: UserIcon,
// // // //       labelName: "Features",
// // // //     },
// // // //     {
// // // //       id: 2,
// // // //       iconName: UserIcon,
// // // //       labelName: "Blog",
// // // //     },
// // // //     {
// // // //       id: 3,
// // // //       iconName: AtSymbolIcon,
// // // //       labelName: "Community",
// // // //     },
// // // //   ]
  
// // // //   const Tools = [
// // // //     {
// // // //       id: 1,
// // // //       iconName: UserIcon,
// // // //       labelName: "Settings",
// // // //     },
// // // //     {
// // // //       id: 2,
// // // //       iconName: QuestionMarkCircleIcon,
// // // //       labelName: "Help",
// // // //     },
// // // //     {
// // // //       id: 3,
// // // //       iconName: ChatBubbleLeftEllipsisIcon,
// // // //       labelName: "About",
// // // //     },
// // // //     {
// // // //       id: 4,
// // // //       iconName: ArrowLeftOnRectangleIcon,
// // // //       labelName: "Logout",
// // // //     },
// // // //   ]
  


// // // import {
// // //     CalendarIcon,
// // //     CubeTransparentIcon,
// // //     ArrowLeftOnRectangleIcon,
// // //     UserCircleIcon,
// // //     QuestionMarkCircleIcon,
// // //     FaceSmileIcon,
// // //     ListBulletIcon,
// // //     UserIcon,
// // //     ChatBubbleLeftEllipsisIcon,
// // //     AtSymbolIcon,
// // //     Cog6ToothIcon,
// // //     BrainIcon,
// // //     BookOpenIcon,
// // //   } from "@heroicons/react/24/outline"
  
// // //   const SideMenu = () => {
// // //     return (
// // //       <div className="h-full w-64 py-3 px-2 bg-gradient-to-r from-[#0E0E2C] to-[#004366] flex flex-col">
// // //         <div className="mb-8 px-2">
// // //           <h1 className="text-white text-2xl font-semibold">Virtue Fit</h1>
// // //         </div>
        
// // //         <div className="space-y-1">
// // //           {MainNavigation.map((item, i) => {
// // //             return <SideMenuButton Icon={item.iconName} labelName={item.labelName} key={i} />
// // //           })}
// // //         </div>
  
// // //         <div className="space-y-1 mt-4">
// // //           {Train.map((item, i) => {
// // //             return <SideMenuButton Icon={item.iconName} labelName={item.labelName} key={i} />
// // //           })}
// // //         </div>
        
// // //         <div className="space-y-1 mt-4">
// // //           {Eat.map((item, i) => {
// // //             return <SideMenuButton Icon={item.iconName} labelName={item.labelName} key={i} />
// // //           })}
// // //         </div>
        
// // //         <div className="space-y-1 mt-4 mb-4">
// // //           {Live.map((item, i) => {
// // //             return <SideMenuButton Icon={item.iconName} labelName={item.labelName} key={i} />
// // //           })}
// // //         </div>
        
// // //         <div className="space-y-1 mb-4">
// // //           {Tools.map((item, i) => {
// // //             return <SideMenuButton Icon={item.iconName} labelName={item.labelName} key={i} />
// // //           })}
// // //         </div>
        
// // //         <div className="mt-auto">
// // //           <SideMenuButton Icon={ArrowLeftOnRectangleIcon} labelName="Collapse" />
// // //         </div>
// // //       </div>
// // //     )
// // //   }
  
// // //   export default SideMenu
  
// // //   const SideMenuButton = ({ labelName, Icon }) => {
// // //     return (
// // //       <div className="w-full cursor-pointer px-2 hover:bg-white/10 py-2 gap-3 rounded-md flex items-center">
// // //         <Icon className="h-5 w-5 text-white" />
// // //         <p className="text-white text-sm font-medium">{labelName}</p>
// // //       </div>
// // //     )
// // //   }
  
// // //   const MainNavigation = [
// // //     {
// // //       id: 1,
// // //       iconName: CalendarIcon,
// // //       labelName: "Planner",
// // //     },
// // //     {
// // //       id: 2,
// // //       iconName: CubeTransparentIcon,
// // //       labelName: "Program",
// // //     },
// // //     {
// // //       id: 3,
// // //       iconName: BrainIcon,
// // //       labelName: "Meditation",
// // //     },
// // //   ]
  
// // //   const Train = []
  
// // //   const Eat = [
// // //     {
// // //       id: 1,
// // //       iconName: FaceSmileIcon,
// // //       labelName: "Meal",
// // //     },
// // //     {
// // //       id: 2,
// // //       iconName: BookOpenIcon,
// // //       labelName: "Snacks",
// // //     },
// // //   ]
  
// // //   const Live = []
  
// // //   const Tools = [
// // //     {
// // //       id: 1,
// // //       iconName: Cog6ToothIcon,
// // //       labelName: "Settings",
// // //     },
// // //     {
// // //       id: 2,
// // //       iconName: QuestionMarkCircleIcon,
// // //       labelName: "Help",
// // //     },
// // //   ]


// // // import {
// // //     CalendarIcon,
// // //     CubeTransparentIcon,
// // //     ArrowLeftOnRectangleIcon,
// // //     UserCircleIcon,
// // //     QuestionMarkCircleIcon,
// // //     FaceSmileIcon,
// // //     ListBulletIcon,
// // //     // UserIcon,
// // //     // ChatBubbleLeftEllipsisIcon,
// // //     // AtSymbolIcon,
// // //     Cog6ToothIcon,
// // //     // BrainIcon,
// // //     BookOpenIcon,
// // //   } from "@heroicons/react/24/outline"
  
// // //   const SideMenu = () => {
// // //     return (
// // //       <div className="h-full w-64 py-3 px-2 bg-gradient-to-r from-[#0E0E2C] to-[#004366] flex flex-col">
// // //         <div className="mb-8 px-2">
// // //           <h1 className="text-white text-2xl font-semibold">Virtue Fit</h1>
// // //         </div>
        
// // //         <div className="space-y-1">
// // //           {MainNavigation.map((item, i) => {
// // //             return <SideMenuButton Icon={item.iconName} labelName={item.labelName} key={i} />
// // //           })}
// // //         </div>
  
// // //         <div className="space-y-1 mt-4">
// // //           {Train.map((item, i) => {
// // //             return <SideMenuButton Icon={item.iconName} labelName={item.labelName} key={i} />
// // //           })}
// // //         </div>
        
// // //         <div className="space-y-1 mt-4">
// // //           {Eat.map((item, i) => {
// // //             return <SideMenuButton Icon={item.iconName} labelName={item.labelName} key={i} />
// // //           })}
// // //         </div>
        
// // //         <div className="space-y-1 mt-4 mb-4">
// // //           {Live.map((item, i) => {
// // //             return <SideMenuButton Icon={item.iconName} labelName={item.labelName} key={i} />
// // //           })}
// // //         </div>
        
// // //         <div className="space-y-1 mb-4">
// // //           {Tools.map((item, i) => {
// // //             return <SideMenuButton Icon={item.iconName} labelName={item.labelName} key={i} />
// // //           })}
// // //         </div>
        
// // //         <div className="mt-auto">
// // //           <SideMenuButton Icon={ArrowLeftOnRectangleIcon} labelName="Collapse" />
// // //         </div>
// // //       </div>
// // //     )
// // //   }
  
// // //   export default SideMenu
  
// // //   const SideMenuButton = ({ labelName, Icon }) => {
// // //     return (
// // //       <div className="w-full cursor-pointer px-2 hover:bg-white/10 py-2 gap-3 rounded-md flex items-center">
// // //         <Icon className="h-5 w-5 text-white" />
// // //         <p className="text-white text-sm font-medium">{labelName}</p>
// // //       </div>
// // //     )
// // //   }
  
// // //   const MainNavigation = [
// // //     {
// // //       id: 1,
// // //       iconName: CalendarIcon,
// // //       labelName: "Planner",
// // //     },
// // //     {
// // //       id: 2,
// // //       iconName: CubeTransparentIcon,
// // //       labelName: "Program",
// // //     },
// // //     {
// // //       id: 3,
// // //       iconName: ListBulletIcon,
// // //       labelName: "Meditation",
// // //     },
// // //   ]
  
// // //   const Train = []
  
// // //   const Eat = [
// // //     {
// // //       id: 1,
// // //       iconName: FaceSmileIcon,
// // //       labelName: "Meal",
// // //     },
// // //     {
// // //       id: 2,
// // //       iconName: BookOpenIcon,
// // //       labelName: "Snacks",
// // //     },
// // //   ]
  
// // //   const Live = []
  
// // //   const Tools = [
// // //     {
// // //       id: 1,
// // //       iconName: Cog6ToothIcon,
// // //       labelName: "Settings",
// // //     },
// // //     {
// // //       id: 2,
// // //       iconName: QuestionMarkCircleIcon,
// // //       labelName: "Help",
// // //     },
// // //   ]




// // import {
// //     CalendarIcon,
// //     CubeTransparentIcon,
// //     ArrowLeftOnRectangleIcon,
// //     UserCircleIcon,
// //     QuestionMarkCircleIcon,
// //     FaceSmileIcon,
// //     ListBulletIcon,
// //     Cog6ToothIcon,
// //     BookOpenIcon,
// //     Bars3Icon,
// //     XMarkIcon,
// //   } from "@heroicons/react/24/outline"
// //   import { useState, useEffect } from "react"
  
// //   const SideMenu = () => {
// //     const [isOpen, setIsOpen] = useState(true);
// //     const [isMobile, setIsMobile] = useState(false);
  
// //     // Handle responsive behavior
// //     useEffect(() => {
// //       const checkScreenSize = () => {
// //         setIsMobile(window.innerWidth < 768);
// //         if (window.innerWidth < 768) {
// //           setIsOpen(false);
// //         } else {
// //           setIsOpen(true);
// //         }
// //       };
  
// //       checkScreenSize();
// //       window.addEventListener('resize', checkScreenSize);
// //       return () => window.removeEventListener('resize', checkScreenSize);
// //     }, []);
  
// //     const toggleMenu = () => {
// //       setIsOpen(!isOpen);
// //     };
  
// //     return (
// //       <>
// //         {/* Mobile menu button */}
// //         {isMobile && (
// //           <button 
// //             onClick={toggleMenu} 
// //             className="fixed top-4 left-4 z-50 p-2 rounded-md bg-[#0E0E2C] text-white"
// //           >
// //             {isOpen ? (
// //               <XMarkIcon className="h-6 w-6" />
// //             ) : (
// //               <Bars3Icon className="h-6 w-6" />
// //             )}
// //           </button>
// //         )}
  
// //         {/* Sidebar */}
// //         <div 
// //           className={`fixed md:relative h-full z-40 transition-all duration-300 ease-in-out ${
// //             isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
// //           } ${isMobile ? "w-64" : "w-16 md:w-64"}`}
// //         >
// //           <div className="h-full w-full py-3 px-2 bg-gradient-to-r from-[#0E0E2C] to-[#004366] flex flex-col">
// //             <div className="mb-8 px-2">
// //               <h1 className={`text-white text-2xl font-semibold ${!isOpen && !isMobile ? "hidden" : ""}`}>Virtue Fit</h1>
// //               {!isOpen && !isMobile && <div className="h-8 flex items-center justify-center">
// //                 <span className="text-white font-bold text-2xl">VF</span>
// //               </div>}
// //             </div>
            
// //             <div className="space-y-1">
// //               {MainNavigation.map((item, i) => {
// //                 return <SideMenuButton Icon={item.iconName} labelName={item.labelName} key={i} showLabel={isOpen || isMobile} />
// //               })}
// //             </div>
            
// //             <div className="space-y-1 mt-4">
// //               {Eat.map((item, i) => {
// //                 return <SideMenuButton Icon={item.iconName} labelName={item.labelName} key={i} showLabel={isOpen || isMobile} />
// //               })}
// //             </div>
            
// //             <div className="space-y-1 mt-4 mb-4">
// //               {Live.map((item, i) => {
// //                 return <SideMenuButton Icon={item.iconName} labelName={item.labelName} key={i} showLabel={isOpen || isMobile} />
// //               })}
// //             </div>
            
// //             <div className="space-y-1 mb-4">
// //               {Tools.map((item, i) => {
// //                 return <SideMenuButton Icon={item.iconName} labelName={item.labelName} key={i} showLabel={isOpen || isMobile} />
// //               })}
// //             </div>
// //           </div>
// //         </div>
        
// //         {/* Overlay for mobile */}
// //         {isMobile && isOpen && (
// //           <div 
// //             className="fixed inset-0 bg-black bg-opacity-50 z-30"
// //             onClick={toggleMenu}
// //           />
// //         )}
        
// //         {/* Content margin for non-mobile */}
// //         {!isMobile && (
// //           <div className={`transition-all duration-300 ease-in-out ${isOpen ? "ml-64" : "ml-16"}`}>
// //             {/* Your main content goes here */}
// //           </div>
// //         )}
// //       </>
// //     )
// //   }
  
// //   export default SideMenu
  
// //   const SideMenuButton = ({ labelName, Icon, showLabel }) => {
// //     return (
// //       <div className="w-full cursor-pointer px-2 hover:bg-white/10 py-2 rounded-md flex items-center">
// //         <Icon className="h-5 w-5 text-white" />
// //         {showLabel && <p className="text-white text-sm font-medium ml-3">{labelName}</p>}
// //       </div>
// //     )
// //   }
  
// //   const MainNavigation = [
// //     {
// //       id: 1,
// //       iconName: CalendarIcon,
// //       labelName: "Planner",
// //     },
// //     {
// //       id: 2,
// //       iconName: UserCircleIcon,
// //       labelName: "Workout",
// //     },
// //     {
// //       id: 3,
// //       iconName: CubeTransparentIcon,
// //       labelName: "Program",
// //     },
// //     {
// //       id: 4,
// //       iconName: ListBulletIcon,
// //       labelName: "Meditation",
// //     },
// //   ]
  
// //   const Eat = [
// //     {
// //       id: 1,
// //       iconName: FaceSmileIcon,
// //       labelName: "Meal",
// //     },
// //     {
// //       id: 2,
// //       iconName: BookOpenIcon,
// //       labelName: "Snacks",
// //     },
// //   ]
  
// //   const Live = []
  
// //   const Tools = [
// //     {
// //       id: 1,
// //       iconName: Cog6ToothIcon,
// //       labelName: "Settings",
// //     },
// //     {
// //       id: 2,
// //       iconName: QuestionMarkCircleIcon,
// //       labelName: "Help",
// //     },
// //   ]




// import {
//     CalendarIcon,
//     CubeTransparentIcon,
//     ArrowLeftOnRectangleIcon,
//     UserCircleIcon,
//     QuestionMarkCircleIcon,
//     FaceSmileIcon,
//     ListBulletIcon,
//     Cog6ToothIcon,
//     BookOpenIcon,
//     Bars3Icon,
//     XMarkIcon,
//   } from "@heroicons/react/24/outline"
//   import { useState, useEffect } from "react"
  
//   const SideMenu = ({ children }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [isMobile, setIsMobile] = useState(false);
  
//     // Handle responsive behavior
//     useEffect(() => {
//       const checkScreenSize = () => {
//         setIsMobile(window.innerWidth < 768);
//         if (window.innerWidth < 768) {
//           setIsOpen(false);
//         } else {
//           setIsOpen(true);
//         }
//       };
  
//       checkScreenSize();
//       window.addEventListener('resize', checkScreenSize);
//       return () => window.removeEventListener('resize', checkScreenSize);
//     }, []);
  
//     const toggleMenu = () => {
//       setIsOpen(!isOpen);
//     };
  
//     return (
//       <div className="flex h-screen">
//         {/* Main content */}
//         <div className="flex-1 relative">
//           {children || (
//             <div className=" py-40">
//               {/* Your main content goes here */}
//             </div>
//           )}
//         </div>
  
//         {/* Mobile menu button */}
//         {isMobile && (
//           <button 
//             onClick={toggleMenu} 
//             className="fixed top-4 right-4 z-50 p-2 rounded-md bg-[#0E0E2C] text-white"
//           >
//             {isOpen ? (
//               <XMarkIcon className="h-6 w-6" />
//             ) : (
//               <Bars3Icon className="h-6 w-6" />
//             )}
//           </button>
//         )}
  
//         {/* Sidebar */}
//         <div 
//           className={`fixed md:static h-full right-0 z-40 transition-all duration-300 ease-in-out ${
//             isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
//           } ${isMobile ? "w-64" : "w-16 md:w-64"}`}
//         >
//           <div className="h-full w-full py-3 px-2 bg-gradient-to-r from-[#0E0E2C] to-[#004366] flex flex-col">
//             <div className="mb-8 px-2">
//               <h1 className={`text-white text-2xl font-semibold ${!isOpen && !isMobile ? "hidden" : ""}`}>Virtue Fit</h1>
//               {!isOpen && !isMobile && <div className="h-8 flex items-center justify-center">
//                 <span className="text-white font-bold text-2xl">VF</span>
//               </div>}
//             </div>
            
//             <div className="space-y-1">
//               {MainNavigation.map((item, i) => {
//                 return <SideMenuButton Icon={item.iconName} labelName={item.labelName} key={i} showLabel={isOpen || isMobile} />
//               })}
//             </div>
            
//             <div className="space-y-1 mt-4">
//               {Eat.map((item, i) => {
//                 return <SideMenuButton Icon={item.iconName} labelName={item.labelName} key={i} showLabel={isOpen || isMobile} />
//               })}
//             </div>
            
//             <div className="space-y-1 mt-4 mb-4">
//               {Live.map((item, i) => {
//                 return <SideMenuButton Icon={item.iconName} labelName={item.labelName} key={i} showLabel={isOpen || isMobile} />
//               })}
//             </div>
            
//             <div className="space-y-1 mb-4">
//               {Tools.map((item, i) => {
//                 return <SideMenuButton Icon={item.iconName} labelName={item.labelName} key={i} showLabel={isOpen || isMobile} />
//               })}
//             </div>
            
//             {!isMobile && (
//               <div className="mt-auto">
//                 <div onClick={toggleMenu} className="cursor-pointer">
//                   <SideMenuButton 
//                     Icon={ArrowLeftOnRectangleIcon} 
//                     labelName="Collapse" 
//                     showLabel={isOpen || isMobile} 
//                   />
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
        
//         {/* Overlay for mobile */}
//         {isMobile && isOpen && (
//           <div 
//             className="fixed inset-0 bg-black bg-opacity-50 z-30"
//             onClick={toggleMenu}
//           />
//         )}
//       </div>
//     )
//   }
  
//   export default SideMenu
  
//   const SideMenuButton = ({ labelName, Icon, showLabel }) => {
//     return (
//       <div className="w-full cursor-pointer px-2 hover:bg-white/10 py-2 rounded-md flex items-center">
//         <Icon className="h-5 w-5 text-white" />
//         {showLabel && <p className="text-white text-sm font-medium ml-3">{labelName}</p>}
//       </div>
//     )
//   }
  
//   const MainNavigation = [
//     {
//       id: 1,
//       iconName: CalendarIcon,
//       labelName: "Planner",
//     },
//     {
//       id: 2,
//       iconName: UserCircleIcon,
//       labelName: "Workout",
//     },
//     {
//       id: 3,
//       iconName: CubeTransparentIcon,
//       labelName: "Program",
//     },
//     {
//       id: 4,
//       iconName: ListBulletIcon,
//       labelName: "Meditation",
//     },
//   ]
  
//   const Eat = [
//     {
//       id: 1,
//       iconName: FaceSmileIcon,
//       labelName: "Meal",
//     },
//     {
//       id: 2,
//       iconName: BookOpenIcon,
//       labelName: "Snacks",
//     },
//   ]
  
//   const Live = []
  
//   const Tools = [
//     {
//       id: 1,
//       iconName: Cog6ToothIcon,
//       labelName: "Settings",
//     },
//     {
//       id: 2,
//       iconName: QuestionMarkCircleIcon,
//       labelName: "Help",
//     },
//   ]



import {
  CalendarIcon,
  CubeTransparentIcon,
  ArrowLeftOnRectangleIcon,
  UserCircleIcon,
  QuestionMarkCircleIcon,
  FaceSmileIcon,
  ListBulletIcon,
  Cog6ToothIcon,
  BookOpenIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const SideMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Main content */}
      <div className="flex-1 relative overflow-auto">
        {children || (
          <div className="py-40">
            {/* Your main content goes here */}
          </div>
        )}
      </div>

      {/* Mobile menu button */}
      {isMobile && (
        <button 
          onClick={toggleMenu} 
          className="fixed top-4 right-4 z-50 p-2 rounded-md bg-[#0E0E2C] text-white"
        >
          {isOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed md:static h-full right-0 z-40 transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
        } ${isMobile ? "w-64" : "w-16 md:w-64"}`}
      >
        <div className="h-full w-full py-3 px-2 bg-gradient-to-r from-[#0E0E2C] to-[#004366] flex flex-col">
          <div className="mb-8 px-2">
            <h1 className={`text-white text-2xl font-semibold ${!isOpen && !isMobile ? "hidden" : ""}`}>Virtue Fit</h1>
            {!isOpen && !isMobile && <div className="h-8 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">VF</span>
            </div>}
          </div>
          
          <div className="space-y-1">
            {MainNavigation.map((item) => (
              <SideMenuButton 
                key={item.id}
                Icon={item.iconName} 
                labelName={item.labelName} 
                to={item.path}
                isActive={currentPath === item.path}
                showLabel={isOpen || isMobile} 
              />
            ))}
          </div>
          
          <div className="space-y-1 mt-4">
            {Eat.map((item) => (
              <SideMenuButton 
                key={item.id}
                Icon={item.iconName} 
                labelName={item.labelName} 
                to={item.path}
                isActive={currentPath === item.path}
                showLabel={isOpen || isMobile} 
              />
            ))}
          </div>
          
          <div className="space-y-1 mt-4 mb-4">
            {Live.map((item) => (
              <SideMenuButton 
                key={item.id}
                Icon={item.iconName} 
                labelName={item.labelName} 
                to={item.path}
                isActive={currentPath === item.path}
                showLabel={isOpen || isMobile} 
              />
            ))}
          </div>
          
          <div className="space-y-1 mb-4">
            {Tools.map((item) => (
              <SideMenuButton 
                key={item.id}
                Icon={item.iconName} 
                labelName={item.labelName} 
                to={item.path}
                isActive={currentPath === item.path}
                showLabel={isOpen || isMobile} 
              />
            ))}
          </div>
          
          {!isMobile && (
            <div className="mt-auto">
              <div onClick={toggleMenu} className="cursor-pointer">
                <div className="w-full px-2 hover:bg-white/10 py-2 rounded-md flex items-center">
                  <ArrowLeftOnRectangleIcon className={`h-5 w-5 text-white ${!isOpen ? 'transform rotate-180' : ''}`} />
                  {(isOpen || isMobile) && <p className="text-white text-sm font-medium ml-3">
                    {isOpen ? "Collapse" : "Expand"}
                  </p>}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleMenu}
        />
      )}
    </div>
  );
};

export default SideMenu;

const SideMenuButton = ({ labelName, Icon, showLabel, isActive, to }) => {
  return (
    <Link to={to} className="block">
      <div className={`w-full cursor-pointer px-2 py-2 rounded-md flex items-center ${
        isActive 
          ? "bg-[#00A8FF] bg-opacity-20 border-l-4 border-[#00A8FF]" 
          : "hover:bg-white/10"
      }`}>
        <Icon className={`h-5 w-5 ${isActive ? "text-[#00A8FF]" : "text-white"}`} />
        {showLabel && (
          <p className={`text-sm font-medium ml-3 ${isActive ? "text-[#00A8FF]" : "text-white"}`}>
            {labelName}
          </p>
        )}
      </div>
    </Link>
  );
};

const MainNavigation = [
  {
    id: 1,
    iconName: CalendarIcon,
    labelName: "Planner",
    path: "/planner"
  },
  {
    id: 2,
    iconName: UserCircleIcon,
    labelName: "Workout",
    path: "/workout"
  },
  {
    id: 3,
    iconName: CubeTransparentIcon,
    labelName: "Program",
    path: "/program"
  },
  {
    id: 4,
    iconName: ListBulletIcon,
    labelName: "Meditation",
    path: "/meditation"
  },
];

const Eat = [
  {
    id: 1,
    iconName: FaceSmileIcon,
    labelName: "Meal",
    path: "/meal"
  },
  {
    id: 2,
    iconName: BookOpenIcon,
    labelName: "Snacks",
    path: "/snacks"
  },
];

const Live = [];

const Tools = [
  {
    id: 1,
    iconName: Cog6ToothIcon,
    labelName: "Settings",
    path: "/settings"
  },
  {
    id: 2,
    iconName: QuestionMarkCircleIcon,
    labelName: "Help",
    path: "/help"
  },
];
