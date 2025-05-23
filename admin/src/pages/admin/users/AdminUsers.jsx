// // // "use client"

// // // import { useEffect, useState } from "react"
// // // import { Search, Plus, Edit, Trash, X, Check, AlertTriangle, ChevronDown } from "lucide-react"
// // // import { Card } from "../../..//components/ui/card"
// // // import { Button } from "../../..//components/ui/button"
// // // import { Input } from "../../..//components/ui/input"
// // // import { useAdminStore } from "../../..//store/admin-store"

// // // export default function AdminUsers() {
// // //   const { users, fetchUsers, addUser, updateUser, deleteUser, isLoading, error } = useAdminStore()

// // //   const [searchTerm, setSearchTerm] = useState("")
// // //   const [filterRole, setFilterRole] = useState("All")
// // //   const [filterStatus, setFilterStatus] = useState("All")
// // //   const [isAddingUser, setIsAddingUser] = useState(false)
// // //   const [isEditingUser, setIsEditingUser] = useState(null)
// // //   const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)
// // //   const [formData, setFormData] = useState({
// // //     name: "",
// // //     email: "",
// // //     role: "User",
// // //     status: "Active",
// // //   })

// // //   useEffect(() => {
// // //     fetchUsers()
// // //   }, [fetchUsers])

// // //   const handleInputChange = (e) => {
// // //     const { name, value } = e.target
// // //     setFormData((prev) => ({ ...prev, [name]: value }))
// // //   }

// // //   const handleAddUser = async (e) => {
// // //     e.preventDefault()
// // //     try {
// // //       await addUser(formData)
// // //       setIsAddingUser(false)
// // //       setFormData({
// // //         name: "",
// // //         email: "",
// // //         role: "User",
// // //         status: "Active",
// // //       })
// // //     } catch (error) {
// // //       console.error("Failed to add user:", error)
// // //     }
// // //   }

// // //   const handleEditUser = async (e) => {
// // //     e.preventDefault()
// // //     try {
// // //       await updateUser(isEditingUser, formData)
// // //       setIsEditingUser(null)
// // //       setFormData({
// // //         name: "",
// // //         email: "",
// // //         role: "User",
// // //         status: "Active",
// // //       })
// // //     } catch (error) {
// // //       console.error("Failed to update user:", error)
// // //     }
// // //   }

// // //   const handleDeleteUser = async (userId) => {
// // //     try {
// // //       await deleteUser(userId)
// // //       setShowDeleteConfirm(null)
// // //     } catch (error) {
// // //       console.error("Failed to delete user:", error)
// // //     }
// // //   }

// // //   const startEditUser = (user) => {
// // //     setIsEditingUser(user.id)
// // //     setFormData({
// // //       name: user.name,
// // //       email: user.email,
// // //       role: user.role,
// // //       status: user.status,
// // //     })
// // //   }

// // //   const filteredUsers = users.filter((user) => {
// // //     const matchesSearch =
// // //       user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //       user.email.toLowerCase().includes(searchTerm.toLowerCase())
// // //     const matchesRole = filterRole === "All" || user.role === filterRole
// // //     const matchesStatus = filterStatus === "All" || user.status === filterStatus

// // //     return matchesSearch && matchesRole && matchesStatus
// // //   })

// // //   if (isLoading && users.length === 0) {
// // //     return (
 
// // //         <div className="flex h-full items-center justify-center">
// // //           <div className="text-center">
// // //             <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#ECECEE] border-t-[#00A8FF] mx-auto"></div>
// // //             <p className="text-[#0E0E2C]">Loading users...</p>
// // //           </div>
// // //         </div>

// // //     )
// // //   }

// // //   return (
// // //       <div className="space-y-6">
// // //         <div className="flex items-center justify-between">
// // //           <h1 className="text-2xl font-bold">User Management</h1>
// // //           <Button onClick={() => setIsAddingUser(true)} className="bg-[#00A8FF] hover:bg-[#0096E6]">
// // //             <Plus className="mr-2 h-4 w-4" />
// // //             Add User
// // //           </Button>
// // //         </div>

// // //         {error && (
// // //           <div className="rounded-lg bg-red-100 p-4 text-red-700">
// // //             <div className="flex items-center">
// // //               <AlertTriangle className="mr-2 h-5 w-5" />
// // //               <p>{error}</p>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Search and Filters */}
// // //         <Card className="p-4">
// // //           <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
// // //             <div className="relative flex-1">
// // //               <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
// // //               <Input
// // //                 placeholder="Search users..."
// // //                 value={searchTerm}
// // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // //                 className="pl-10"
// // //               />
// // //             </div>

// // //             <div className="flex flex-1 space-x-4">
// // //               <div className="relative flex-1">
// // //                 <label className="mb-1 block text-sm font-medium">Role</label>
// // //                 <div className="relative">
// // //                   <select
// // //                     value={filterRole}
// // //                     onChange={(e) => setFilterRole(e.target.value)}
// // //                     className="w-full rounded-md border border-[#ECECEE] bg-white px-3 py-2 text-sm text-[#0E0E2C] focus:outline-none focus:ring-2 focus:ring-[#00A8FF]"
// // //                   >
// // //                     <option value="All">All Roles</option>
// // //                     <option value="User">User</option>
// // //                     <option value="Admin">Admin</option>
// // //                   </select>
// // //                   <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
// // //                 </div>
// // //               </div>

// // //               <div className="relative flex-1">
// // //                 <label className="mb-1 block text-sm font-medium">Status</label>
// // //                 <div className="relative">
// // //                   <select
// // //                     value={filterStatus}
// // //                     onChange={(e) => setFilterStatus(e.target.value)}
// // //                     className="w-full rounded-md border border-[#ECECEE] bg-white px-3 py-2 text-sm text-[#0E0E2C] focus:outline-none focus:ring-2 focus:ring-[#00A8FF]"
// // //                   >
// // //                     <option value="All">All Status</option>
// // //                     <option value="Active">Active</option>
// // //                     <option value="Inactive">Inactive</option>
// // //                     <option value="Pending">Pending</option>
// // //                   </select>
// // //                   <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </Card>

// // //         {/* Add/Edit User Form */}
// // //         {(isAddingUser || isEditingUser) && (
// // //           <Card className="p-6">
// // //             <div className="mb-4 flex items-center justify-between">
// // //               <h2 className="text-lg font-semibold">{isEditingUser ? "Edit User" : "Add New User"}</h2>
// // //               <Button
// // //                 variant="ghost"
// // //                 size="icon"
// // //                 onClick={() => {
// // //                   setIsAddingUser(false)
// // //                   setIsEditingUser(null)
// // //                   setFormData({
// // //                     name: "",
// // //                     email: "",
// // //                     role: "User",
// // //                     status: "Active",
// // //                   })
// // //                 }}
// // //               >
// // //                 <X className="h-4 w-4" />
// // //               </Button>
// // //             </div>
// // //             <form onSubmit={isEditingUser ? handleEditUser : handleAddUser} className="space-y-4">
// // //               <div>
// // //                 <label htmlFor="name" className="mb-1 block text-sm font-medium">
// // //                   Full Name
// // //                 </label>
// // //                 <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
// // //               </div>
// // //               <div>
// // //                 <label htmlFor="email" className="mb-1 block text-sm font-medium">
// // //                   Email Address
// // //                 </label>
// // //                 <Input
// // //                   id="email"
// // //                   name="email"
// // //                   type="email"
// // //                   value={formData.email}
// // //                   onChange={handleInputChange}
// // //                   required
// // //                 />
// // //               </div>
// // //               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
// // //                 <div>
// // //                   <label htmlFor="role" className="mb-1 block text-sm font-medium">
// // //                     Role
// // //                   </label>
// // //                   <div className="relative">
// // //                     <select
// // //                       id="role"
// // //                       name="role"
// // //                       value={formData.role}
// // //                       onChange={handleInputChange}
// // //                       className="w-full rounded-md border border-[#ECECEE] bg-white px-3 py-2 text-sm text-[#0E0E2C] focus:outline-none focus:ring-2 focus:ring-[#00A8FF]"
// // //                     >
// // //                       <option value="User">User</option>
// // //                       <option value="Admin">Admin</option>
// // //                     </select>
// // //                     <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
// // //                   </div>
// // //                 </div>
// // //                 <div>
// // //                   <label htmlFor="status" className="mb-1 block text-sm font-medium">
// // //                     Status
// // //                   </label>
// // //                   <div className="relative">
// // //                     <select
// // //                       id="status"
// // //                       name="status"
// // //                       value={formData.status}
// // //                       onChange={handleInputChange}
// // //                       className="w-full rounded-md border border-[#ECECEE] bg-white px-3 py-2 text-sm text-[#0E0E2C] focus:outline-none focus:ring-2 focus:ring-[#00A8FF]"
// // //                     >
// // //                       <option value="Active">Active</option>
// // //                       <option value="Inactive">Inactive</option>
// // //                       <option value="Pending">Pending</option>
// // //                     </select>
// // //                     <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //               <div className="flex justify-end">
// // //                 <Button type="submit" className="bg-[#00A8FF] hover:bg-[#0096E6]">
// // //                   {isEditingUser ? "Update User" : "Add User"}
// // //                 </Button>
// // //               </div>
// // //             </form>
// // //           </Card>
// // //         )}

// // //         {/* Users Table */}
// // //         <Card className="overflow-hidden">
// // //           <div className="overflow-x-auto">
// // //             <table className="w-full">
// // //               <thead className="bg-gray-50">
// // //                 <tr>
// // //                   <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
// // //                     Name
// // //                   </th>
// // //                   <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
// // //                     Email
// // //                   </th>
// // //                   <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
// // //                     Role
// // //                   </th>
// // //                   <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
// // //                     Status
// // //                   </th>
// // //                   <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
// // //                     Join Date
// // //                   </th>
// // //                   <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
// // //                     Actions
// // //                   </th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody className="divide-y divide-gray-200 bg-white">
// // //                 {filteredUsers.length > 0 ? (
// // //                   filteredUsers.map((user) => (
// // //                     <tr key={user.id}>
// // //                       <td className="whitespace-nowrap px-6 py-4">
// // //                         <div className="flex items-center">
// // //                           <div className="h-10 w-10 flex-shrink-0">
// // //                             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
// // //                               {user.name.charAt(0).toUpperCase()}
// // //                             </div>
// // //                           </div>
// // //                           <div className="ml-4">
// // //                             <div className="text-sm font-medium text-gray-900">{user.name}</div>
// // //                           </div>
// // //                         </div>
// // //                       </td>
// // //                       <td className="whitespace-nowrap px-6 py-4">
// // //                         <div className="text-sm text-gray-500">{user.email}</div>
// // //                       </td>
// // //                       <td className="whitespace-nowrap px-6 py-4">
// // //                         <span
// // //                           className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
// // //                             user.role === "Admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
// // //                           }`}
// // //                         >
// // //                           {user.role}
// // //                         </span>
// // //                       </td>
// // //                       <td className="whitespace-nowrap px-6 py-4">
// // //                         <span
// // //                           className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
// // //                             user.status === "Active"
// // //                               ? "bg-green-100 text-green-800"
// // //                               : user.status === "Inactive"
// // //                                 ? "bg-red-100 text-red-800"
// // //                                 : "bg-yellow-100 text-yellow-800"
// // //                           }`}
// // //                         >
// // //                           {user.status}
// // //                         </span>
// // //                       </td>
// // //                       <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{user.joinDate}</td>
// // //                       <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
// // //                         {showDeleteConfirm === user.id ? (
// // //                           <div className="flex items-center justify-end space-x-2">
// // //                             <span className="text-sm text-gray-500">Confirm?</span>
// // //                             <Button
// // //                               size="sm"
// // //                               variant="ghost"
// // //                               onClick={() => handleDeleteUser(user.id)}
// // //                               className="text-red-600 hover:text-red-800"
// // //                             >
// // //                               <Check className="h-4 w-4" />
// // //                             </Button>
// // //                             <Button size="sm" variant="ghost" onClick={() => setShowDeleteConfirm(null)}>
// // //                               <X className="h-4 w-4" />
// // //                             </Button>
// // //                           </div>
// // //                         ) : (
// // //                           <div className="flex items-center justify-end space-x-2">
// // //                             <Button
// // //                               size="sm"
// // //                               variant="ghost"
// // //                               onClick={() => startEditUser(user)}
// // //                               className="text-blue-600 hover:text-blue-800"
// // //                             >
// // //                               <Edit className="h-4 w-4" />
// // //                             </Button>
// // //                             <Button
// // //                               size="sm"
// // //                               variant="ghost"
// // //                               onClick={() => setShowDeleteConfirm(user.id)}
// // //                               className="text-red-600 hover:text-red-800"
// // //                             >
// // //                               <Trash className="h-4 w-4" />
// // //                             </Button>
// // //                           </div>
// // //                         )}
// // //                       </td>
// // //                     </tr>
// // //                   ))
// // //                 ) : (
// // //                   <tr>
// // //                     <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
// // //                       No users found
// // //                     </td>
// // //                   </tr>
// // //                 )}
// // //               </tbody>
// // //             </table>
// // //           </div>
// // //         </Card>
// // //       </div>
// // //   )
// // // }



// // "use client"

// // import { useEffect, useState } from "react"
// // import { Search, Plus, Edit, Trash, X, Check, AlertTriangle, ChevronDown } from "lucide-react"
// // import { Card } from "../../..//components/ui/card"
// // import { Button } from "../../..//components/ui/button"
// // import { Input } from "../../..//components/ui/input"
// // import { useAdminStore } from "../../..//store/admin-store"

// // export default function AdminUsers() {
// //   const { users, fetchUsers, addUser, updateUser, deleteUser, isLoading, error } = useAdminStore()

// //   const [searchTerm, setSearchTerm] = useState("")
// //   const [filterRole, setFilterRole] = useState("All")
// //   const [filterStatus, setFilterStatus] = useState("All")
// //   const [isAddingUser, setIsAddingUser] = useState(false)
// //   const [isEditingUser, setIsEditingUser] = useState(null)
// //   const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)
// //   const [formData, setFormData] = useState({
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //     role: "user",
// //     status: "Active",
// //   })

// //   useEffect(() => {
// //     fetchUsers()
// //   }, [fetchUsers])

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target
// //     setFormData((prev) => ({ ...prev, [name]: value }))
// //   }

// //   const handleAddUser = async (e) => {
// //     e.preventDefault()
// //     try {
// //       await addUser(formData)
// //       setIsAddingUser(false)
// //       setFormData({
// //         firstName: "",
// //         lastName: "",
// //         email: "",
// //         role: "user",
// //         status: "Active",
// //       })
// //     } catch (error) {
// //       console.error("Failed to add user:", error)
// //     }
// //   }

// //   const handleEditUser = async (e) => {
// //     e.preventDefault()
// //     try {
// //       await updateUser(isEditingUser, formData)
// //       setIsEditingUser(null)
// //       setFormData({
// //         firstName: "",
// //         lastName: "",
// //         email: "",
// //         role: "user",
// //         status: "Active",
// //       })
// //     } catch (error) {
// //       console.error("Failed to update user:", error)
// //     }
// //   }

// //   const handleDeleteUser = async (userId) => {
// //     try {
// //       await deleteUser(userId)
// //       setShowDeleteConfirm(null)
// //     } catch (error) {
// //       console.error("Failed to delete user:", error)
// //     }
// //   }

// //   const startEditUser = (user) => {
// //     setIsEditingUser(user._id)
// //     setFormData({
// //       firstName: user.firstName || "",
// //       lastName: user.lastName || "",
// //       email: user.email || "",
// //       role: user.role || "user",
// //       status: user.isActive ? "Active" : "Inactive",
// //     })
// //   }

// //   const filteredUsers = users.filter((user) => {
// //     const name = `${user.firstName || ""} ${user.lastName || ""}`.trim()
// //     const email = user.email || ""
// //     const role = user.role || ""
// //     const status = user.isActive ? "Active" : "Inactive"

// //     const matchesSearch =
// //       name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       email.toLowerCase().includes(searchTerm.toLowerCase())
// //     const matchesRole = filterRole === "All" || role === filterRole
// //     const matchesStatus = filterStatus === "All" || status === filterStatus

// //     return matchesSearch && matchesRole && matchesStatus
// //   })

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex items-center justify-between">
// //         <h1 className="text-2xl font-bold">User Management</h1>
// //         <Button onClick={() => setIsAddingUser(true)} className="bg-[#00A8FF] hover:bg-[#0096E6]">
// //           <Plus className="mr-2 h-4 w-4" />
// //           Add User
// //         </Button>
// //       </div>

// //       {error && (
// //         <div className="rounded-lg bg-red-100 p-4 text-red-700">
// //           <div className="flex items-center">
// //             <AlertTriangle className="mr-2 h-5 w-5" />
// //             <p>{error}</p>
// //           </div>
// //         </div>
// //       )}

// //       {/* Search and Filters */}
// //       <Card className="p-4">
// //         <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
// //           <div className="relative flex-1">
// //             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
// //             <Input
// //               placeholder="Search users..."
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //               className="pl-10"
// //             />
// //           </div>

// //           <div className="flex flex-1 space-x-4">
// //             <div className="relative flex-1">
// //               <label className="mb-1 block text-sm font-medium">Role</label>
// //               <div className="relative">
// //                 <select
// //                   value={filterRole}
// //                   onChange={(e) => setFilterRole(e.target.value)}
// //                   className="w-full rounded-md border border-[#ECECEE] bg-white px-3 py-2 text-sm text-[#0E0E2C] focus:outline-none focus:ring-2 focus:ring-[#00A8FF]"
// //                 >
// //                   <option value="All">All Roles</option>
// //                   <option value="user">User</option>
// //                   <option value="admin">Admin</option>
// //                 </select>
// //                 <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
// //               </div>
// //             </div>

// //             <div className="relative flex-1">
// //               <label className="mb-1 block text-sm font-medium">Status</label>
// //               <div className="relative">
// //                 <select
// //                   value={filterStatus}
// //                   onChange={(e) => setFilterStatus(e.target.value)}
// //                   className="w-full rounded-md border border-[#ECECEE] bg-white px-3 py-2 text-sm text-[#0E0E2C] focus:outline-none focus:ring-2 focus:ring-[#00A8FF]"
// //                 >
// //                   <option value="All">All Status</option>
// //                   <option value="Active">Active</option>
// //                   <option value="Inactive">Inactive</option>
// //                 </select>
// //                 <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </Card>

// //       {/* Users Table */}
// //       <Card className="overflow-hidden">
// //         <table className="w-full">
// //           <thead className="bg-gray-50">
// //             <tr>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Name</th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Email</th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Subscription</th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
// //               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody className="divide-y divide-gray-200 bg-white">
// //             {filteredUsers.map((user) => (
// //               <tr key={user._id}>
// //                 <td className="px-6 py-4 whitespace-nowrap">
// //                   <div className="flex items-center">
// //                     <div className="h-10 w-10 flex-shrink-0">
// //                       <img
// //                         className="h-10 w-10 rounded-full object-cover"
// //                         src={user.profilePicture || "/placeholder.svg"}
// //                         alt=""
// //                       />
// //                     </div>
// //                     <div className="ml-4">
// //                       <div className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</div>
// //                     </div>
// //                   </div>
// //                 </td>
// //                 <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
// //                 <td className="px-6 py-4 whitespace-nowrap">{user.subscription || "Free"}</td>
// //                 <td className="px-6 py-4 whitespace-nowrap">
// //                   <span
// //                     className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
// //                       user.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
// //                     }`}
// //                   >
// //                     {user.isActive ? "Active" : "Inactive"}
// //                   </span>
// //                 </td>
// //                 <td className="px-6 py-4 text-right space-x-2">
// //                   <Button size="sm" variant="ghost" onClick={() => startEditUser(user)}><Edit className="h-4 w-4" /></Button>
// //                   <Button size="sm" variant="ghost" onClick={() => handleDeleteUser(user._id)}><Trash className="h-4 w-4 text-red-600" /></Button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </Card>
// //     </div>
// //   )
// // }

// "use client"

// import { useEffect, useState } from "react"
// import { Search, Plus, Edit, Trash, X, Check, AlertTriangle, ChevronDown } from "lucide-react"
// import { Card } from "../../..//components/ui/card"
// import { Button } from "../../..//components/ui/button"
// import { Input } from "../../..//components/ui/input"
// import { useAdminStore } from "../../..//store/admin-store"
// import { toast } from "react-hot-toast"

// export default function AdminUsers() {
//   const { users, fetchUsers, addUser, updateUser, deleteUser, isLoading, error } = useAdminStore()

//   const [searchTerm, setSearchTerm] = useState("")
//   const [filterRole, setFilterRole] = useState("All")
//   const [filterStatus, setFilterStatus] = useState("All")
//   const [isAddingUser, setIsAddingUser] = useState(false)
//   const [isEditingUser, setIsEditingUser] = useState(null)
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     role: "user",
//     status: "Active",
//   })

//   useEffect(() => {
//     fetchUsers()
//   }, [fetchUsers])

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleAddUser = async (e) => {
//     e.preventDefault()
//     try {
//       await addUser(formData)
//       setIsAddingUser(false)
//       toast.success("User added successfully")
//       setFormData({ firstName: "", lastName: "", email: "", role: "user", status: "Active" })
//     } catch (error) {
//       console.error("Failed to add user:", error)
//       toast.error("Failed to add user")
//     }
//   }

//   const handleEditUser = async (e) => {
//     e.preventDefault()
//     try {
//       await updateUser(isEditingUser, formData)
//       setIsEditingUser(null)
//       toast.success("User updated successfully")
//       setFormData({ firstName: "", lastName: "", email: "", role: "user", status: "Active" })
//     } catch (error) {
//       console.error("Failed to update user:", error)
//       toast.error("Failed to update user")
//     }
//   }

//   const handleDeleteUser = async (userId) => {
//     try {
//       await deleteUser(userId)
//       setShowDeleteConfirm(null)
//       toast.success("User deleted successfully")
//     } catch (error) {
//       console.error("Failed to delete user:", error)
//       toast.error("Failed to delete user")
//     }
//   }

//   const startEditUser = (user) => {
//     setIsEditingUser(user._id)
//     setFormData({
//       firstName: user.firstName || "",
//       lastName: user.lastName || "",
//       email: user.email || "",
//       role: user.role || "user",
//       status: user.isActive ? "Active" : "Inactive",
//     })
//     setIsAddingUser(true)
//   }

//   const filteredUsers = users.filter((user) => {
//     const name = `${user.firstName || ""} ${user.lastName || ""}`.trim()
//     const email = user.email || ""
//     const role = user.role || ""
//     const status = user.isActive ? "Active" : "Inactive"

//     const matchesSearch =
//       name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       email.toLowerCase().includes(searchTerm.toLowerCase())
//     const matchesRole = filterRole === "All" || role === filterRole
//     const matchesStatus = filterStatus === "All" || status === filterStatus

//     return matchesSearch && matchesRole && matchesStatus
//   })

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">User Management</h1>
//         <Button onClick={() => setIsAddingUser(true)} className="bg-[#00A8FF] hover:bg-[#0096E6]">
//           <Plus className="mr-2 h-4 w-4" />
//           Add User
//         </Button>
//       </div>

//       {error && (
//         <div className="rounded-lg bg-red-100 p-4 text-red-700">
//           <div className="flex items-center">
//             <AlertTriangle className="mr-2 h-5 w-5" />
//             <p>{error}</p>
//           </div>
//         </div>
//       )}

//       <Card className="p-4">
//         <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//             <Input
//               placeholder="Search users..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>

//           <div className="flex flex-1 space-x-4">
//             <div className="relative flex-1">
//               <label className="mb-1 block text-sm font-medium">Role</label>
//               <div className="relative">
//                 <select
//                   value={filterRole}
//                   onChange={(e) => setFilterRole(e.target.value)}
//                   className="w-full rounded-md border border-[#ECECEE] bg-white px-3 py-2 text-sm text-[#0E0E2C] focus:outline-none focus:ring-2 focus:ring-[#00A8FF]"
//                 >
//                   <option value="All">All Roles</option>
//                   <option value="user">User</option>
//                   <option value="admin">Admin</option>
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
//               </div>
//             </div>

//             <div className="relative flex-1">
//               <label className="mb-1 block text-sm font-medium">Status</label>
//               <div className="relative">
//                 <select
//                   value={filterStatus}
//                   onChange={(e) => setFilterStatus(e.target.value)}
//                   className="w-full rounded-md border border-[#ECECEE] bg-white px-3 py-2 text-sm text-[#0E0E2C] focus:outline-none focus:ring-2 focus:ring-[#00A8FF]"
//                 >
//                   <option value="All">All Status</option>
//                   <option value="Active">Active</option>
//                   <option value="Inactive">Inactive</option>
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </Card>

//       <Card className="overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Email</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Subscription</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
//               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200 bg-white">
//             {filteredUsers.map((user) => (
//               <tr key={user._id}>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex items-center">
//                     <div className="h-10 w-10 flex-shrink-0">
//                       <img
//                         className="h-10 w-10 rounded-full object-cover"
//                         src={user.profilePicture || "/placeholder.svg"}
//                         alt=""
//                       />
//                     </div>
//                     <div className="ml-4">
//                       <div className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{user.subscription || "Free"}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span
//                     className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
//                       user.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//                     }`}
//                   >
//                     {user.isActive ? "Active" : "Inactive"}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 text-right space-x-2">
//                   {showDeleteConfirm === user._id ? (
//                     <>
//                       <Button size="sm" variant="ghost" onClick={() => handleDeleteUser(user._id)}>
//                         <Check className="h-4 w-4 text-green-600" />
//                       </Button>
//                       <Button size="sm" variant="ghost" onClick={() => setShowDeleteConfirm(null)}>
//                         <X className="h-4 w-4 text-gray-500" />
//                       </Button>
//                     </>
//                   ) : (
//                     <>
//                       <Button size="sm" variant="ghost" onClick={() => startEditUser(user)}>
//                         <Edit className="h-4 w-4 text-blue-600" />
//                       </Button>
//                       <Button size="sm" variant="ghost" onClick={() => setShowDeleteConfirm(user._id)}>
//                         <Trash className="h-4 w-4 text-red-600" />
//                       </Button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </Card>

//       {/* Add/Edit Form */}
//       {(isAddingUser || isEditingUser) && (
//         <Card className="p-6">
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="text-lg font-semibold">{isEditingUser ? "Edit User" : "Add New User"}</h2>
//             <Button variant="ghost" size="icon" onClick={() => {
//               setIsAddingUser(false);
//               setIsEditingUser(null);
//               setFormData({ firstName: "", lastName: "", email: "", role: "user", status: "Active" });
//             }}>
//               <X className="h-4 w-4" />
//             </Button>
//           </div>
//           <form onSubmit={isEditingUser ? handleEditUser : handleAddUser} className="space-y-4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <Input name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" required />
//               <Input name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" required />
//             </div>
//             <Input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required />
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleInputChange}
//                 className="w-full border px-3 py-2 rounded-md"
//               >
//                 <option value="user">User</option>
//                 <option value="admin">Admin</option>
//               </select>
//               <select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleInputChange}
//                 className="w-full border px-3 py-2 rounded-md"
//               >
//                 <option value="Active">Active</option>
//                 <option value="Inactive">Inactive</option>
//               </select>
//             </div>
//             <div className="flex justify-end">
//               <Button type="submit" className="bg-[#00A8FF] hover:bg-[#0096E6]">
//                 {isEditingUser ? "Update User" : "Add User"}
//               </Button>
//             </div>
//           </form>
//         </Card>
//       )}
//     </div>
//   )
// }



"use client"

import { useEffect, useState } from "react"
import {
  Search,
  Plus,
  Edit,
  Trash,
  AlertTriangle,
  ChevronDown,
  Loader2,
  Mail,
  Calendar,
  MoreHorizontal,
  RefreshCw,
  Eye,
  UserX,
  CheckCircle,
  User,
} from "lucide-react"
import { Card } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea"
import { useAdminStore } from "../../../store/admin-store"
import { motion, AnimatePresence } from "framer-motion"
import toast from "react-hot-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog"
import { Avatar, AvatarImage, AvatarFallback } from "../../../components/ui/avatar"
import { Badge } from "../../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"

export default function AdminUsers() {
  const { users, fetchUsers, addUser, updateUser, deleteUser, isLoading, error } = useAdminStore()

  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("All")
  const [filterStatus, setFilterStatus] = useState("All")
  const [filterSubscription, setFilterSubscription] = useState("All")
  const [isAddingUser, setIsAddingUser] = useState(false)
  const [isEditingUser, setIsEditingUser] = useState(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(null)
  const [showViewUser, setShowViewUser] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "user",
    isActive: true,
    subscription: "Free",
  })
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.firstName.trim()) errors.firstName = "First name is required"
    if (!formData.lastName.trim()) errors.lastName = "Last name is required"
    if (!formData.email.trim()) errors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid"
    if (!formData.role) errors.role = "Role is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleAddUser = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      setIsSubmitting(true)
      await addUser({
        ...formData,
        isActive: formData.isActive !== false,
      })
      toast.success("User added successfully")
      setIsAddingUser(false)
      resetForm()
    } catch (error) {
      toast.error(error.message || "Failed to add user")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditUser = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      setIsSubmitting(true)
      await updateUser(isEditingUser, {
        ...formData,
        isActive: formData.isActive !== false,
      })
      toast.success("User updated successfully")
      setIsEditingUser(null)
      resetForm()
    } catch (error) {
      toast.error(error.message || "Failed to update user")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteUser = async (userId) => {
    try {
      setIsSubmitting(true)
      await deleteUser(userId)
      toast.success("User deleted successfully")
      setShowDeleteDialog(null)
    } catch (error) {
      toast.error(error.message || "Failed to delete user")
    } finally {
      setIsSubmitting(false)
    }
  }

  const startEditUser = (user) => {
    setIsEditingUser(user._id)
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      role: user.role || "user",
      subscription: user.subscription || "Free",
      isActive: user.isActive !== false,
    })
  }

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      role: "user",
      subscription: "Free",
      isActive: true,
    })
    setFormErrors({})
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      await fetchUsers()
      toast.success("Users refreshed")
    } catch (error) {
      toast.error("Failed to refresh users")
    } finally {
      setRefreshing(false)
    }
  }

  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase()
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Never"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  // Filter users based on search term, role and status
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim().toLowerCase()
    const email = user.email?.toLowerCase() || ""
    
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase())

    const matchesRole = filterRole === "All" || user.role === filterRole
    const matchesStatus =
      filterStatus === "All" ||
      (filterStatus === "Active" && user.isActive) ||
      (filterStatus === "Inactive" && !user.isActive)
    
    const matchesSubscription = 
      filterSubscription === "All" || 
      (user.subscription || "Free") === filterSubscription

    return matchesSearch && matchesRole && matchesStatus && matchesSubscription
  })

  const subscriptions = ["All", "Free", "Basic", "Premium", "Pro"]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your fitness app users</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing} className="text-gray-600">
            {refreshing ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-1" />}
            Refresh
          </Button>

          <Button
            onClick={() => {
              setIsAddingUser(true)
              resetForm()
            }}
            className="bg-[#00A8FF] hover:bg-[#0096E6]"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg bg-red-100 p-4 text-red-700"
        >
          <div className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5" />
            <p>{error}</p>
          </div>
          <Button variant="link" size="sm" onClick={handleRefresh} className="text-red-700 p-0 h-auto mt-2">
            Try again
          </Button>
        </motion.div>
      )}

      {/* Search and Filters */}
      <Card className="p-4">
        <Tabs defaultValue="filters" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="filters">Filters</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="filters">
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

              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium">Role</label>
                <div className="relative">
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="w-full rounded-md border border-[#ECECEE] bg-white px-3 py-2 text-sm text-[#0E0E2C] focus:outline-none focus:ring-2 focus:ring-[#00A8FF]"
                  >
                    <option value="All">All Roles</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex-1">
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
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium">Subscription</label>
                <div className="relative">
                  <select
                    value={filterSubscription}
                    onChange={(e) => setFilterSubscription(e.target.value)}
                    className="w-full rounded-md border border-[#ECECEE] bg-white px-3 py-2 text-sm text-[#0E0E2C] focus:outline-none focus:ring-2 focus:ring-[#00A8FF]"
                  >
                    {subscriptions.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub === "All" ? "All Subscriptions" : sub}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-700">Total Users</h3>
                <p className="text-2xl font-bold text-blue-900">{users.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-green-700">Active Users</h3>
                <p className="text-2xl font-bold text-green-900">{users.filter((u) => u.isActive).length}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-yellow-700">Premium Users</h3>
                <p className="text-2xl font-bold text-yellow-900">
                  {users.filter((u) => (u.subscription || "Free") !== "Free").length}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-purple-700">New This Month</h3>
                <p className="text-2xl font-bold text-purple-900">
                  {
                    users.filter((u) => {
                      const date = new Date(u.createdAt)
                      const now = new Date()
                      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
                    }).length
                  }
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Users Grid */}
      {isLoading && users.length === 0 ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin text-[#00A8FF] mx-auto mb-4" />
            <p className="text-[#0E0E2C]">Loading users...</p>
          </div>
        </div>
      ) : filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredUsers.map((user) => (
              <motion.div
                key={user._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="bg-gradient-to-r from-[#0E0E2C] to-[#1f1f3a] p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-white/20">
                          <AvatarImage src={user.profilePicture || "/placeholder.svg"} alt={`${user.firstName} ${user.lastName}`} />
                          <AvatarFallback className="bg-[#00A8FF] text-white">
                            {getInitials(user.firstName, user.lastName)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold flex items-center gap-2">
                            {user.firstName} {user.lastName}
                            {user.isVerified && <CheckCircle className="h-4 w-4 text-green-400" />}
                          </h3>
                          <p className="text-xs text-gray-300 flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => setShowViewUser(user)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => startEditUser(user)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => setShowDeleteDialog(user)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    <div className="mb-3 flex items-center gap-2">
                      <Badge variant={user.isActive ? "success" : "secondary"}>
                        {user.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <Badge variant={user.role === "admin" ? "destructive" : "outline"}>
                        {user.role === "admin" ? "Admin" : "User"}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {user.subscription || "Free"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                      <div>
                        <p className="text-gray-500">Age</p>
                        <p>{user.age || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Goal</p>
                        <p className="capitalize">{(user.fitnessGoal || "").replace("_", " ") || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Height</p>
                        <p>{user.height ? `${user.height} cm` : "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Weight</p>
                        <p>{user.weight ? `${user.weight} kg` : "N/A"}</p>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Joined {formatDate(user.createdAt)}
                        </div>

                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Last login: {formatDate(user.lastLogin)}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserX className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No users found</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            {searchTerm || filterRole !== "All" || filterStatus !== "All" || filterSubscription !== "All"
              ? "No users match your current filters. Try adjusting your search criteria."
              : "There are no users in the system yet."}
          </p>
          {searchTerm || filterRole !== "All" || filterStatus !== "All" || filterSubscription !== "All" ? (
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setFilterRole("All")
                setFilterStatus("All")
                setFilterSubscription("All")
              }}
            >
              Clear Filters
            </Button>
          ) : (
            <Button
              onClick={() => {
                setIsAddingUser(true)
                resetForm()
              }}
              className="bg-[#00A8FF] hover:bg-[#0096E6]"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          )}
        </div>
      )}

      {/* Add/Edit User Form Dialog */}
      <Dialog
        open={isAddingUser || isEditingUser}
        onOpenChange={(open) => {
          if (!open) {
            setIsAddingUser(false)
            setIsEditingUser(null)
            resetForm()
          }
        }}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isEditingUser ? "Edit User" : "Add New User"}</DialogTitle>
            <DialogDescription>
              {isEditingUser
                ? "Update the user's information below."
                : "Fill in the details to add a new user to the system."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={isEditingUser ? handleEditUser : handleAddUser} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="mb-1 block text-sm font-medium">
                  First Name*
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={formErrors.firstName ? "border-red-500" : ""}
                />
                {formErrors.firstName && <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>}
              </div>

              <div>
                <label htmlFor="lastName" className="mb-1 block text-sm font-medium">
                  Last Name*
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={formErrors.lastName ? "border-red-500" : ""}
                />
                {formErrors.lastName && <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium">
                Email Address*
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={formErrors.email ? "border-red-500" : ""}
              />
              {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="role" className="mb-1 block text-sm font-medium">
                  Role*
                </label>
                <div className="relative">
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className={`w-full rounded-md border ${
                      formErrors.role ? "border-red-500" : "border-[#ECECEE]"
                    } bg-white px-3 py-2 text-sm text-[#0E0E2C] focus:outline-none focus:ring-2 focus:ring-[#00A8FF]`}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                {formErrors.role && <p className="text-red-500 text-xs mt-1">{formErrors.role}</p>}
              </div>

              <div>
                <label htmlFor="subscription" className="mb-1 block text-sm font-medium">
                  Subscription
                </label>
                <div className="relative">
                  <select
                    id="subscription"
                    name="subscription"
                    value={formData.subscription}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-[#ECECEE] bg-white px-3 py-2 text-sm text-[#0E0E2C] focus:outline-none focus:ring-2 focus:ring-[#00A8FF]"
                  >
                    {subscriptions
                      .filter((s) => s !== "All")
                      .map((sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-gray-300 text-[#00A8FF] focus:ring-[#00A8FF]"
              />
              <label htmlFor="isActive" className="text-sm font-medium">
                Active User
              </label>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAddingUser(false)
                  setIsEditingUser(null)
                  resetForm()
                }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-[#00A8FF] hover:bg-[#0096E6]" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEditingUser ? "Updating..." : "Adding..."}
                  </>
                ) : isEditingUser ? (
                  "Update User"
                ) : (
                  "Add User"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View User Details Dialog */}
      <Dialog
        open={!!showViewUser}
        onOpenChange={(open) => {
          if (!open) setShowViewUser(null)
        }}
      >
        {showViewUser && (
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-gray-200">
                  <AvatarImage src={showViewUser.profilePicture || "/placeholder.svg"} alt={`${showViewUser.firstName} ${showViewUser.lastName}`} />
                  <AvatarFallback className="bg-[#00A8FF] text-white text-xl">
                    {getInitials(showViewUser.firstName, showViewUser.lastName)}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    {showViewUser.firstName} {showViewUser.lastName}
                    {showViewUser.isVerified && <CheckCircle className="h-5 w-5 text-green-500" />}
                  </h2>
                  <p className="text-gray-500">{showViewUser.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm font-medium text-gray-500">Role</p>
                  <p className="font-medium capitalize">{showViewUser.role || "user"}</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <p className="font-medium flex items-center">
                    {showViewUser.isActive ? (
                      <>
                        <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                        Active
                      </>
                    ) : (
                      <>
                        <span className="h-2 w-2 bg-gray-400 rounded-full mr-2"></span>
                        Inactive
                      </>
                    )}
                  </p>
                </div>

                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm font-medium text-gray-500">Subscription</p>
                  <p className="font-medium">{showViewUser.subscription || "Free"}</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm font-medium text-gray-500">Payment Status</p>
                  <p className="font-medium capitalize">
                    {showViewUser.subscriptionDetails?.paymentStatus?.toLowerCase() || "N/A"}
                  </p>
                </div>

                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm font-medium text-gray-500">Joined Date</p>
                  <p className="font-medium">{formatDate(showViewUser.createdAt)}</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm font-medium text-gray-500">Last Login</p>
                  <p className="font-medium">{formatDate(showViewUser.lastLogin)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm font-medium text-gray-500">Age</p>
                  <p className="font-medium">{showViewUser.age || "N/A"}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm font-medium text-gray-500">Height</p>
                  <p className="font-medium">{showViewUser.height ? `${showViewUser.height} cm` : "N/A"}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm font-medium text-gray-500">Weight</p>
                  <p className="font-medium">{showViewUser.weight ? `${showViewUser.weight} kg` : "N/A"}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm font-medium text-gray-500">Fitness Goal</p>
                  <p className="font-medium capitalize">
                    {(showViewUser.fitnessGoal || "").replace("_", " ") || "N/A"}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Fitness Goals</h3>
                <div className="bg-gray-50 p-3 rounded-md">
                  {showViewUser.fitnessGoals?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {showViewUser.fitnessGoals.map((goal, index) => (
                        <Badge key={index} variant="outline" className="capitalize">
                          {goal}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p>No fitness goals specified</p>
                  )}
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowViewUser(null)}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    startEditUser(showViewUser)
                    setShowViewUser(null)
                  }}
                  className="bg-[#00A8FF] hover:bg-[#0096E6]"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit User
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!showDeleteDialog}
        onOpenChange={(open) => {
          if (!open) setShowDeleteDialog(null)
        }}
      >
        {showDeleteDialog && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-red-600">Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete the user{" "}
                <strong>
                  {showDeleteDialog.firstName} {showDeleteDialog.lastName}
                </strong>
                ? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <div className="bg-red-50 border border-red-200 rounded-md p-4 my-4">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-red-800">Warning</h4>
                  <p className="text-sm text-red-700 mt-1">
                    Deleting this user will remove all their data from the system, including:
                  </p>
                  <ul className="list-disc list-inside text-sm text-red-700 mt-2 space-y-1">
                    <li>Personal information and profile</li>
                    <li>Workout history and progress</li>
                    <li>Subscription details</li>
                  </ul>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteDialog(null)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDeleteUser(showDeleteDialog._id)}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete User
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}