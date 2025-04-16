



import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { LayoutDashboard, Users, UserCheck, Settings, LogOut, Menu, X, Bell, Search } from "lucide-react"

export function AdminLayout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
      active: location.pathname === "/admin",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: Users,
      active: location.pathname === "/admin/users",
    },
    {
      name: "Trainers",
      path: "/admin/trainers",
      icon: UserCheck,
      active: location.pathname === "/admin/trainers",
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: Settings,
      active: location.pathname === "/admin/settings",
    },
  ]

  const handleNavigation = (path) => {
    navigate(path)
    setMobileMenuOpen(false)
  }

  return (
    <div className="flex min-h-screen bg-[#F7F7FD]">
      {/* Sidebar - Desktop */}
      <aside className="hidden w-64 bg-[#0E0E2C] text-white md:block">
        <div className="p-6">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2 px-4">
            {menuItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`flex w-full items-center rounded-md px-4 py-3 text-left transition-colors ${
                    item.active ? "bg-[#00A8FF] text-white" : "text-gray-300 hover:bg-[#1A1A3A]"
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </button>
              </li>
            ))}
          </ul>

          <div className="absolute bottom-0 left-0 w-64 border-t border-[#1A1A3A] p-4">
            <button
              onClick={() => navigate("/logout")}
              className="flex w-full items-center rounded-md px-4 py-3 text-left text-gray-300 transition-colors hover:bg-[#1A1A3A]"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Top Navigation Bar */}
        <header className="bg-white shadow-sm">
          <div className="flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            <div className="flex items-center">
              <div className="relative mr-4 hidden md:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 rounded-md border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-[#00A8FF] focus:outline-none focus:ring-1 focus:ring-[#00A8FF]"
                />
              </div>

              <button className="relative mr-4 rounded-full p-1 text-gray-500 hover:bg-gray-100">
                <Bell className="h-6 w-6" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
              </button>

              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-[#00A8FF] text-white flex items-center justify-center font-medium">
                  A
                </div>
                <span className="ml-2 hidden text-sm font-medium md:block">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
            <div className="h-full w-64 bg-[#0E0E2C] text-white">
              <div className="flex items-center justify-between p-6">
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <button onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-white">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="mt-6">
                <ul className="space-y-2 px-4">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <button
                        onClick={() => handleNavigation(item.path)}
                        className={`flex w-full items-center rounded-md px-4 py-3 text-left transition-colors ${
                          item.active ? "bg-[#00A8FF] text-white" : "text-gray-300 hover:bg-[#1A1A3A]"
                        }`}
                      >
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="absolute bottom-0 left-0 w-64 border-t border-[#1A1A3A] p-4">
                  <button
                    onClick={() => navigate("/logout")}
                    className="flex w-full items-center rounded-md px-4 py-3 text-left text-gray-300 transition-colors hover:bg-[#1A1A3A]"
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                  </button>
                </div>
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}