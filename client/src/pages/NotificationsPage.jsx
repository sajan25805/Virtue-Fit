import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Bell,
  CheckCircle,
  Flame,
  Info,
  X,
  XCircle,
  Trash2,
} from "lucide-react";

const iconMap = {
  "new-workout": <Flame className="text-[#00A8FF] w-5 h-5" />,
  completed: <CheckCircle className="text-green-500 w-5 h-5" />,
  reminder: <Bell className="text-yellow-500 w-5 h-5" />,
  info: <Info className="text-blue-500 w-5 h-5" />,
};

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("all");
  const [showClearModal, setShowClearModal] = useState(false);
  const [clearing, setClearing] = useState(false);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/notifications", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) setNotifications(data.notifications);
    } catch {
      toast.error("❌ Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/notifications/${id}/read`,
        { method: "PATCH", credentials: "include" }
      );
      const data = await res.json();
      if (data.success) {
        setNotifications((prev) =>
          prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
        );
        toast.success("✅ Notification marked as read");
      }
    } catch {
      toast.error("Error marking as read");
    }
  };

  const handleClearAll = async () => {
    setClearing(true);
    try {
      const res = await fetch(
        "http://localhost:8000/api/notifications/clear-all",
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success("🗑️ All notifications cleared");
        setNotifications([]);
        setShowClearModal(false);
      } else {
        toast.error(data.message || "Failed to clear notifications");
      }
    } catch (err) {
      toast.error("Error clearing notifications");
    } finally {
      setClearing(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const filtered =
    tab === "unread" ? notifications.filter((n) => !n.isRead) : notifications;

  return (
    <div className="min-h-screen bg-[#F7F7FD] px-4 py-8 text-[#0E0E2C]">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Notifications</h1>
          {notifications.length > 0 && (
            <button
              onClick={() => setShowClearModal(true)}
              className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          {["all", "unread"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-full font-semibold ${
                tab === t
                  ? "bg-[#0E0E2C] text-white"
                  : "bg-white text-[#0E0E2C] border border-[#ECECEE]"
              }`}
            >
              {t === "all" ? "All Notifications" : "Unread"}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <Bell className="w-10 h-10 mx-auto mb-3" />
            <p>No notifications {tab === "unread" ? "left" : "yet"}.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((n) => (
              <div
                key={n._id}
                className={`flex items-start gap-4 p-4 bg-white rounded-lg border shadow-sm transition ${
                  n.isRead ? "opacity-70" : "border-[#00A8FF]"
                }`}
              >
                <div>{iconMap[n.type] || iconMap.info}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{n.title}</h3>
                      <p className="text-sm text-gray-600">{n.message}</p>
                      {n.link && (
                        <a
                          href={n.link}
                          className="text-sm text-blue-500 hover:underline"
                        >
                          View Details →
                        </a>
                      )}
                    </div>
                    {!n.isRead && (
                      <button
                        onClick={() => markAsRead(n._id)}
                        className="text-xs text-[#00A8FF] hover:underline"
                      >
                        Mark Read
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ Clear Modal */}
      {showClearModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg max-w-sm w-full p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-3 text-[#0E0E2C]">
              Are you sure?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              This will permanently delete all notifications. You can't undo
              this.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowClearModal(false)}
                className="text-gray-500 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleClearAll}
                disabled={clearing}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
              >
                {clearing ? "Clearing..." : "Yes, Clear All"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
