


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
    path: "/snack"
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
