"use client"

import { useEffect, useState } from "react"
import { Search, Plus, Edit, Trash, X, Check, AlertTriangle, ChevronDown, Star, Award } from "lucide-react"
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { useAdminStore } from "../../../store/admin-store";
import { AdminLayout } from "../../../components/admin/adminLayout";

export default function AdminTrainers() {
  const { trainers, fetchTrainers, addTrainer, updateTrainer, deleteTrainer, isLoading, error } = useAdminStore()

  const [searchTerm, setSearchTerm] = useState("")
  const [filterSpecialization, setFilterSpecialization] = useState("All")
  const [isAddingTrainer, setIsAddingTrainer] = useState(false)
  const [isEditingTrainer, setIsEditingTrainer] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialization: "Strength",
    bio: "",
    certifications: [],
    clients: 0,
    rating: 0,
  })
  const [newCertification, setNewCertification] = useState("")

  useEffect(() => {
    fetchTrainers()
  }, [fetchTrainers])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddCertification = () => {
    if (newCertification.trim()) {
      setFormData((prev) => ({
        ...prev,
        certifications: [...prev.certifications, newCertification.trim()],
      }))
      setNewCertification("")
    }
  }

  const handleRemoveCertification = (index) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }))
  }

  const handleAddTrainer = async (e) => {
    e.preventDefault()
    try {
      await addTrainer(formData)
      setIsAddingTrainer(false)
      setFormData({
        name: "",
        email: "",
        specialization: "Strength",
        bio: "",
        certifications: [],
        clients: 0,
        rating: 0,
      })
    } catch (error) {
      console.error("Failed to add trainer:", error)
    }
  }

  const handleEditTrainer = async (e) => {
    e.preventDefault()
    try {
      await updateTrainer(isEditingTrainer, formData)
      setIsEditingTrainer(null)
      setFormData({
        name: "",
        email: "",
        specialization: "Strength",
        bio: "",
        certifications: [],
        clients: 0,
        rating: 0,
      })
    } catch (error) {
      console.error("Failed to update trainer:", error)
    }
  }

  const handleDeleteTrainer = async (trainerId) => {
    try {
      await deleteTrainer(trainerId)
      setShowDeleteConfirm(null)
    } catch (error) {
      console.error("Failed to delete trainer:", error)
    }
  }

  const startEditTrainer = (trainer) => {
    setIsEditingTrainer(trainer.id)
    setFormData({
      name: trainer.name,
      email: trainer.email,
      specialization: trainer.specialization,
      bio: trainer.bio || "",
      certifications: trainer.certifications || [],
      clients: trainer.clients,
      rating: trainer.rating,
    })
  }

  const filteredTrainers = trainers.filter((trainer) => {
    const matchesSearch =
      trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialization = filterSpecialization === "All" || trainer.specialization === filterSpecialization

    return matchesSearch && matchesSpecialization
  })

  const specializations = ["All", "Strength", "Cardio", "Yoga", "Nutrition", "Flexibility"]

  if (isLoading && trainers.length === 0) {
    return (
      <AdminLayout>
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#ECECEE] border-t-[#00A8FF] mx-auto"></div>
            <p className="text-[#0E0E2C]">Loading trainers...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Trainer Management</h1>
          <Button onClick={() => setIsAddingTrainer(true)} className="bg-[#00A8FF] hover:bg-[#0096E6]">
            <Plus className="mr-2 h-4 w-4" />
            Add Trainer
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
          </div>
        </Card>

        {/* Add/Edit Trainer Form */}
        {(isAddingTrainer || isEditingTrainer) && (
          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{isEditingTrainer ? "Edit Trainer" : "Add New Trainer"}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setIsAddingTrainer(false)
                  setIsEditingTrainer(null)
                  setFormData({
                    name: "",
                    email: "",
                    specialization: "Strength",
                    bio: "",
                    certifications: [],
                    clients: 0,
                    rating: 0,
                  })
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <form onSubmit={isEditingTrainer ? handleEditTrainer : handleAddTrainer} className="space-y-4">
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
              <div>
                <label htmlFor="bio" className="mb-1 block text-sm font-medium">
                  Bio
                </label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Trainer's professional bio and experience"
                />
              </div>
              <div>
                <label htmlFor="specialization" className="mb-1 block text-sm font-medium">
                  Specialization
                </label>
                <div className="relative">
                  <select
                    id="specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-[#ECECEE] bg-white px-3 py-2 text-sm text-[#0E0E2C] focus:outline-none focus:ring-2 focus:ring-[#00A8FF]"
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
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Certifications</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      <Award className="h-3 w-3 mr-1" />
                      {cert}
                      <button
                        type="button"
                        onClick={() => handleRemoveCertification(index)}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex">
                  <Input
                    value={newCertification}
                    onChange={(e) => setNewCertification(e.target.value)}
                    placeholder="Add certification (e.g., 'NASM CPT')"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    onClick={handleAddCertification}
                    className="ml-2 bg-[#00A8FF] hover:bg-[#0096E6]"
                  >
                    Add
                  </Button>
                </div>
              </div>
              {isEditingTrainer && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="clients" className="mb-1 block text-sm font-medium">
                      Number of Clients
                    </label>
                    <Input
                      id="clients"
                      name="clients"
                      type="number"
                      min="0"
                      value={formData.clients}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="rating" className="mb-1 block text-sm font-medium">
                      Rating (0-5)
                    </label>
                    <Input
                      id="rating"
                      name="rating"
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={formData.rating}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}
              <div className="flex justify-end">
                <Button type="submit" className="bg-[#00A8FF] hover:bg-[#0096E6]">
                  {isEditingTrainer ? "Update Trainer" : "Add Trainer"}
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTrainers.length > 0 ? (
            filteredTrainers.map((trainer) => (
              <Card key={trainer.id} className="overflow-hidden">
                <div className="bg-[#0E0E2C] p-4 text-white">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{trainer.name}</h3>
                    <div className="flex items-center">
                      <span className="mr-1 text-sm">{trainer.rating}</span>
                      <Star className="h-4 w-4 text-yellow-400" fill="#FBBF24" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">{trainer.email}</p>
                </div>
                <div className="p-4">
                  <div className="mb-3 flex items-center">
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                      {trainer.specialization}
                    </span>
                    <span className="ml-auto text-sm text-gray-500">{trainer.clients} clients</span>
                  </div>

                  {trainer.bio && <p className="mb-3 text-sm text-gray-600">{trainer.bio}</p>}

                  {trainer.certifications && trainer.certifications.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-medium text-gray-500 mb-1">Certifications:</p>
                      <div className="flex flex-wrap gap-1">
                        {trainer.certifications.map((cert, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-800"
                          >
                            <Award className="mr-1 h-3 w-3" />
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex justify-end space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => startEditTrainer(trainer)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="mr-1 h-4 w-4" />
                      Edit
                    </Button>

                    {showDeleteConfirm === trainer.id ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Confirm?</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteTrainer(trainer.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setShowDeleteConfirm(null)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShowDeleteConfirm(trainer.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash className="mr-1 h-4 w-4" />
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No trainers found</p>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

