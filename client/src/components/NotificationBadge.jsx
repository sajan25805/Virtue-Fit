import { useState, useEffect, useRef } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function NotificationBadge() {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/notifications", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) setNotifications(data.notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
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

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const limitedNotifications = notifications.slice(0, 5); // only show 5

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="text-white hover:text-[#00A8FF] relative"
      >
        <BellIcon className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1">
            {unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
          {notifications.length === 0 ? (
            <div className="p-4 text-gray-700 text-sm">No notifications</div>
          ) : (
            <>
              <ul className="max-h-72 overflow-y-auto divide-y divide-gray-200">
                {limitedNotifications.map((notification) => (
                  <li
                    key={notification._id}
                    onClick={() => markAsRead(notification._id)}
                    className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                      notification.isRead ? "" : "bg-gray-100"
                    }`}
                  >
                    <div className="text-sm font-semibold text-gray-800">{notification.title}</div>
                    <div className="text-xs text-gray-500">{notification.message}</div>
                  </li>
                ))}
              </ul>
              {notifications.length > 5 && (
                <div className="text-center border-t bg-gray-50 px-4 py-2">
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      navigate("/notifications"); // or your route
                    }}
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    See All Notifications →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
