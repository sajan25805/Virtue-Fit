


// import React, { useState, useEffect, useRef } from "react";
// import { Dialog } from "@headlessui/react";
// import { Bars3Icon, XMarkIcon, BellIcon } from "@heroicons/react/24/outline";
// import logo from "../assets/logo.png";

// const navigation = [
//   { name: "About us", href: "/" },
//   { name: "Blog", href: "/blog" },
//   { name: "Start free trial", href: "/sign-up" },
// ];

// export const Navbar = ({ className }) => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const bellRef = useRef();

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const res = await fetch("http://localhost:8000/api/notifications", {
//           credentials: 'include'
//         });
//         const data = await res.json();
//         if (data.success) {
//           setNotifications(data.notifications);
//         }
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   // Count unread notifications
//   const unreadCount = notifications.filter(n => !n.isRead).length;

//   const toggleNotifications = () => {
//     setShowNotifications(!showNotifications);
//   };

//   const markAsRead = async (id) => {
//     try {
//       await fetch(`http://localhost:8000/api/notifications/${id}/read`, {
//         method: "PATCH",
//         credentials: "include",
//       });
//       setNotifications((prev) =>
//         prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
//       );
//     } catch (error) {
//       console.error("Error marking notification as read:", error);
//     }
//   };

//   return (
//     <header className={`z-50 fixed top-0 w-full bg-[#0E0E2C] opacity-95 ${className}`}>
//       <nav className="flex items-center justify-between px-6 lg:px-8 py-4" aria-label="Global">
//         <div className="flex lg:flex-1">
//           <a href="/" className="-m-1.5 p-1.5">
//             <img src={logo} className="rounded-full" width={60} height={40} alt="logo" />
//           </a>
//         </div>
//         <div className="flex items-center gap-4">
//           <div className="relative">
//             <button 
//               onClick={toggleNotifications}
//               ref={bellRef}
//               className="text-white hover:text-[#00A8FF] relative"
//             >
//               <BellIcon className="h-6 w-6" />
//               {unreadCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1">
//                   {unreadCount}
//                 </span>
//               )}
//             </button>

//             {showNotifications && (
//               <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
//                 {notifications.length === 0 ? (
//                   <div className="p-4 text-gray-700">No notifications</div>
//                 ) : (
//                   <ul className="divide-y divide-gray-200">
//                     {notifications.map((notification) => (
//                       <li
//                         key={notification._id}
//                         className={`px-4 py-3 hover:bg-gray-100 cursor-pointer ${notification.isRead ? '' : 'bg-gray-100'}`}
//                         onClick={() => markAsRead(notification._id)}
//                       >
//                         <div className="text-sm font-semibold">{notification.title}</div>
//                         <div className="text-xs text-gray-500">{notification.message}</div>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             )}
//           </div>

//           <div className="hidden lg:flex lg:gap-x-12">
//             {navigation.map((item) => (
//               <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-white hover:text-[#00A8FF]">
//                 {item.name}
//               </a>
//             ))}
//           </div>
//           <div className="hidden lg:flex lg:flex-1 lg:justify-end">
//             <a href="/login" className="text-sm font-semibold leading-6 text-white hover:text-[#00A8FF]">
//               Login <span aria-hidden="true">&rarr;</span>
//             </a>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-50" />
//         <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#F7F7FD] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-neutral-200">
//           <div className="flex items-center justify-between">
//             <a href="/" className="-m-1.5 p-1.5">
//               <img src={logo} width={120} height={40} alt="logo" />
//             </a>
//             <button
//               type="button"
//               className="-m-2.5 rounded-md p-2.5 text-gray-700"
//               onClick={() => setMobileMenuOpen(false)}
//             >
//               <XMarkIcon className="h-6 w-6" aria-hidden="true" />
//             </button>
//           </div>
//           <div className="mt-6 flow-root">
//             <div className="-my-6 divide-y divide-[#ECECEE]">
//               <div className="space-y-2 py-6">
//                 {navigation.map((item) => (
//                   <a
//                     key={item.name}
//                     href={item.href}
//                     className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[#0E0E2C] hover:bg-[#00A8FF] hover:text-white"
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     {item.name}
//                   </a>
//                 ))}
//               </div>
//               <div className="py-6">
//                 <a
//                   href="/login"
//                   className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-[#0E0E2C] hover:bg-[#00A8FF] hover:text-white"
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   Log in
//                 </a>
//               </div>
//             </div>
//           </div>
//         </Dialog.Panel>
//       </Dialog>
//     </header>
//   );
// };



import React, { useState, useEffect, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, BellIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";
import { useAuthStore } from "../store/authStore"; // << Import your auth store

const navigation = [
  { name: "About us", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "Start free trial", href: "/sign-up" },
];

export const Navbar = ({ className }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const bellRef = useRef();

  const { isAuthenticated } = useAuthStore(); // << Get login state

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/notifications", {
          credentials: 'include'
        });
        const data = await res.json();
        if (data.success) {
          setNotifications(data.notifications);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const markAsRead = async (id) => {
    try {
      await fetch(`http://localhost:8000/api/notifications/${id}/read`, {
        method: "PATCH",
        credentials: "include",
      });
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <header className={`z-50 fixed top-0 w-full bg-[#0E0E2C] opacity-95 ${className}`}>
      <nav className="flex items-center justify-between px-6 lg:px-8 py-4" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <img src={logo} className="rounded-full" width={60} height={40} alt="logo" />
          </a>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              onClick={toggleNotifications}
              ref={bellRef}
              className="text-white hover:text-[#00A8FF] relative"
            >
              <BellIcon className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
                {notifications.length === 0 ? (
                  <div className="p-4 text-gray-700">No notifications</div>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {notifications.map((notification) => (
                      <li
                        key={notification._id}
                        className={`px-4 py-3 hover:bg-gray-100 cursor-pointer ${notification.isRead ? '' : 'bg-gray-100'}`}
                        onClick={() => markAsRead(notification._id)}
                      >
                        <div className="text-sm font-semibold">{notification.title}</div>
                        <div className="text-xs text-gray-500">{notification.message}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Only show navigation links if NOT logged in */}
          {!isAuthenticated && (
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-white hover:text-[#00A8FF]">
                  {item.name}
                </a>
              ))}
            </div>
          )}

          {/* Only show login button if NOT logged in */}
          {!isAuthenticated && (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <a href="/login" className="text-sm font-semibold leading-6 text-white hover:text-[#00A8FF]">
                Login <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#F7F7FD] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-neutral-200">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <img src={logo} width={120} height={40} alt="logo" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-[#ECECEE]">
              <div className="space-y-2 py-6">
                {!isAuthenticated && navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[#0E0E2C] hover:bg-[#00A8FF] hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              {!isAuthenticated && (
                <div className="py-6">
                  <a
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-[#0E0E2C] hover:bg-[#00A8FF] hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </a>
                </div>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};
