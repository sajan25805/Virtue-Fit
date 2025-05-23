// "use client"

// import { useEffect, useState } from "react"
// import { Search, Plus, Edit, Trash, X, Check, AlertTriangle, ChevronDown, Star, Award } from "lucide-react"
// import { Card } from "../../../components/ui/card";
// import { Button } from "../../../components/ui/button";
// import { Input } from "../../../components/ui/input";
// import { Textarea } from "../../../components/ui/textarea";
// import { useAdminStore } from "../../../store/admin-store";

// export default function AdminTrainers() {
//   const { trainers, fetchTrainers, addTrainer, updateTrainer, deleteTrainer, isLoading, error } = useAdminStore()

//   const [searchTerm, setSearchTerm] = useState("")
//   const [filterSpecialization, setFilterSpecialization] = useState("All")
//   const [isAddingTrainer, setIsAddingTrainer] = useState(false)
//   const [isEditingTrainer, setIsEditingTrainer] = useState(null)
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     specialization: "Strength",
//     bio: "",
//     certifications: [],
//     clients: 0,
//     rating: 0,
//   })
//   const [newCertification, setNewCertification] = useState("")

//   useEffect(() => {
//     fetchTrainers()
//   }, [fetchTrainers])

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleAddCertification = () => {
//     if (newCertification.trim()) {
//       setFormData((prev) => ({
//         ...prev,
//         certifications: [...prev.certifications, newCertification.trim()],
//       }))
//       setNewCertification("")
//     }
//   }

//   const handleRemoveCertification = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       certifications: prev.certifications.filter((_, i) => i !== index),
//     }))
//   }

//   const handleAddTrainer = async (e) => {
//     e.preventDefault()
//     try {
//       await addTrainer(formData)
//       setIsAddingTrainer(false)
//       setFormData({
//         name: "",
//         email: "",
//         specialization: "Strength",
//         bio: "",
//         certifications: [],
//         clients: 0,
//         rating: 0,
//       })
//     } catch (error) {
//       console.error("Failed to add trainer:", error)
//     }
//   }

//   const handleEditTrainer = async (e) => {
//     e.preventDefault()
//     try {
//       await updateTrainer(isEditingTrainer, formData)
//       setIsEditingTrainer(null)
//       setFormData({
//         name: "",
//         email: "",
//         specialization: "Strength",
//         bio: "",
//         certifications: [],
//         clients: 0,
//         rating: 0,
//       })
//     } catch (error) {
//       console.error("Failed to update trainer:", error)
//     }
//   }

//   const handleDeleteTrainer = async (trainerId) => {
//     try {
//       await deleteTrainer(trainerId)
//       setShowDeleteConfirm(null)
//     } catch (error) {
//       console.error("Failed to delete trainer:", error)
//     }
//   }

//   const startEditTrainer = (trainer) => {
//     setIsEditingTrainer(trainer.id)
//     setFormData({
//       name: trainer.name,
//       email: trainer.email,
//       specialization: trainer.specialization,
//       bio: trainer.bio || "",
//       certifications: trainer.certifications || [],
//       clients: trainer.clients,
//       rating: trainer.rating,
//     })
//   }

//   const filteredTrainers = trainers.filter((trainer) => {
//     const matchesSearch =
//       trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       trainer.email.toLowerCase().includes(searchTerm.toLowerCase())
//     const matchesSpecialization = filterSpecialization === "All" || trainer.specialization === filterSpecialization

//     return matchesSearch && matchesSpecialization
//   })

//   const specializations = ["All", "Strength", "Cardio", "Yoga", "Nutrition", "Flexibility"]

//   if (isLoading && trainers.length === 0) {
//     return (
      
//         <div className="flex h-full items-center justify-center">
//           <div className="text-center">
//             <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#ECECEE] border-t-[#00A8FF] mx-auto"></div>
//             <p className="text-[#0E0E2C]">Loading trainers...</p>
//           </div>
//         </div>
//     )
//   }

//   return (
    
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <h1 className="text-2xl font-bold">Trainer Management</h1>
//           <Button onClick={() => setIsAddingTrainer(true)} className="bg-[#00A8FF] hover:bg-[#0096E6]">
//             <Plus className="mr-2 h-4 w-4" />
//             Add Trainer
//           </Button>
//         </div>

//         {error && (
//           <div className="rounded-lg bg-red-100 p-4 text-red-700">
//             <div className="flex items-center">
//               <AlertTriangle className="mr-2 h-5 w-5" />
//               <p>{error}</p>
//             </div>
//           </div>
//         )}

//         {/* Search and Filters */}
//         <Card className="p-4">
//           <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//               <Input
//                 placeholder="Search trainers..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>

//             <div className="flex-1">
//               <label className="mb-1 block text-sm font-medium">Specialization</label>
//               <div className="relative">
//                 <select
//                   value={filterSpecialization}
//                   onChange={(e) => setFilterSpecialization(e.target.value)}
//                   className="w-full rounded-md border border-[#ECECEE] bg-white px-3 py-2 text-sm text-[#0E0E2C] focus:outline-none focus:ring-2 focus:ring-[#00A8FF]"
//                 >
//                   {specializations.map((spec) => (
//                     <option key={spec} value={spec}>
//                       {spec === "All" ? "All Specializations" : spec}
//                     </option>
//                   ))}
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
//               </div>
//             </div>
//           </div>
//         </Card>

//         {/* Add/Edit Trainer Form */}
//         {(isAddingTrainer || isEditingTrainer) && (
//           <Card className="p-6">
//             <div className="mb-4 flex items-center justify-between">
//               <h2 className="text-lg font-semibold">{isEditingTrainer ? "Edit Trainer" : "Add New Trainer"}</h2>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => {
//                   setIsAddingTrainer(false)
//                   setIsEditingTrainer(null)
//                   setFormData({
//                     name: "",
//                     email: "",
//                     specialization: "Strength",
//                     bio: "",
//                     certifications: [],
//                     clients: 0,
//                     rating: 0,
//                   })
//                 }}
//               >
//                 <X className="h-4 w-4" />
//               </Button>
//             </div>
//             <form onSubmit={isEditingTrainer ? handleEditTrainer : handleAddTrainer} className="space-y-4">
//               <div>
//                 <label htmlFor="name" className="mb-1 block text-sm font-medium">
//                   Full Name
//                 </label>
//                 <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
//               </div>
//               <div>
//                 <label htmlFor="email" className="mb-1 block text-sm font-medium">
//                   Email Address
//                 </label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="bio" className="mb-1 block text-sm font-medium">
//                   Bio
//                 </label>
//                 <Textarea
//                   id="bio"
//                   name="bio"
//                   value={formData.bio}
//                   onChange={handleInputChange}
//                   rows={3}
//                   placeholder="Trainer's professional bio and experience"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="specialization" className="mb-1 block text-sm font-medium">
//                   Specialization
//                 </label>
//                 <div className="relative">
//                   <select
//                     id="specialization"
//                     name="specialization"
//                     value={formData.specialization}
//                     onChange={handleInputChange}
//                     className="w-full rounded-md border border-[#ECECEE] bg-white px-3 py-2 text-sm text-[#0E0E2C] focus:outline-none focus:ring-2 focus:ring-[#00A8FF]"
//                   >
//                     {specializations
//                       .filter((s) => s !== "All")
//                       .map((spec) => (
//                         <option key={spec} value={spec}>
//                           {spec}
//                         </option>
//                       ))}
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
//                 </div>
//               </div>
//               <div>
//                 <label className="mb-1 block text-sm font-medium">Certifications</label>
//                 <div className="flex flex-wrap gap-2 mb-2">
//                   {formData.certifications.map((cert, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
//                     >
//                       <Award className="h-3 w-3 mr-1" />
//                       {cert}
//                       <button
//                         type="button"
//                         onClick={() => handleRemoveCertification(index)}
//                         className="ml-1 text-blue-600 hover:text-blue-800"
//                       >
//                         <X className="h-3 w-3" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="flex">
//                   <Input
//                     value={newCertification}
//                     onChange={(e) => setNewCertification(e.target.value)}
//                     placeholder="Add certification (e.g., 'NASM CPT')"
//                     className="flex-1"
//                   />
//                   <Button
//                     type="button"
//                     onClick={handleAddCertification}
//                     className="ml-2 bg-[#00A8FF] hover:bg-[#0096E6]"
//                   >
//                     Add
//                   </Button>
//                 </div>
//               </div>
//               {isEditingTrainer && (
//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                   <div>
//                     <label htmlFor="clients" className="mb-1 block text-sm font-medium">
//                       Number of Clients
//                     </label>
//                     <Input
//                       id="clients"
//                       name="clients"
//                       type="number"
//                       min="0"
//                       value={formData.clients}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="rating" className="mb-1 block text-sm font-medium">
//                       Rating (0-5)
//                     </label>
//                     <Input
//                       id="rating"
//                       name="rating"
//                       type="number"
//                       min="0"
//                       max="5"
//                       step="0.1"
//                       value={formData.rating}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                 </div>
//               )}
//               <div className="flex justify-end">
//                 <Button type="submit" className="bg-[#00A8FF] hover:bg-[#0096E6]">
//                   {isEditingTrainer ? "Update Trainer" : "Add Trainer"}
//                 </Button>
//               </div>
//             </form>
//           </Card>
//         )}

//         {/* Trainers Grid */}
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {filteredTrainers.length > 0 ? (
//             filteredTrainers.map((trainer) => (
//               <Card key={trainer.id} className="overflow-hidden">
//                 <div className="bg-[#0E0E2C] p-4 text-white">
//                   <div className="flex items-center justify-between">
//                     <h3 className="font-semibold">{trainer.name}</h3>
//                     <div className="flex items-center">
//                       <span className="mr-1 text-sm">{trainer.rating}</span>
//                       <Star className="h-4 w-4 text-yellow-400" fill="#FBBF24" />
//                     </div>
//                   </div>
//                   <p className="text-sm text-gray-300">{trainer.email}</p>
//                 </div>
//                 <div className="p-4">
//                   <div className="mb-3 flex items-center">
//                     <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
//                       {trainer.specialization}
//                     </span>
//                     <span className="ml-auto text-sm text-gray-500">{trainer.clients} clients</span>
//                   </div>

//                   {trainer.bio && <p className="mb-3 text-sm text-gray-600">{trainer.bio}</p>}

//                   {trainer.certifications && trainer.certifications.length > 0 && (
//                     <div className="mb-3">
//                       <p className="text-xs font-medium text-gray-500 mb-1">Certifications:</p>
//                       <div className="flex flex-wrap gap-1">
//                         {trainer.certifications.map((cert, index) => (
//                           <span
//                             key={index}
//                             className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-800"
//                           >
//                             <Award className="mr-1 h-3 w-3" />
//                             {cert}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   <div className="mt-4 flex justify-end space-x-2">
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       onClick={() => startEditTrainer(trainer)}
//                       className="text-blue-600 hover:text-blue-800"
//                     >
//                       <Edit className="mr-1 h-4 w-4" />
//                       Edit
//                     </Button>

//                     {showDeleteConfirm === trainer.id ? (
//                       <div className="flex items-center space-x-2">
//                         <span className="text-xs text-gray-500">Confirm?</span>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={() => handleDeleteTrainer(trainer.id)}
//                           className="text-red-600 hover:text-red-800"
//                         >
//                           <Check className="h-4 w-4" />
//                         </Button>
//                         <Button size="sm" variant="outline" onClick={() => setShowDeleteConfirm(null)}>
//                           <X className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     ) : (
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => setShowDeleteConfirm(trainer.id)}
//                         className="text-red-600 hover:text-red-800"
//                       >
//                         <Trash className="mr-1 h-4 w-4" />
//                         Delete
//                       </Button>
//                     )}
//                   </div>
//                 </div>
//               </Card>
//             ))
//           ) : (
//             <p className="col-span-full text-center text-gray-500">No trainers found</p>
//           )}
//         </div>
//       </div>
//   )
// }




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

export default function AdminTrainers() {
  const { trainers, fetchTrainers, addTrainer, updateTrainer, deleteTrainer, isLoading, error } = useAdminStore()

  const [searchTerm, setSearchTerm] = useState("")
  const [filterSpecialization, setFilterSpecialization] = useState("All")
  const [filterStatus, setFilterStatus] = useState("All")
  const [isAddingTrainer, setIsAddingTrainer] = useState(false)
  const [isEditingTrainer, setIsEditingTrainer] = useState(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(null)
  const [showViewTrainer, setShowViewTrainer] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialization: "Fitness",
    bio: "",
    profilePicture: "",
    isActive: true,
  })
  const [newCertification, setNewCertification] = useState("")
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchTrainers()
  }, [fetchTrainers])

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

    if (!formData.name.trim()) errors.name = "Name is required"
    if (!formData.email.trim()) errors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid"
    if (!formData.specialization) errors.specialization = "Specialization is required"
    if (!formData.bio.trim()) errors.bio = "Bio is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleAddTrainer = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      setIsSubmitting(true)
      await addTrainer(formData)
      toast.success("Trainer added successfully")
      setIsAddingTrainer(false)
      resetForm()
    } catch (error) {
      toast.error(error.message || "Failed to add trainer")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditTrainer = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      setIsSubmitting(true)
      await updateTrainer(isEditingTrainer, formData)
      toast.success("Trainer updated successfully")
      setIsEditingTrainer(null)
      resetForm()
    } catch (error) {
      toast.error(error.message || "Failed to update trainer")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteTrainer = async (trainerId) => {
    try {
      setIsSubmitting(true)
      await deleteTrainer(trainerId)
      toast.success("Trainer deleted successfully")
      setShowDeleteDialog(null)
    } catch (error) {
      toast.error(error.message || "Failed to delete trainer")
    } finally {
      setIsSubmitting(false)
    }
  }

  const startEditTrainer = (trainer) => {
    setIsEditingTrainer(trainer._id)
    setFormData({
      name: trainer.name || "",
      email: trainer.email || "",
      specialization: trainer.specialization || "Fitness",
      bio: trainer.bio || "",
      profilePicture: trainer.profilePicture || "",
      isActive: trainer.isActive !== false,
    })
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      specialization: "Fitness",
      bio: "",
      profilePicture: "",
      isActive: true,
    })
    setFormErrors({})
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      await fetchTrainers()
      toast.success("Trainers refreshed")
    } catch (error) {
      toast.error("Failed to refresh trainers")
    } finally {
      setRefreshing(false)
    }
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  // Filter trainers based on search term, specialization and status
  const filteredTrainers = trainers.filter((trainer) => {
    const matchesSearch =
      trainer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.email?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSpecialization = filterSpecialization === "All" || trainer.specialization === filterSpecialization

    const matchesStatus =
      filterStatus === "All" ||
      (filterStatus === "Active" && trainer.isActive) ||
      (filterStatus === "Inactive" && !trainer.isActive)

    return matchesSearch && matchesSpecialization && matchesStatus
  })

  const specializations = ["All", "Fitness", "Strength", "Cardio", "Yoga", "Nutrition", "Flexibility"]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Trainer Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your fitness trainers</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing} className="text-gray-600">
            {refreshing ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-1" />}
            Refresh
          </Button>

          <Button
            onClick={() => {
              setIsAddingTrainer(true)
              resetForm()
            }}
            className="bg-[#00A8FF] hover:bg-[#0096E6]"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Trainer
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
                  placeholder="Search trainers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium">Specialization</label>
                <div className="relative">
                  <select
                    value={filterSpecialization}
                    onChange={(e) => setFilterSpecialization(e.target.value)}
                    className="w-full rounded-md border border-[#ECECEE] bg-white px-3 py-2 text-sm text-[#0E0E2C] focus:outline-none focus:ring-2 focus:ring-[#00A8FF]"
                  >
                    {specializations.map((spec) => (
                      <option key={spec} value={spec}>
                        {spec === "All" ? "All Specializations" : spec}
                      </option>
                    ))}
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
            </div>
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-700">Total Trainers</h3>
                <p className="text-2xl font-bold text-blue-900">{trainers.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-green-700">Active Trainers</h3>
                <p className="text-2xl font-bold text-green-900">{trainers.filter((t) => t.isActive).length}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-yellow-700">Specializations</h3>
                <p className="text-2xl font-bold text-yellow-900">
                  {new Set(trainers.map((t) => t.specialization)).size}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-purple-700">New This Month</h3>
                <p className="text-2xl font-bold text-purple-900">
                  {
                    trainers.filter((t) => {
                      const date = new Date(t.createdAt)
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

      {/* Trainers Grid */}
      {isLoading && trainers.length === 0 ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin text-[#00A8FF] mx-auto mb-4" />
            <p className="text-[#0E0E2C]">Loading trainers...</p>
          </div>
        </div>
      ) : filteredTrainers.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredTrainers.map((trainer) => (
              <motion.div
                key={trainer._id}
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
                          <AvatarImage src={trainer.profilePicture || "/placeholder.svg"} alt={trainer.name} />
                          <AvatarFallback className="bg-[#00A8FF] text-white">
                            {getInitials(trainer.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold flex items-center gap-2">
                            {trainer.name}
                            {trainer.isVerified && <CheckCircle className="h-4 w-4 text-green-400" />}
                          </h3>
                          <p className="text-xs text-gray-300 flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {trainer.email}
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
                          <DropdownMenuItem onClick={() => setShowViewTrainer(trainer)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => startEditTrainer(trainer)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Trainer
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => setShowDeleteDialog(trainer)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete Trainer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    <div className="mb-3 flex items-center">
                      <Badge variant={trainer.isActive ? "success" : "secondary"}>
                        {trainer.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <Badge variant="outline" className="ml-2">
                        {trainer.specialization || "General"}
                      </Badge>
                    </div>

                    {trainer.bio && <p className="mb-4 text-sm text-gray-600 line-clamp-3">{trainer.bio}</p>}

                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Joined {formatDate(trainer.createdAt)}
                        </div>

                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Last login: {trainer.lastLogin ? formatDate(trainer.lastLogin) : "Never"}
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
          <h3 className="text-xl font-semibold mb-2">No trainers found</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            {searchTerm || filterSpecialization !== "All" || filterStatus !== "All"
              ? "No trainers match your current filters. Try adjusting your search criteria."
              : "There are no trainers in the system yet. Add your first trainer to get started."}
          </p>
          {searchTerm || filterSpecialization !== "All" || filterStatus !== "All" ? (
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setFilterSpecialization("All")
                setFilterStatus("All")
              }}
            >
              Clear Filters
            </Button>
          ) : (
            <Button
              onClick={() => {
                setIsAddingTrainer(true)
                resetForm()
              }}
              className="bg-[#00A8FF] hover:bg-[#0096E6]"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Trainer
            </Button>
          )}
        </div>
      )}

      {/* Add/Edit Trainer Form Dialog */}
      <Dialog
        open={isAddingTrainer || isEditingTrainer}
        onOpenChange={(open) => {
          if (!open) {
            setIsAddingTrainer(false)
            setIsEditingTrainer(null)
            resetForm()
          }
        }}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isEditingTrainer ? "Edit Trainer" : "Add New Trainer"}</DialogTitle>
            <DialogDescription>
              {isEditingTrainer
                ? "Update the trainer's information below."
                : "Fill in the details to add a new trainer to the system."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={isEditingTrainer ? handleEditTrainer : handleAddTrainer} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium">
                  Full Name*
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={formErrors.name ? "border-red-500" : ""}
                />
                {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
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
            </div>

            <div>
              <label htmlFor="bio" className="mb-1 block text-sm font-medium">
                Bio*
              </label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={3}
                placeholder="Trainer's professional bio and experience"
                className={formErrors.bio ? "border-red-500" : ""}
              />
              {formErrors.bio && <p className="text-red-500 text-xs mt-1">{formErrors.bio}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="specialization" className="mb-1 block text-sm font-medium">
                  Specialization*
                </label>
                <div className="relative">
                  <select
                    id="specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    className={`w-full rounded-md border ${
                      formErrors.specialization ? "border-red-500" : "border-[#ECECEE]"
                    } bg-white px-3 py-2 text-sm text-[#0E0E2C] focus:outline-none focus:ring-2 focus:ring-[#00A8FF]`}
                  >
                    {specializations
                      .filter((s) => s !== "All")
                      .map((spec) => (
                        <option key={spec} value={spec}>
                          {spec}
                        </option>
                      ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                {formErrors.specialization && <p className="text-red-500 text-xs mt-1">{formErrors.specialization}</p>}
              </div>

              <div>
                <label htmlFor="profilePicture" className="mb-1 block text-sm font-medium">
                  Profile Picture URL
                </label>
                <Input
                  id="profilePicture"
                  name="profilePicture"
                  value={formData.profilePicture}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
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
                Active Trainer
              </label>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAddingTrainer(false)
                  setIsEditingTrainer(null)
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
                    {isEditingTrainer ? "Updating..." : "Adding..."}
                  </>
                ) : isEditingTrainer ? (
                  "Update Trainer"
                ) : (
                  "Add Trainer"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Trainer Details Dialog */}
      <Dialog
        open={!!showViewTrainer}
        onOpenChange={(open) => {
          if (!open) setShowViewTrainer(null)
        }}
      >
        {showViewTrainer && (
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Trainer Details</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-gray-200">
                  <AvatarImage src={showViewTrainer.profilePicture || "/placeholder.svg"} alt={showViewTrainer.name} />
                  <AvatarFallback className="bg-[#00A8FF] text-white text-xl">
                    {getInitials(showViewTrainer.name)}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    {showViewTrainer.name}
                    {showViewTrainer.isVerified && <CheckCircle className="h-5 w-5 text-green-500" />}
                  </h2>
                  <p className="text-gray-500">{showViewTrainer.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm font-medium text-gray-500">Specialization</p>
                  <p className="font-medium">{showViewTrainer.specialization || "Not specified"}</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <p className="font-medium flex items-center">
                    {showViewTrainer.isActive ? (
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
                  <p className="text-sm font-medium text-gray-500">Joined Date</p>
                  <p className="font-medium">{formatDate(showViewTrainer.createdAt)}</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm font-medium text-gray-500">Last Login</p>
                  <p className="font-medium">
                    {showViewTrainer.lastLogin ? formatDate(showViewTrainer.lastLogin) : "Never"}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Bio</h3>
                <p className="bg-gray-50 p-3 rounded-md">{showViewTrainer.bio || "No bio provided"}</p>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowViewTrainer(null)}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    startEditTrainer(showViewTrainer)
                    setShowViewTrainer(null)
                  }}
                  className="bg-[#00A8FF] hover:bg-[#0096E6]"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Trainer
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
                Are you sure you want to delete the trainer <strong>{showDeleteDialog.name}</strong>? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>

            <div className="bg-red-50 border border-red-200 rounded-md p-4 my-4">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-red-800">Warning</h4>
                  <p className="text-sm text-red-700 mt-1">
                    Deleting this trainer will remove all their data from the system, including:
                  </p>
                  <ul className="list-disc list-inside text-sm text-red-700 mt-2 space-y-1">
                    <li>Personal information and profile</li>
                    <li>Client relationships and assignments</li>
                    <li>Program associations</li>
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
                onClick={() => handleDeleteTrainer(showDeleteDialog._id)}
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
                    Delete Trainer
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
