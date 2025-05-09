import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import {
  ArrowRightIcon,
  LogOutIcon,
  TrashIcon,
  UploadIcon,
  LockIcon,
} from "lucide-react";

const SettingsPage = () => {
  const { user, logout } = useAuthStore();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [profilePreview, setProfilePreview] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const form = new FormData();
      form.append("firstName", formData.firstName);
      form.append("lastName", formData.lastName);
      form.append("email", formData.email);
      if (profileFile) form.append("profilePicture", profileFile);

      const res = await fetch("http://localhost:8000/api/auth/update-profile", {
        method: "PATCH",
        credentials: "include",
        body: form,
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Profile updated");
        window.location.reload();
      } else toast.error(data.message);
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutConfirmed = async () => {
    await logout();
    toast.success("Logged out successfully");
    localStorage.removeItem("userId");
    setShowLogoutModal(false);
  };

  const handleDeleteConfirmed = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/auth/delete-account", {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Account deleted successfully");
        logout();
        localStorage.removeItem("userId");
        setShowDeleteModal(false);
      } else toast.error(data.message || "Failed to delete account");
    } catch (err) {
      toast.error("Error deleting account");
    }
  };

  const handlePasswordChange = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/auth/change-password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(passwordData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Password changed");
        setShowPasswordModal(false);
        setPasswordData({ currentPassword: "", newPassword: "" });
      } else toast.error(data.message);
    } catch (err) {
      toast.error("Failed to change password");
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-white text-white">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>

        {/* Profile Section */}
        <div className="bg-[#004366] p-4 rounded-xl mb-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Account Info</h2>
          <div className="flex items-center gap-4 mb-4">
            <img
              src={profilePreview || user?.profilePicture || "/default-avatar.png"}
              alt="profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <label className="cursor-pointer flex items-center gap-2 text-sm">
              <UploadIcon className="w-4 h-4" /> Change Photo
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setProfileFile(e.target.files[0]);
                  setProfilePreview(URL.createObjectURL(e.target.files[0]));
                }}
                className="hidden"
              />
            </label>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              className="bg-gray-900 px-4 py-2 rounded text-white"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              className="bg-gray-900 px-4 py-2 rounded text-white"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="bg-gray-900 px-4 py-2 rounded text-white"
            />
          </div>
          <button
            onClick={handleSave}
            disabled={loading}
            className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

          <button
            onClick={() => setShowPasswordModal(true)}
            className="mt-3 text-sm text-blue-400 hover:underline flex items-center gap-1"
          >
            <LockIcon className="w-4 h-4" /> Change Password
          </button>
        </div>

        {/* Notifications */}
        <div className="bg-[#004366] p-4 rounded-xl mb-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>
          <p className="text-sm text-gray-400 mb-2">
            You currently receive workout completion and account alerts.
          </p>
          <a
            href="/notifications"
            className="text-blue-400 hover:underline text-sm inline-flex items-center"
          >
            Manage notifications <ArrowRightIcon className="w-4 h-4 ml-1" />
          </a>
        </div>

        {/* Danger Zone */}
        <div className="bg-[#004366] p-4 rounded-xl border border-red-500 shadow-md">
          <h2 className="text-lg font-semibold mb-2 text-red-500">Danger Zone</h2>
          <p className="text-sm text-gray-400 mb-3">
            Delete your account permanently.
          </p>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded flex items-center gap-2"
          >
            <TrashIcon className="w-4 h-4" /> Delete Account
          </button>
        </div>

        {/* Logout */}
        <div className="text-center mt-10">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded flex items-center gap-2 hover:underline justify-center"
          >
            <LogOutIcon className="w-4 h-4" /> Logout
          </button>
        </div>

        {/* Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#004366] p-6 rounded-lg w-full max-w-md shadow-xl">
              <h3 className="text-xl font-bold mb-4 text-white">Change Password</h3>
              <input
                type="password"
                placeholder="Current Password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, currentPassword: e.target.value })
                }
                className="w-full mb-3 bg-gray-900 px-4 py-2 rounded text-white"
              />
              <input
                type="password"
                placeholder="New Password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, newPassword: e.target.value })
                }
                className="w-full mb-4 bg-gray-900 px-4 py-2 rounded text-white"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="text-sm text-gray-400 hover:underline"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePasswordChange}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Logout Modal */}
        {showLogoutModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#004366] p-6 rounded-lg w-full max-w-sm shadow-lg text-white">
              <h3 className="text-lg font-bold mb-4">Confirm Logout</h3>
              <p className="text-sm mb-6">Are you sure you want to log out?</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="text-sm text-gray-300 hover:underline"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogoutConfirmed}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white text-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#004366] p-6 rounded-lg w-full max-w-sm shadow-lg text-white">
              <h3 className="text-lg font-bold mb-4">Confirm Account Deletion</h3>
              <p className="text-sm mb-6">
                This will permanently delete your account. Are you sure?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="text-sm text-gray-300 hover:underline"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirmed}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white text-sm"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
