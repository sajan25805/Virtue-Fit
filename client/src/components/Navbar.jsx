import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";
import { useAuthStore } from "../store/authStore";
import NotificationBadge from "../components/NotificationBadge";

const navigation = [
  { name: "About us", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "Start free trial", href: "/sign-up" },
];

export const Navbar = ({ className }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <header className={`z-50 fixed top-0 w-full bg-[#0E0E2C] opacity-95 ${className}`}>
      <nav className="flex items-center justify-between px-6 lg:px-8 py-4" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <img src={logo} className="rounded-full" width={60} height={40} alt="logo" />
          </a>
        </div>

        <div className="flex items-center gap-4">
          {/* Notification (logged in only) */}
          {isAuthenticated && <NotificationBadge />}

          {/* Navigation links (only when logged out) */}
          {!isAuthenticated && (
            <>
              <div className="hidden lg:flex lg:gap-x-12">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-sm font-semibold text-white hover:text-[#00A8FF]"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <a
                  href="/login"
                  className="text-sm font-semibold text-white hover:text-[#00A8FF]"
                >
                  Login <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {!isAuthenticated && (
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
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-[#0E0E2C] hover:bg-[#00A8FF] hover:text-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-[#0E0E2C] hover:bg-[#00A8FF] hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      )}
    </header>
  );
};
