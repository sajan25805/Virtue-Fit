"use client"

import { useEffect, useState } from "react"
import { Search, Plus, Edit, Trash, X, Check, AlertTriangle, ChevronDown } from "lucide-react"
import { Card } from "../../..//components/ui/card"
import { Button } from "../../..//components/ui/button"
import { Input } from "../../..//components/ui/input"
import { useAdminStore } from "../../..//store/admin-store"
import { AdminLayout } from "../../../components/admin/adminLayout"

export default function AdminUsers() {
  const { users, fetchUsers, addUser, updateUser, deleteUser, isLoading, error } = useAdminStore()

  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("All")
  const [filterStatus, setFilterStatus] = useState("All")
  const [isAddingUser, setIsAddingUser] = useState(false)
  const [isEditingUser, setIsEditingUser] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active",
  })

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddUser = async (e) => {
    e.preventDefault()
    try {
      await addUser(formData)
      setIsAddingUser(false)
      setFormData({
        name: "",
        email: "",
        role: "User",
        status: "Active",
      })
    } catch (error) {
      console.error("Failed to add user:", error)
    }
  }

  const handleEditUser = async (e) => {
    e.preventDefault()
    try {
      await updateUser(isEditingUser, formData)
      setIsEditingUser(null)
      setFormData({
        name: "",
        email: "",
        role: "User",
        status: "Active",
      })
    } catch (error) {
      console.error("Failed to update user:", error)
    }
  }

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId)
      setShowDeleteConfirm(null)
    } catch (error) {
      console.error("Failed to delete user:", error)
    }
  }

  const startEditUser = (user) => {
    setIsEditingUser(user.id)
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    })
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "All" || user.role === filterRole
    const matchesStatus = filterStatus === "All" || user.status === filterStatus

    return matchesSearch && matchesRole && matchesStatus
  })

  if (isLoading && users.length === 0) {
    return (
      <AdminLayout>
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#ECECEE] border-t-[#00A8FF] mx-auto"></div>
            <p className="text-[#0E0E2C]">Loading users...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">User Management</h1>
          <Button onClick={() => setIsAddingUser(true)} className="bg-[#00A8FF] hover:bg-[#0096E6]">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        {error && (
          <div className="rounded-lg bg-red-100 p-4 text-red-700">
            <div className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5" />
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <Card className="p-4">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-1 space-x-4">
              <div className="relative flex-1">
                <label className="mb-1 block text-sm font-medium">Role</label>
                <div className="relative">
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="w-full rounded-md border border-[#ECECEE] bg-white px-3 py-2 text-sm text-[#0E0E2C] focus:outline-none focus:ring-2 focus:ring-[#00A8FF]"
                  >
                    <option value="All">All Roles</option>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="relative flex-1">
                <label className="mb-1 block text-sm font-medium">Status</label>
                <div className="relative">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full rounded-md border border-[#ECECEE] bg-white px-3 py-2 text-sm text-[#0E0E2C] focus:outline-none focus:ring-2 focus:ring-[#00A8FF]"
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Add/Edit User Form */}
        {(isAddingUser || isEditingUser) && (
          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{isEditingUser ? "Edit User" : "Add New User"}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setIsAddingUser(false)
                  setIsEditingUser(null)
                  setFormData({
                    name: "",
                    email: "",
                    role: "User",
                    status: "Active",
                  })
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <form onSubmit={isEditingUser ? handleEditUser : handleAddUser} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium">
                  Full Name
                </label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="role" className="mb-1 block text-sm font-medium">
                    Role
                  </label>
                  <div className="relative">
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-[#ECECEE] bg-white px-3 py-2 text-sm text-[#0E0E2C] focus:outline-none focus:ring-2 focus:ring-[#00A8FF]"
                    >
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label htmlFor="status" className="mb-1 block text-sm font-medium">
                    Status
                  </label>
                  <div className="relative">
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-[#ECECEE] bg-white px-3 py-2 text-sm text-[#0E0E2C] focus:outline-none focus:ring-2 focus:ring-[#00A8FF]"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Pending">Pending</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="bg-[#00A8FF] hover:bg-[#0096E6]">
                  {isEditingUser ? "Update User" : "Add User"}
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Users Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Join Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            user.role === "Admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            user.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : user.status === "Inactive"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{user.joinDate}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        {showDeleteConfirm === user.id ? (
                          <div className="flex items-center justify-end space-x-2">
                            <span className="text-sm text-gray-500">Confirm?</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => setShowDeleteConfirm(null)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => startEditUser(user)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setShowDeleteConfirm(user.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminLayout>
  )
}

