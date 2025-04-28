import { useEffect, useState } from "react";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/notifications", {
        credentials: "include"
      });
      const data = await res.json();
      if (data.success) {
        setNotifications(data.notifications);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAllAsRead = async () => {
    try {
      await Promise.all(
        notifications
          .filter((n) => !n.isRead)
          .map((n) =>
            fetch(`http://localhost:8000/api/notifications/${n._id}/read`, {
              method: "PATCH",
              credentials: "include",
            })
          )
      );
      fetchNotifications();
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const clearAllNotifications = async () => {
    try {
      await fetch(`http://localhost:8000/api/notifications/clear-all`, {
        method: "DELETE",
        credentials: "include",
      });
      setNotifications([]);
    } catch (error) {
      console.error("Error clearing notifications:", error);
    }
  };

  return (
    <div className="bg-[#F7F7FD] min-h-screen py-10 px-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#0E0E2C]">Notifications</h1>
          <div className="flex gap-2">
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-1 bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white px-4 py-2 rounded hover:opacity-90"
            >
              <CheckCircleIcon className="h-5 w-5" />
              Mark all as read
            </button>
            <button
              onClick={clearAllNotifications}
              className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded hover:opacity-90"
            >
              <TrashIcon className="h-5 w-5" />
              Clear all
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="text-center text-gray-500">No notifications yet.</div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className={`p-4 rounded-lg shadow-md ${notification.isRead ? "bg-white" : "bg-[#00A8FF]/10"}`}
              >
                <h2 className="text-lg font-semibold">{notification.title}</h2>
                <p className="text-sm text-gray-700">{notification.message}</p>
                {notification.link && (
                  <Link
                    to={notification.link}
                    className="text-[#00A8FF] text-sm hover:underline mt-2 block"
                  >
                    View Details →
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
