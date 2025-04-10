// "use client"

// import { useState } from "react"
// import { useMealStore } from "../store/meal-store"
// import { Card } from "../components/ui/card"
// import { Button } from "../components/ui/button"
// import { Input } from "../components/ui/input"
// import { Textarea } from "../components/ui/textarea"
// import { Select } from "../components/ui/select"
// import { Filter, FilterGroup } from "../components/ui/filter"
// import { Utensils, Edit, Trash, Plus, X } from "lucide-react"

// export function MealManagement() {
//   const { meals, addMeal, updateMeal, deleteMeal } = useMealStore()
//   const [isAdding, setIsAdding] = useState(false)
//   const [editingId, setEditingId] = useState(null)
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     dietaryType: "Regular",
//     calories: 0,
//     protein: 0,
//     carbs: 0,
//     fats: 0,
//   })
//   const [filter, setFilter] = useState("All")

//   const dietaryOptions = [
//     { label: "All Types", value: "All" },
//     { label: "Regular", value: "Regular" },
//     { label: "Vegetarian", value: "Vegetarian" },
//     { label: "Vegan", value: "Vegan" },
//     { label: "Gluten-Free", value: "Gluten-Free" },
//     { label: "Keto", value: "Keto" },
//   ]

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === "name" || name === "description" || name === "dietaryType" ? value : Number(value),
//     }))
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (editingId) {
//       updateMeal(editingId, { ...formData })
//       setEditingId(null)
//     } else {
//       addMeal({
//         ...formData,
//         id: Date.now().toString(),
//         createdAt: Date.now(),
//       })
//     }
//     setIsAdding(false)
//     setFormData({
//       name: "",
//       description: "",
//       dietaryType: "Regular",
//       calories: 0,
//       protein: 0,
//       carbs: 0,
//       fats: 0,
//     })
//   }

//   const handleEdit = (meal) => {
//     setFormData({
//       name: meal.name,
//       description: meal.description,
//       dietaryType: meal.dietaryType,
//       calories: meal.calories,
//       protein: meal.protein,
//       carbs: meal.carbs,
//       fats: meal.fats,
//     })
//     setEditingId(meal.id)
//     setIsAdding(true)
//   }

//   const filteredMeals = meals.filter((meal) => {
//     return filter === "All" || meal.dietaryType === filter
//   })

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">Meal Management</h1>
//         <Button
//           onClick={() => {
//             setIsAdding(true)
//             setEditingId(null)
//             setFormData({
//               name: "",
//               description: "",
//               dietaryType: "Regular",
//               calories: 0,
//               protein: 0,
//               carbs: 0,
//               fats: 0,
//             })
//           }}
//           className="bg-[#00A8FF] hover:bg-[#0096E6]"
//         >
//           <Plus className="mr-2 h-4 w-4" /> Add Meal
//         </Button>
//       </div>

//       {isAdding && (
//         <Card className="p-6">
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="text-lg font-semibold">{editingId ? "Edit Meal" : "Add New Meal"}</h2>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => {
//                 setIsAdding(false)
//                 setEditingId(null)
//               }}
//             >
//               <X className="h-4 w-4" />
//             </Button>
//           </div>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label htmlFor="name" className="mb-1 block text-sm font-medium">
//                 Meal Name
//               </label>
//               <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
//             </div>
//             <div>
//               <label htmlFor="description" className="mb-1 block text-sm font-medium">
//                 Description
//               </label>
//               <Textarea
//                 id="description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 rows={3}
//               />
//             </div>
//             <div>
//               <label htmlFor="dietaryType" className="mb-1 block text-sm font-medium">
//                 Dietary Type
//               </label>
//               <Select id="dietaryType" name="dietaryType" value={formData.dietaryType} onChange={handleInputChange}>
//                 <option value="Regular">Regular</option>
//                 <option value="Vegetarian">Vegetarian</option>
//                 <option value="Vegan">Vegan</option>
//                 <option value="Gluten-Free">Gluten-Free</option>
//                 <option value="Keto">Keto</option>
//               </Select>
//             </div>
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
//               <div>
//                 <label htmlFor="calories" className="mb-1 block text-sm font-medium">
//                   Calories
//                 </label>
//                 <Input
//                   id="calories"
//                   name="calories"
//                   type="number"
//                   min="0"
//                   value={formData.calories}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="protein" className="mb-1 block text-sm font-medium">
//                   Protein (g)
//                 </label>
//                 <Input
//                   id="protein"
//                   name="protein"
//                   type="number"
//                   min="0"
//                   value={formData.protein}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="carbs" className="mb-1 block text-sm font-medium">
//                   Carbs (g)
//                 </label>
//                 <Input
//                   id="carbs"
//                   name="carbs"
//                   type="number"
//                   min="0"
//                   value={formData.carbs}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="fats" className="mb-1 block text-sm font-medium">
//                   Fats (g)
//                 </label>
//                 <Input id="fats" name="fats" type="number" min="0" value={formData.fats} onChange={handleInputChange} />
//               </div>
//             </div>
//             <div className="flex justify-end">
//               <Button type="submit" className="bg-[#00A8FF] hover:bg-[#0096E6]">
//                 {editingId ? "Update Meal" : "Add Meal"}
//               </Button>
//             </div>
//           </form>
//         </Card>
//       )}

//       <FilterGroup>
//         <Filter
//           label="Filter by Dietary Type"
//           options={dietaryOptions}
//           value={filter}
//           onChange={setFilter}
//           className="w-full max-w-xs"
//         />
//       </FilterGroup>

//       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {filteredMeals.length > 0 ? (
//           filteredMeals.map((meal) => (
//             <Card key={meal.id} className="p-6">
//               <div className="mb-4 flex items-center">
//                 <div className="rounded-full bg-green-100 p-2 text-green-600">
//                   <Utensils className="h-5 w-5" />
//                 </div>
//                 <div className="ml-3">
//                   <h3 className="font-semibold">{meal.name}</h3>
//                   <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{meal.dietaryType}</span>
//                 </div>
//                 <div className="ml-auto flex space-x-2">
//                   <Button variant="ghost" size="icon" onClick={() => handleEdit(meal)}>
//                     <Edit className="h-4 w-4" />
//                   </Button>
//                   <Button variant="ghost" size="icon" onClick={() => deleteMeal(meal.id)}>
//                     <Trash className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//               <p className="mb-3 text-sm">{meal.description}</p>
//               <div className="grid grid-cols-4 gap-2 text-center text-sm">
//                 <div className="rounded-md bg-gray-50 p-2">
//                   <p className="font-medium">{meal.calories}</p>
//                   <p className="text-xs text-gray-500">Calories</p>
//                 </div>
//                 <div className="rounded-md bg-gray-50 p-2">
//                   <p className="font-medium">{meal.protein}g</p>
//                   <p className="text-xs text-gray-500">Protein</p>
//                 </div>
//                 <div className="rounded-md bg-gray-50 p-2">
//                   <p className="font-medium">{meal.carbs}g</p>
//                   <p className="text-xs text-gray-500">Carbs</p>
//                 </div>
//                 <div className="rounded-md bg-gray-50 p-2">
//                   <p className="font-medium">{meal.fats}g</p>
//                   <p className="text-xs text-gray-500">Fats</p>
//                 </div>
//               </div>
//             </Card>
//           ))
//         ) : (
//           <p className="col-span-full text-center text-gray-500">No meals found</p>
//         )}
//       </div>
//     </div>
//   )
// }




// // "use client"

// // import { useState, useEffect } from "react";
// // import { useMealStore } from "../store/meal-store";
// // import { useNavigate } from "react-router-dom";
// // import { Card } from "../components/ui/card";
// // import { Button } from "../components/ui/button";
// // import { Input } from "../components/ui/input";
// // import { Textarea } from "../components/ui/textarea";
// // import { Label } from "../components/ui/label";
// // import { Filter, FilterGroup } from "../components/ui/filter";
// // import { Utensils, Edit, Trash, Plus, X } from "lucide-react";

// // export function MealManagement() {
// //   const navigate = useNavigate();
// //   const [isAdding, setIsAdding] = useState(false);
// //   const [editingId, setEditingId] = useState(null);
// //   const [formData, setFormData] = useState({
// //     title: "",
// //     description: "",
// //     calories: 0,
// //     protein: 0,
// //     carbs: 0,
// //     fats: 0,
// //     ingredients: "",
// //     recipes: "",
// //     isVegetarian: false,
// //     isVegan: false,
// //     isGlutenFree: false,
// //     thumbnail: null,
// //   });
// //   const [filter, setFilter] = useState("All");

// //   // Get trainer from localStorage
// //   const trainer = localStorage.getItem("trainer") && JSON.parse(localStorage.getItem("trainer"));
// //   const trainerId = trainer?._id;
// //   const trainerName = trainer?.name;

// //   const {
// //     meals,
// //     loading,
// //     error,
// //     fetchMeals,
// //     addMeal,
// //     updateMeal,
// //     deleteMeal,
// //   } = useMealStore();

// //   const dietaryOptions = [
// //     { label: "All Types", value: "All" },
// //     { label: "Regular", value: "Regular" },
// //     { label: "Vegetarian", value: "Vegetarian" },
// //     { label: "Vegan", value: "Vegan" },
// //     { label: "Gluten-Free", value: "Gluten-Free" },
// //   ];

// //   useEffect(() => {
// //     if (trainerId) {
// //       fetchMeals();
// //     }
// //   }, [fetchMeals, trainerId]);

// //   const handleInputChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: type === "checkbox" ? checked : value,
// //     }));
// //   };

// //   const handleFileChange = (e) => {
// //     setFormData((prev) => ({ ...prev, thumbnail: e.target.files[0] }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     if (!trainerId) {
// //       console.error("No trainer ID found - user might not be logged in");
// //       return;
// //     }

// //     try {
// //       const mealData = new FormData();
      
// //       // Append all required fields
// //       mealData.append("title", formData.title);
// //       mealData.append("description", formData.description);
// //       mealData.append("calories", formData.calories.toString());
// //       mealData.append("protein", formData.protein.toString());
// //       mealData.append("carbs", formData.carbs.toString());
// //       mealData.append("fats", formData.fats.toString());
// //       mealData.append("ingredients", formData.ingredients);
// //       mealData.append("recipes", formData.recipes);
// //       mealData.append("isVegetarian", formData.isVegetarian.toString());
// //       mealData.append("isVegan", formData.isVegan.toString());
// //       mealData.append("isGlutenFree", formData.isGlutenFree.toString());
// //       mealData.append("trainer", trainerId);
// //       mealData.append("trainerName", trainerName);
      
// //       // Append thumbnail if exists
// //       if (formData.thumbnail) {
// //         mealData.append("thumbnail", formData.thumbnail);
// //       }

// //       if (editingId) {
// //         await updateMeal(editingId, mealData);
// //       } else {
// //         await addMeal(mealData);
// //       }

// //       resetForm();
// //     } catch (error) {
// //       console.error("Error submitting meal:", error);
// //     }
// //   };

// //   const handleEdit = (meal) => {
// //     setIsAdding(true);
// //     setEditingId(meal._id);
// //     setFormData({
// //       title: meal.title || "",
// //       description: meal.description || "",
// //       calories: meal.calories || 0,
// //       protein: meal.protein || 0,
// //       carbs: meal.carbs || 0,
// //       fats: meal.fats || 0,
// //       ingredients: meal.ingredients?.join("\n") || "",
// //       recipes: meal.recipes?.join("\n") || "",
// //       isVegetarian: meal.isVegetarian || false,
// //       isVegan: meal.isVegan || false,
// //       isGlutenFree: meal.isGlutenFree || false,
// //       thumbnail: null,
// //     });
// //   };

// //   const resetForm = () => {
// //     setIsAdding(false);
// //     setEditingId(null);
// //     setFormData({
// //       title: "",
// //       description: "",
// //       calories: 0,
// //       protein: 0,
// //       carbs: 0,
// //       fats: 0,
// //       ingredients: "",
// //       recipes: "",
// //       isVegetarian: false,
// //       isVegan: false,
// //       isGlutenFree: false,
// //       thumbnail: null,
// //     });
// //   };

// //   const filteredMeals = meals.filter((meal) => {
// //     if (filter === "All") return true;
// //     if (filter === "Vegetarian") return meal.isVegetarian;
// //     if (filter === "Vegan") return meal.isVegan;
// //     if (filter === "Gluten-Free") return meal.isGlutenFree;
// //     return !meal.isVegetarian && !meal.isVegan && !meal.isGlutenFree; // "Regular"
// //   });

// //   if (!trainerId) {
// //     return (
// //       <div className="flex flex-col items-center justify-center h-64">
// //         <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
// //         <p className="text-gray-600 mb-4">
// //           You need to be logged in as a trainer to manage meals.
// //         </p>
// //         <Button 
// //           onClick={() => navigate('/trainer/login')} 
// //           className="bg-[#00A8FF] hover:bg-[#0096E6]"
// //         >
// //           Go to Login
// //         </Button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex items-center justify-between">
// //         <h1 className="text-2xl font-bold">Meal Management</h1>
// //         <Button
// //           onClick={() => {
// //             setIsAdding(true);
// //             setEditingId(null);
// //             resetForm();
// //           }}
// //           className="bg-[#00A8FF] hover:bg-[#0096E6]"
// //           disabled={loading}
// //         >
// //           <Plus className="mr-2 h-4 w-4" /> Add Meal
// //         </Button>
// //       </div>

// //       {error && (
// //         <div className="rounded-md bg-red-100 p-4 text-red-700">
// //           {error}
// //         </div>
// //       )}

// //       {isAdding && (
// //         <Card className="p-6">
// //           <div className="mb-4 flex items-center justify-between">
// //             <h2 className="text-lg font-semibold">
// //               {editingId ? "Edit Meal" : "Add New Meal"}
// //             </h2>
// //             <Button
// //               variant="ghost"
// //               size="icon"
// //               onClick={resetForm}
// //               disabled={loading}
// //             >
// //               <X className="h-4 w-4" />
// //             </Button>
// //           </div>
// //           <form onSubmit={handleSubmit} className="space-y-4">
// //             <div>
// //               <Label htmlFor="title">
// //                 Meal Name <span className="text-red-500">*</span>
// //               </Label>
// //               <Input
// //                 id="title"
// //                 name="title"
// //                 value={formData.title}
// //                 onChange={handleInputChange}
// //                 required
// //                 disabled={loading}
// //               />
// //             </div>

// //             <div>
// //               <Label htmlFor="description">
// //                 Description <span className="text-red-500">*</span>
// //               </Label>
// //               <Textarea
// //                 id="description"
// //                 name="description"
// //                 value={formData.description}
// //                 onChange={handleInputChange}
// //                 rows={3}
// //                 required
// //                 disabled={loading}
// //               />
// //             </div>

// //             <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
// //               <div>
// //                 <Label htmlFor="calories">Calories</Label>
// //                 <Input
// //                   id="calories"
// //                   name="calories"
// //                   type="number"
// //                   min="0"
// //                   value={formData.calories}
// //                   onChange={handleInputChange}
// //                   disabled={loading}
// //                 />
// //               </div>
// //               <div>
// //                 <Label htmlFor="protein">Protein (g)</Label>
// //                 <Input
// //                   id="protein"
// //                   name="protein"
// //                   type="number"
// //                   min="0"
// //                   value={formData.protein}
// //                   onChange={handleInputChange}
// //                   disabled={loading}
// //                 />
// //               </div>
// //               <div>
// //                 <Label htmlFor="carbs">Carbs (g)</Label>
// //                 <Input
// //                   id="carbs"
// //                   name="carbs"
// //                   type="number"
// //                   min="0"
// //                   value={formData.carbs}
// //                   onChange={handleInputChange}
// //                   disabled={loading}
// //                 />
// //               </div>
// //               <div>
// //                 <Label htmlFor="fats">Fats (g)</Label>
// //                 <Input
// //                   id="fats"
// //                   name="fats"
// //                   type="number"
// //                   min="0"
// //                   value={formData.fats}
// //                   onChange={handleInputChange}
// //                   disabled={loading}
// //                 />
// //               </div>
// //             </div>

// //             <div>
// //               <Label htmlFor="ingredients">Ingredients (one per line)</Label>
// //               <Textarea
// //                 id="ingredients"
// //                 name="ingredients"
// //                 value={formData.ingredients}
// //                 onChange={handleInputChange}
// //                 rows={3}
// //                 disabled={loading}
// //               />
// //             </div>

// //             <div>
// //               <Label htmlFor="recipes">Recipes (steps, one per line)</Label>
// //               <Textarea
// //                 id="recipes"
// //                 name="recipes"
// //                 value={formData.recipes}
// //                 onChange={handleInputChange}
// //                 rows={3}
// //                 disabled={loading}
// //               />
// //             </div>

// //             <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
// //               <div className="flex items-center space-x-2">
// //                 <Input
// //                   id="isVegetarian"
// //                   name="isVegetarian"
// //                   type="checkbox"
// //                   checked={formData.isVegetarian}
// //                   onChange={handleInputChange}
// //                   disabled={loading}
// //                   className="h-4 w-4"
// //                 />
// //                 <Label htmlFor="isVegetarian">Vegetarian</Label>
// //               </div>
// //               <div className="flex items-center space-x-2">
// //                 <Input
// //                   id="isVegan"
// //                   name="isVegan"
// //                   type="checkbox"
// //                   checked={formData.isVegan}
// //                   onChange={handleInputChange}
// //                   disabled={loading}
// //                   className="h-4 w-4"
// //                 />
// //                 <Label htmlFor="isVegan">Vegan</Label>
// //               </div>
// //               <div className="flex items-center space-x-2">
// //                 <Input
// //                   id="isGlutenFree"
// //                   name="isGlutenFree"
// //                   type="checkbox"
// //                   checked={formData.isGlutenFree}
// //                   onChange={handleInputChange}
// //                   disabled={loading}
// //                   className="h-4 w-4"
// //                 />
// //                 <Label htmlFor="isGlutenFree">Gluten-Free</Label>
// //               </div>
// //             </div>

// //             <div>
// //               <Label htmlFor="thumbnail">Thumbnail Image</Label>
// //               <Input
// //                 id="thumbnail"
// //                 name="thumbnail"
// //                 type="file"
// //                 accept="image/*"
// //                 onChange={handleFileChange}
// //                 disabled={loading}
// //               />
// //             </div>

// //             <div className="flex justify-end">
// //               <Button
// //                 type="submit"
// //                 className="bg-[#00A8FF] hover:bg-[#0096E6]"
// //                 disabled={loading}
// //               >
// //                 {loading ? "Processing..." : editingId ? "Update Meal" : "Add Meal"}
// //               </Button>
// //             </div>
// //           </form>
// //         </Card>
// //       )}

// //       <FilterGroup>
// //         <Filter
// //           label="Filter by Dietary Type"
// //           options={dietaryOptions}
// //           value={filter}
// //           onChange={setFilter}
// //           className="w-full max-w-xs"
// //         />
// //       </FilterGroup>

// //       {loading && !isAdding ? (
// //         <div className="flex justify-center">
// //           <p>Loading meals...</p>
// //         </div>
// //       ) : (
// //         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
// //           {filteredMeals.length > 0 ? (
// //             filteredMeals.map((meal) => (
// //               <Card key={meal._id} className="p-6">
// //                 <div className="mb-4 flex items-center">
// //                   <div className="rounded-full bg-green-100 p-2 text-green-600">
// //                     <Utensils className="h-5 w-5" />
// //                   </div>
// //                   <div className="ml-3">
// //                     <h3 className="font-semibold">{meal.title}</h3>
// //                     <div className="flex flex-wrap gap-1 mt-1">
// //                       {meal.isVegetarian && (
// //                         <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
// //                           Vegetarian
// //                         </span>
// //                       )}
// //                       {meal.isVegan && (
// //                         <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
// //                           Vegan
// //                         </span>
// //                       )}
// //                       {meal.isGlutenFree && (
// //                         <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
// //                           Gluten-Free
// //                         </span>
// //                       )}
// //                       {!meal.isVegetarian && !meal.isVegan && !meal.isGlutenFree && (
// //                         <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
// //                           Regular
// //                         </span>
// //                       )}
// //                     </div>
// //                   </div>
// //                   <div className="ml-auto flex space-x-2">
// //                     <Button
// //                       variant="ghost"
// //                       size="icon"
// //                       onClick={() => handleEdit(meal)}
// //                       disabled={loading}
// //                     >
// //                       <Edit className="h-4 w-4" />
// //                     </Button>
// //                     <Button
// //                       variant="ghost"
// //                       size="icon"
// //                       onClick={() => deleteMeal(meal._id)}
// //                       disabled={loading}
// //                     >
// //                       <Trash className="h-4 w-4" />
// //                     </Button>
// //                   </div>
// //                 </div>
                
// //                 {meal.thumbnail && (
// //                   <img
// //                     src={meal.thumbnail}
// //                     alt={meal.title}
// //                     className="mb-3 h-32 w-full object-cover rounded-md"
// //                   />
// //                 )}
                
// //                 <p className="mb-3 text-sm text-gray-600">{meal.description}</p>
                
// //                 <div className="grid grid-cols-4 gap-2 text-center text-sm mb-4">
// //                   <div className="rounded-md bg-gray-50 p-2">
// //                     <p className="font-medium">{meal.calories}</p>
// //                     <p className="text-xs text-gray-500">Calories</p>
// //                   </div>
// //                   <div className="rounded-md bg-gray-50 p-2">
// //                     <p className="font-medium">{meal.protein}g</p>
// //                     <p className="text-xs text-gray-500">Protein</p>
// //                   </div>
// //                   <div className="rounded-md bg-gray-50 p-2">
// //                     <p className="font-medium">{meal.carbs}g</p>
// //                     <p className="text-xs text-gray-500">Carbs</p>
// //                   </div>
// //                   <div className="rounded-md bg-gray-50 p-2">
// //                     <p className="font-medium">{meal.fats}g</p>
// //                     <p className="text-xs text-gray-500">Fats</p>
// //                   </div>
// //                 </div>
                
// //                 <div className="text-sm">
// //                   <p className="font-medium mb-1">Ingredients:</p>
// //                   <ul className="list-disc list-inside text-gray-600">
// //                     {meal.ingredients?.map((ingredient, index) => (
// //                       <li key={index}>{ingredient}</li>
// //                     ))}
// //                   </ul>
// //                 </div>
// //               </Card>
// //             ))
// //           ) : (
// //             <p className="col-span-full text-center text-gray-500">
// //               No meals found. Create your first meal!
// //             </p>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }





// "use client"

// import { useState, useEffect } from "react";
// import { useMealStore } from "../store/meal-store";
// import { useNavigate } from "react-router-dom";
// import { Card } from "../components/ui/card";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import { Textarea } from "../components/ui/textarea";
// import { Label } from "../components/ui/label";
// import { Filter, FilterGroup } from "../components/ui/filter";
// import { Utensils, Edit, Trash, Plus, X } from "lucide-react";

// export function MealManagement() {
//   const navigate = useNavigate();
//   const [isAdding, setIsAdding] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     calories: 0,
//     protein: 0,
//     carbs: 0,
//     fats: 0,
//     ingredients: "",
//     recipes: "",
//     isVegetarian: false,
//     isVegan: false,
//     isGlutenFree: false,
//     thumbnail: null,
//   });
//   const [filter, setFilter] = useState("All");

//   // Get trainer from localStorage
//   const trainer = localStorage.getItem("trainer") && JSON.parse(localStorage.getItem("trainer"));
//   const trainerId = trainer?._id;
//   const trainerName = trainer?.name;

//   const {
//     meals,
//     loading,
//     error,
//     fetchMeals,
//     addMeal,
//     updateMeal,
//     deleteMeal,
//   } = useMealStore();

//   const dietaryOptions = [
//     { label: "All Types", value: "All" },
//     { label: "Regular", value: "Regular" },
//     { label: "Vegetarian", value: "Vegetarian" },
//     { label: "Vegan", value: "Vegan" },
//     { label: "Gluten-Free", value: "Gluten-Free" },
//   ];

//   useEffect(() => {
//     if (trainerId) {
//       fetchMeals();
//     }
//   }, [fetchMeals, trainerId]);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     setFormData((prev) => ({ ...prev, thumbnail: e.target.files[0] }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!trainerId) {
//       console.error("No trainer ID found - user might not be logged in");
//       return;
//     }

//     try {
//       const mealData = new FormData();
      
//       // Append all required fields
//       mealData.append("title", formData.title);
//       mealData.append("description", formData.description);
//       mealData.append("calories", formData.calories.toString());
//       mealData.append("protein", formData.protein.toString());
//       mealData.append("carbs", formData.carbs.toString());
//       mealData.append("fats", formData.fats.toString());
//       mealData.append("ingredients", formData.ingredients);
//       mealData.append("recipes", formData.recipes);
//       mealData.append("isVegetarian", formData.isVegetarian.toString());
//       mealData.append("isVegan", formData.isVegan.toString());
//       mealData.append("isGlutenFree", formData.isGlutenFree.toString());
//       mealData.append("trainer", trainerId);
//       mealData.append("trainerName", trainerName);
      
//       // Append thumbnail if exists
//       if (formData.thumbnail) {
//         mealData.append("thumbnail", formData.thumbnail);
//       }

//       if (editingId) {
//         await updateMeal(editingId, mealData);
//       } else {
//         await addMeal(mealData);
//       }

//       resetForm();
//     } catch (error) {
//       console.error("Error submitting meal:", error);
//     }
//   };

//   const handleEdit = (meal) => {
//     setIsAdding(true);
//     setEditingId(meal._id);
//     setFormData({
//       title: meal.title || "",
//       description: meal.description || "",
//       calories: meal.calories || 0,
//       protein: meal.protein || 0,
//       carbs: meal.carbs || 0,
//       fats: meal.fats || 0,
//       ingredients: meal.ingredients?.join("\n") || "",
//       recipes: meal.recipes?.join("\n") || "",
//       isVegetarian: meal.isVegetarian || false,
//       isVegan: meal.isVegan || false,
//       isGlutenFree: meal.isGlutenFree || false,
//       thumbnail: null,
//     });
//   };

//   const resetForm = () => {
//     setIsAdding(false);
//     setEditingId(null);
//     setFormData({
//       title: "",
//       description: "",
//       calories: 0,
//       protein: 0,
//       carbs: 0,
//       fats: 0,
//       ingredients: "",
//       recipes: "",
//       isVegetarian: false,
//       isVegan: false,
//       isGlutenFree: false,
//       thumbnail: null,
//     });
//   };

//   const filteredMeals = meals.filter((meal) => {
//     if (filter === "All") return true;
//     if (filter === "Vegetarian") return meal.isVegetarian;
//     if (filter === "Vegan") return meal.isVegan;
//     if (filter === "Gluten-Free") return meal.isGlutenFree;
//     return !meal.isVegetarian && !meal.isVegan && !meal.isGlutenFree; // "Regular"
//   });

//   if (!trainerId) {
//     return (
//       <div className="flex flex-col items-center justify-center h-64">
//         <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
//         <p className="text-gray-600 mb-4">
//           You need to be logged in as a trainer to manage meals.
//         </p>
//         <Button 
//           onClick={() => navigate('/trainer/login')} 
//           className="bg-[#00A8FF] hover:bg-[#0096E6]"
//         >
//           Go to Login
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">Meal Management</h1>
//         <Button
//           onClick={() => {
//             setIsAdding(true);
//             setEditingId(null);
//             resetForm();
//           }}
//           className="bg-[#00A8FF] hover:bg-[#0096E6]"
//           disabled={loading}
//         >
//           <Plus className="mr-2 h-4 w-4" /> Add Meal
//         </Button>
//       </div>

//       {error && (
//         <div className="rounded-md bg-red-100 p-4 text-red-700">
//           {error}
//         </div>
//       )}

//       {isAdding && (
//         <Card className="p-6">
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="text-lg font-semibold">
//               {editingId ? "Edit Meal" : "Add New Meal"}
//             </h2>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={resetForm}
//               disabled={loading}
//             >
//               <X className="h-4 w-4" />
//             </Button>
//           </div>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <Label htmlFor="title">
//                 Meal Name <span className="text-red-500">*</span>
//               </Label>
//               <Input
//                 id="title"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleInputChange}
//                 required
//                 disabled={loading}
//               />
//             </div>

//             <div>
//               <Label htmlFor="description">
//                 Description <span className="text-red-500">*</span>
//               </Label>
//               <Textarea
//                 id="description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 rows={3}
//                 required
//                 disabled={loading}
//               />
//             </div>

//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
//               <div>
//                 <Label htmlFor="calories">Calories</Label>
//                 <Input
//                   id="calories"
//                   name="calories"
//                   type="number"
//                   min="0"
//                   value={formData.calories}
//                   onChange={handleInputChange}
//                   disabled={loading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="protein">Protein (g)</Label>
//                 <Input
//                   id="protein"
//                   name="protein"
//                   type="number"
//                   min="0"
//                   value={formData.protein}
//                   onChange={handleInputChange}
//                   disabled={loading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="carbs">Carbs (g)</Label>
//                 <Input
//                   id="carbs"
//                   name="carbs"
//                   type="number"
//                   min="0"
//                   value={formData.carbs}
//                   onChange={handleInputChange}
//                   disabled={loading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="fats">Fats (g)</Label>
//                 <Input
//                   id="fats"
//                   name="fats"
//                   type="number"
//                   min="0"
//                   value={formData.fats}
//                   onChange={handleInputChange}
//                   disabled={loading}
//                 />
//               </div>
//             </div>

//             <div>
//               <Label htmlFor="ingredients">Ingredients (one per line)</Label>
//               <Textarea
//                 id="ingredients"
//                 name="ingredients"
//                 value={formData.ingredients}
//                 onChange={handleInputChange}
//                 rows={3}
//                 disabled={loading}
//               />
//             </div>

//             <div>
//               <Label htmlFor="recipes">Recipes (steps, one per line)</Label>
//               <Textarea
//                 id="recipes"
//                 name="recipes"
//                 value={formData.recipes}
//                 onChange={handleInputChange}
//                 rows={3}
//                 disabled={loading}
//               />
//             </div>

//             <div className="space-x-4">
//               <Label className="mr-2">Dietary Preferences:</Label>
//               <div className="space-x-4">
//                 <Button
//                   onClick={() => setFormData((prev) => ({ ...prev, isVegetarian: !prev.isVegetarian }))}
//                   variant={formData.isVegetarian ? "default" : "ghost"}
//                   disabled={loading}
//                 >
//                   Vegetarian
//                 </Button>
//                 <Button
//                   onClick={() => setFormData((prev) => ({ ...prev, isVegan: !prev.isVegan }))}
//                   variant={formData.isVegan ? "default" : "ghost"}
//                   disabled={loading}
//                 >
//                   Vegan
//                 </Button>
//                 <Button
//                   onClick={() => setFormData((prev) => ({ ...prev, isGlutenFree: !prev.isGlutenFree }))}
//                   variant={formData.isGlutenFree ? "default" : "ghost"}
//                   disabled={loading}
//                 >
//                   Gluten-Free
//                 </Button>
//               </div>
//             </div>

//             <div>
//               <Label htmlFor="thumbnail">Meal Thumbnail</Label>
//               <Input
//                 type="file"
//                 id="thumbnail"
//                 name="thumbnail"
//                 onChange={handleFileChange}
//                 disabled={loading}
//               />
//             </div>

//             <Button
//               type="submit"
//               className="mt-4 w-full bg-[#00A8FF] hover:bg-[#0096E6]"
//               disabled={loading}
//             >
//               {loading ? "Saving..." : editingId ? "Update Meal" : "Add Meal"}
//             </Button>
//           </form>
//         </Card>
//       )}

//       {/* Filter and Meals */}
//       <FilterGroup
//         selectedValue={filter}
//         onChange={(value) => setFilter(value)}
//         options={dietaryOptions}
//       />

//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//         {filteredMeals.map((meal) => (
//           <Card key={meal._id} className="p-4">
//             <div className="flex justify-between">
//               <h3 className="font-semibold">{meal.title}</h3>
//               <div>
//                 <Button
//                   onClick={() => handleEdit(meal)}
//                   variant="ghost"
//                   size="icon"
//                   className="mr-2"
//                   disabled={loading}
//                 >
//                   <Edit className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   onClick={() => deleteMeal(meal._id)}
//                   variant="ghost"
//                   size="icon"
//                   disabled={loading}
//                 >
//                   <Trash className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//             <p className="text-sm">{meal.description}</p>
//             <div className="flex items-center mt-2">
//               <Utensils className="h-4 w-4 mr-1" />
//               <span>{meal.calories} kcal</span>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }





// "use client"

// import { useState, useEffect } from "react";
// import { useMealStore } from "../store/meal-store";
// import { useNavigate } from "react-router-dom";
// import { Card } from "../components/ui/card";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import { Textarea } from "../components/ui/textarea";
// import { Label } from "../components/ui/label";
// import { Filter, FilterGroup } from "../components/ui/filter";
// import { Utensils, Edit, Trash, Plus, X } from "lucide-react";

// export function MealManagement() {
//   const navigate = useNavigate();
//   const [isAdding, setIsAdding] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     calories: 0,
//     protein: 0,
//     carbs: 0,
//     fats: 0,
//     ingredients: "",
//     recipes: "",
//     isVegetarian: false,
//     isVegan: false,
//     isGlutenFree: false,
//     thumbnail: null,
//   });
//   const [filter, setFilter] = useState("All");

//   // Get trainer from localStorage
//   const trainer = localStorage.getItem("trainer") && JSON.parse(localStorage.getItem("trainer"));
//   const trainerId = trainer?._id;
//   const trainerName = trainer?.name;

//   const {
//     meals,
//     loading,
//     error,
//     fetchMeals,
//     addMeal,
//     updateMeal,
//     deleteMeal,
//   } = useMealStore();

//   const dietaryOptions = [
//     { label: "All Types", value: "All" },
//     { label: "Regular", value: "Regular" },
//     { label: "Vegetarian", value: "Vegetarian" },
//     { label: "Vegan", value: "Vegan" },
//     { label: "Gluten-Free", value: "Gluten-Free" },
//   ];

//   useEffect(() => {
//     if (trainerId) {
//       fetchMeals();
//     }
//   }, [fetchMeals, trainerId]);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     setFormData((prev) => ({ ...prev, thumbnail: e.target.files[0] }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!trainerId) {
//       console.error("No trainer ID found - user might not be logged in");
//       return;
//     }

//     try {
//       const mealData = new FormData();
      
//       // Append all required fields
//       mealData.append("title", formData.title);
//       mealData.append("description", formData.description);
//       mealData.append("calories", formData.calories.toString());
//       mealData.append("protein", formData.protein.toString());
//       mealData.append("carbs", formData.carbs.toString());
//       mealData.append("fats", formData.fats.toString());
//       mealData.append("ingredients", formData.ingredients);
//       mealData.append("recipes", formData.recipes);
//       mealData.append("isVegetarian", formData.isVegetarian.toString());
//       mealData.append("isVegan", formData.isVegan.toString());
//       mealData.append("isGlutenFree", formData.isGlutenFree.toString());
//       mealData.append("trainer", trainerId);
//       mealData.append("trainerName", trainerName);
      
//       // Append thumbnail if exists
//       if (formData.thumbnail) {
//         mealData.append("thumbnail", formData.thumbnail);
//       }

//       if (editingId) {
//         await updateMeal(editingId, mealData);
//       } else {
//         await addMeal(mealData);
//       }

//       resetForm();
//     } catch (error) {
//       console.error("Error submitting meal:", error);
//     }
//   };

//   const handleEdit = (meal) => {
//     setIsAdding(true);
//     setEditingId(meal._id);
//     setFormData({
//       title: meal.title || "",
//       description: meal.description || "",
//       calories: meal.calories || 0,
//       protein: meal.protein || 0,
//       carbs: meal.carbs || 0,
//       fats: meal.fats || 0,
//       ingredients: meal.ingredients?.join("\n") || "",
//       recipes: meal.recipes?.join("\n") || "",
//       isVegetarian: meal.isVegetarian || false,
//       isVegan: meal.isVegan || false,
//       isGlutenFree: meal.isGlutenFree || false,
//       thumbnail: null,
//     });
//   };

//   const resetForm = () => {
//     setIsAdding(false);
//     setEditingId(null);
//     setFormData({
//       title: "",
//       description: "",
//       calories: 0,
//       protein: 0,
//       carbs: 0,
//       fats: 0,
//       ingredients: "",
//       recipes: "",
//       isVegetarian: false,
//       isVegan: false,
//       isGlutenFree: false,
//       thumbnail: null,
//     });
//   };

//   const filteredMeals = meals.filter((meal) => {
//     if (filter === "All") return true;
//     if (filter === "Vegetarian") return meal.isVegetarian;
//     if (filter === "Vegan") return meal.isVegan;
//     if (filter === "Gluten-Free") return meal.isGlutenFree;
//     return !meal.isVegetarian && !meal.isVegan && !meal.isGlutenFree; // "Regular"
//   });

//   if (!trainerId) {
//     return (
//       <div className="flex flex-col items-center justify-center h-64">
//         <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
//         <p className="text-gray-600 mb-4">
//           You need to be logged in as a trainer to manage meals.
//         </p>
//         <Button 
//           onClick={() => navigate('/trainer/login')} 
//           className="bg-[#00A8FF] hover:bg-[#0096E6]"
//         >
//           Go to Login
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">Meal Management</h1>
//         <Button
//           onClick={() => {
//             console.log('Adding meal...');
//             setIsAdding(true);
//             setEditingId(null);
//             resetForm();
//           }}
//           className="bg-[#00A8FF] hover:bg-[#0096E6]"
//           disabled={loading}
//         >
//           <Plus className="mr-2 h-4 w-4" /> Add Meal
//         </Button>
//       </div>

//       {error && (
//         <div className="rounded-md bg-red-100 p-4 text-red-700">
//           {error}
//         </div>
//       )}

//       {isAdding && (
//         <Card className="p-6">
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="text-lg font-semibold">
//               {editingId ? "Edit Meal" : "Add New Meal"}
//             </h2>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={resetForm}
//               disabled={loading}
//             >
//               <X className="h-4 w-4" />
//             </Button>
//           </div>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <Label htmlFor="title">
//                 Meal Name <span className="text-red-500">*</span>
//               </Label>
//               <Input
//                 id="title"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleInputChange}
//                 required
//                 disabled={loading}
//               />
//             </div>

//             <div>
//               <Label htmlFor="description">
//                 Description <span className="text-red-500">*</span>
//               </Label>
//               <Textarea
//                 id="description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 rows={3}
//                 required
//                 disabled={loading}
//               />
//             </div>

//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
//               <div>
//                 <Label htmlFor="calories">Calories</Label>
//                 <Input
//                   id="calories"
//                   name="calories"
//                   type="number"
//                   min="0"
//                   value={formData.calories}
//                   onChange={handleInputChange}
//                   disabled={loading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="protein">Protein (g)</Label>
//                 <Input
//                   id="protein"
//                   name="protein"
//                   type="number"
//                   min="0"
//                   value={formData.protein}
//                   onChange={handleInputChange}
//                   disabled={loading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="carbs">Carbs (g)</Label>
//                 <Input
//                   id="carbs"
//                   name="carbs"
//                   type="number"
//                   min="0"
//                   value={formData.carbs}
//                   onChange={handleInputChange}
//                   disabled={loading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="fats">Fats (g)</Label>
//                 <Input
//                   id="fats"
//                   name="fats"
//                   type="number"
//                   min="0"
//                   value={formData.fats}
//                   onChange={handleInputChange}
//                   disabled={loading}
//                 />
//               </div>
//             </div>

//             <div>
//               <Label htmlFor="ingredients">Ingredients (one per line)</Label>
//               <Textarea
//                 id="ingredients"
//                 name="ingredients"
//                 value={formData.ingredients}
//                 onChange={handleInputChange}
//                 rows={3}
//                 disabled={loading}
//               />
//             </div>

//             <div>
//               <Label htmlFor="recipes">Recipes (steps, one per line)</Label>
//               <Textarea
//                 id="recipes"
//                 name="recipes"
//                 value={formData.recipes}
//                 onChange={handleInputChange}
//                 rows={3}
//                 disabled={loading}
//               />
//             </div>

//             <div className="space-x-4">
//               <Label className="mr-2">Dietary Preferences:</Label>
//               <div className="space-x-4">
//                 <Button
//                   onClick={() => setFormData((prev) => ({ ...prev, isVegetarian: !prev.isVegetarian }))}
//                   variant={formData.isVegetarian ? "default" : "ghost"}
//                   disabled={loading}
//                 >
//                   Vegetarian
//                 </Button>
//                 <Button
//                   onClick={() => setFormData((prev) => ({ ...prev, isVegan: !prev.isVegan }))}
//                   variant={formData.isVegan ? "default" : "ghost"}
//                   disabled={loading}
//                 >
//                   Vegan
//                 </Button>
//                 <Button
//                   onClick={() => setFormData((prev) => ({ ...prev, isGlutenFree: !prev.isGlutenFree }))}
//                   variant={formData.isGlutenFree ? "default" : "ghost"}
//                   disabled={loading}
//                 >
//                   Gluten-Free
//                 </Button>
//               </div>
//             </div>

//             <div>
//               <Label htmlFor="thumbnail">Meal Thumbnail</Label>
//               <Input
//                 type="file"
//                 id="thumbnail"
//                 name="thumbnail"
//                 onChange={handleFileChange}
//                 disabled={loading}
//               />
//             </div>

//             <Button
//               type="submit"
//               className="mt-4 w-full bg-[#00A8FF] hover:bg-[#0096E6]"
//               disabled={loading}
//             >
//               {loading ? "Saving..." : editingId ? "Update Meal" : "Add Meal"}
//             </Button>
//           </form>
//         </Card>
//       )}

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {filteredMeals.map((meal) => (
//           <Card key={meal._id} className="relative p-4 shadow-sm">
//             <div className="absolute top-4 right-4 space-x-2">
//               <Button
//                 onClick={() => handleEdit(meal)}
//                 variant="ghost"
//                 disabled={loading}
//               >
//                 <Edit className="h-4 w-4" />
//               </Button>
//               <Button
//                 onClick={() => deleteMeal(meal._id)}
//                 variant="ghost"
//                 disabled={loading}
//               >
//                 <Trash className="h-4 w-4" />
//               </Button>
//             </div>
//             <h3 className="text-xl font-semibold">{meal.title}</h3>
//             <p className="text-sm text-gray-600">{meal.description}</p>
//             <div className="mt-2 flex justify-between">
//               <p className="text-sm">{meal.calories} Calories</p>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }







// export function MealManagement() {
//   const navigate = useNavigate();
//   const [isAdding, setIsAdding] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     calories: 0,
//     protein: 0,
//     carbs: 0,
//     fats: 0,
//     thumbnail: null,
//     recipes: [],
//     ingredients: [],
//     isVegetarian: false,
//     isVegan: false,
//     isGlutenFree: false,
//   });

//   const trainer = localStorage.getItem("trainer") && JSON.parse(localStorage.getItem("trainer"));
//   const trainerId = trainer?._id;

//   const {
//     meals,
//     loading: mealLoading,
//     error,
//     fetchMeals,
//     addMeal,
//     updateMeal,
//     deleteMeal,
//   } = useMealStore();

//   useEffect(() => {
//     if (trainerId) {
//       fetchMeals();
//     }
//   }, [fetchMeals, trainerId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: checked }));
//   };

//   const handleFileChange = (e, field) => {
//     setFormData((prev) => ({ ...prev, [field]: e.target.files[0] }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!trainerId) {
//       console.error("No trainer ID found - user might not be logged in");
//       return;
//     }

//     try {
//       const mealData = new FormData();

//       mealData.append("title", formData.title);
//       mealData.append("description", formData.description);
//       mealData.append("calories", formData.calories.toString());
//       mealData.append("protein", formData.protein.toString());
//       mealData.append("carbs", formData.carbs.toString());
//       mealData.append("fats", formData.fats.toString());
//       mealData.append("trainer", trainerId);
//       mealData.append("trainerName", trainer?.name || "");

//       if (formData.recipes.length) mealData.append("recipes", JSON.stringify(formData.recipes));
//       if (formData.ingredients.length) mealData.append("ingredients", JSON.stringify(formData.ingredients));

//       mealData.append("isVegetarian", formData.isVegetarian);
//       mealData.append("isVegan", formData.isVegan);
//       mealData.append("isGlutenFree", formData.isGlutenFree);

//       if (formData.thumbnail) mealData.append("thumbnail", formData.thumbnail);

//       if (editingId) {
//         await updateMeal(editingId, mealData);
//       } else {
//         await addMeal(mealData);
//       }

//       resetForm();
//     } catch (error) {
//       console.error("Error submitting meal:", error);
//     }
//   };

//   const handleEdit = (meal) => {
//     setIsAdding(true);
//     setEditingId(meal._id);
//     setFormData({
//       title: meal.title || "",
//       description: meal.description || "",
//       calories: meal.calories || 0,
//       protein: meal.protein || 0,
//       carbs: meal.carbs || 0,
//       fats: meal.fats || 0,
//       thumbnail: null,
//       recipes: meal.recipes || [],
//       ingredients: meal.ingredients || [],
//       isVegetarian: meal.isVegetarian || false,
//       isVegan: meal.isVegan || false,
//       isGlutenFree: meal.isGlutenFree || false,
//     });
//   };

//   const resetForm = () => {
//     setIsAdding(false);
//     setEditingId(null);
//     setFormData({
//       title: "",
//       description: "",
//       calories: 0,
//       protein: 0,
//       carbs: 0,
//       fats: 0,
//       thumbnail: null,
//       recipes: [],
//       ingredients: [],
//       isVegetarian: false,
//       isVegan: false,
//       isGlutenFree: false,
//     });
//   };

//   if (!trainerId) {
//     return (
//       <div className="flex flex-col items-center justify-center h-64">
//         <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
//         <p className="text-gray-600 mb-4">
//           You need to be logged in as a trainer to manage meals.
//         </p>
//         <Button
//           onClick={() => navigate("/trainer/login")}
//           className="bg-[#00A8FF] hover:bg-[#0096E6]"
//         >
//           Go to Login
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">Meal Management</h1>
//         <Button
//           onClick={() => {
//             setIsAdding(true);
//             setEditingId(null);
//             setFormData({
//               title: "",
//               description: "",
//               calories: 0,
//               protein: 0,
//               carbs: 0,
//               fats: 0,
//               thumbnail: null,
//               recipes: [],
//               ingredients: [],
//               isVegetarian: false,
//               isVegan: false,
//               isGlutenFree: false,
//             });
//           }}
//           className="bg-[#00A8FF] hover:bg-[#0096E6]"
//           disabled={mealLoading}
//         >
//           <Plus className="mr-2 h-4 w-4" /> Add Meal
//         </Button>
//       </div>

//       {error && (
//         <div className="rounded-md bg-red-100 p-4 text-red-700">
//           {error}
//         </div>
//       )}

//       {isAdding && (
//         <Card className="p-6">
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="text-lg font-semibold">
//               {editingId ? "Edit Meal" : "Add New Meal"}
//             </h2>
//             <Button variant="ghost" size="icon" onClick={resetForm} disabled={mealLoading}>
//               <X className="h-4 w-4" />
//             </Button>
//           </div>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
//               <Input
//                 id="title"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleInputChange}
//                 required
//                 disabled={mealLoading}
//               />
//             </div>
//             <div>
//               <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
//               <Textarea
//                 id="description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 rows={3}
//                 required
//                 disabled={mealLoading}
//               />
//             </div>

//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <div>
//                 <Label htmlFor="calories">Calories</Label>
//                 <Input
//                   id="calories"
//                   name="calories"
//                   type="number"
//                   value={formData.calories}
//                   onChange={handleInputChange}
//                   required
//                   disabled={mealLoading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="protein">Protein (grams)</Label>
//                 <Input
//                   id="protein"
//                   name="protein"
//                   type="number"
//                   value={formData.protein}
//                   onChange={handleInputChange}
//                   required
//                   disabled={mealLoading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="carbs">Carbs (grams)</Label>
//                 <Input
//                   id="carbs"
//                   name="carbs"
//                   type="number"
//                   value={formData.carbs}
//                   onChange={handleInputChange}
//                   required
//                   disabled={mealLoading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="fats">Fats (grams)</Label>
//                 <Input
//                   id="fats"
//                   name="fats"
//                   type="number"
//                   value={formData.fats}
//                   onChange={handleInputChange}
//                   required
//                   disabled={mealLoading}
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <div>
//                 <Label htmlFor="isVegetarian">Vegetarian</Label>
//                 <Input
//                   id="isVegetarian"
//                   name="isVegetarian"
//                   type="checkbox"
//                   checked={formData.isVegetarian}
//                   onChange={handleCheckboxChange}
//                   disabled={mealLoading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="isVegan">Vegan</Label>
//                 <Input
//                   id="isVegan"
//                   name="isVegan"
//                   type="checkbox"
//                   checked={formData.isVegan}
//                   onChange={handleCheckboxChange}
//                   disabled={mealLoading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="isGlutenFree">Gluten-Free</Label>
//                 <Input
//                   id="isGlutenFree"
//                   name="isGlutenFree"
//                   type="checkbox"
//                   checked={formData.isGlutenFree}
//                   onChange={handleCheckboxChange}
//                   disabled={mealLoading}
//                 />
//               </div>
//             </div>

//             <div>
//               <Label htmlFor="thumbnail">Thumbnail Image</Label>
//               <Input
//                 id="thumbnail"
//                 name="thumbnail"
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => handleFileChange(e, "thumbnail")}
//                 disabled={mealLoading}
//               />
//             </div>

//             <Button
//               type="submit"
//               className="w-full bg-[#00A8FF] hover:bg-[#0096E6]"
//               disabled={mealLoading}
//             >
//               {editingId ? "Update Meal" : "Add Meal"}
//             </Button>
//           </form>
//         </Card>
//       )}

//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//         {meals.map((meal) => (
//           <Card key={meal._id} className="relative p-4">
//             <div className="absolute top-0 right-0 space-x-2">
//               <Button variant="ghost" onClick={() => handleEdit(meal)}>
//                 <Edit className="h-4 w-4" />
//               </Button>
//               <Button variant="ghost" onClick={() => deleteMeal(meal._id)}>
//                 <Trash className="h-4 w-4" />
//               </Button>
//             </div>
//             <img src={meal.thumbnail} alt={meal.title} className="w-full h-40 object-cover" />
//             <div className="mt-4">
//               <h3 className="font-semibold">{meal.title}</h3>
//               <p className="text-sm text-gray-500">{meal.description}</p>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }




// export function MealManagement() {
//   const navigate = useNavigate()
//   const [isAdding, setIsAdding] = useState(false)
//   const [editingId, setEditingId] = useState(null)
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     calories: 0,
//     protein: 0,
//     carbs: 0,
//     fats: 0,
//     thumbnail: null,
//     recipes: [],
//     ingredients: [],
//     isVegetarian: false,
//     isVegan: false,
//     isGlutenFree: false,
//   })

//   const [newIngredient, setNewIngredient] = useState("")
//   const [newRecipe, setNewRecipe] = useState("")

//   const trainer = localStorage.getItem("trainer") && JSON.parse(localStorage.getItem("trainer"))
//   const trainerId = trainer?._id

//   const { meals, loading: mealLoading, error, fetchMeals, addMeal, updateMeal, deleteMeal } = useMealStore()

//   useEffect(() => {
//     if (trainerId) {
//       fetchMeals()
//     }
//   }, [fetchMeals, trainerId])

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target
//     setFormData((prev) => ({ ...prev, [name]: checked }))
//   }

//   const handleFileChange = (e, field) => {
//     setFormData((prev) => ({ ...prev, [field]: e.target.files[0] }))
//   }

//   const handleAddIngredient = () => {
//     if (newIngredient.trim()) {
//       setFormData((prev) => ({
//         ...prev,
//         ingredients: [...prev.ingredients, newIngredient.trim()],
//       }))
//       setNewIngredient("")
//     }
//   }

//   const handleRemoveIngredient = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       ingredients: prev.ingredients.filter((_, i) => i !== index),
//     }))
//   }

//   const handleAddRecipe = () => {
//     if (newRecipe.trim()) {
//       setFormData((prev) => ({
//         ...prev,
//         recipes: [...prev.recipes, newRecipe.trim()],
//       }))
//       setNewRecipe("")
//     }
//   }

//   const handleRemoveRecipe = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       recipes: prev.recipes.filter((_, i) => i !== index),
//     }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!trainerId) {
//       console.error("No trainer ID found - user might not be logged in")
//       return
//     }

//     try {
//       const mealData = new FormData()

//       mealData.append("title", formData.title)
//       mealData.append("description", formData.description)
//       mealData.append("calories", formData.calories.toString())
//       mealData.append("protein", formData.protein.toString())
//       mealData.append("carbs", formData.carbs.toString())
//       mealData.append("fats", formData.fats.toString())
//       mealData.append("trainer", trainerId)
//       mealData.append("trainerName", trainer?.name || "")

//       if (formData.recipes.length) mealData.append("recipes", JSON.stringify(formData.recipes))
//       if (formData.ingredients.length) mealData.append("ingredients", JSON.stringify(formData.ingredients))

//       mealData.append("isVegetarian", formData.isVegetarian)
//       mealData.append("isVegan", formData.isVegan)
//       mealData.append("isGlutenFree", formData.isGlutenFree)

//       if (formData.thumbnail) mealData.append("thumbnail", formData.thumbnail)

//       if (editingId) {
//         await updateMeal(editingId, mealData)
//       } else {
//         await addMeal(mealData)
//       }

//       resetForm()
//     } catch (error) {
//       console.error("Error submitting meal:", error)
//     }
//   }

//   const handleEdit = (meal) => {
//     setIsAdding(true)
//     setEditingId(meal._id)
//     setFormData({
//       title: meal.title || "",
//       description: meal.description || "",
//       calories: meal.calories || 0,
//       protein: meal.protein || 0,
//       carbs: meal.carbs || 0,
//       fats: meal.fats || 0,
//       thumbnail: null,
//       recipes: meal.recipes || [],
//       ingredients: meal.ingredients || [],
//       isVegetarian: meal.isVegetarian || false,
//       isVegan: meal.isVegan || false,
//       isGlutenFree: meal.isGlutenFree || false,
//     })
//   }

//   const resetForm = () => {
//     setIsAdding(false)
//     setEditingId(null)
//     setFormData({
//       title: "",
//       description: "",
//       calories: 0,
//       protein: 0,
//       carbs: 0,
//       fats: 0,
//       thumbnail: null,
//       recipes: [],
//       ingredients: [],
//       isVegetarian: false,
//       isVegan: false,
//       isGlutenFree: false,
//     })
//   }

//   if (!trainerId) {
//     return (
//       <div className="flex flex-col items-center justify-center h-64">
//         <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
//         <p className="text-gray-600 mb-4">You need to be logged in as a trainer to manage meals.</p>
//         <Button onClick={() => navigate("/trainer/login")} className="bg-[#00A8FF] hover:bg-[#0096E6]">
//           Go to Login
//         </Button>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">Meal Management</h1>
//         <Button
//           onClick={() => {
//             setIsAdding(true)
//             setEditingId(null)
//             setFormData({
//               title: "",
//               description: "",
//               calories: 0,
//               protein: 0,
//               carbs: 0,
//               fats: 0,
//               thumbnail: null,
//               recipes: [],
//               ingredients: [],
//               isVegetarian: false,
//               isVegan: false,
//               isGlutenFree: false,
//             })
//           }}
//           className="bg-[#00A8FF] hover:bg-[#0096E6]"
//           disabled={mealLoading}
//         >
//           <Plus className="mr-2 h-4 w-4" /> Add Meal
//         </Button>
//       </div>

//       {error && <div className="rounded-md bg-red-100 p-4 text-red-700">{error}</div>}

//       {isAdding && (
//         <Card className="p-6">
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="text-lg font-semibold">{editingId ? "Edit Meal" : "Add New Meal"}</h2>
//             <Button variant="ghost" size="icon" onClick={resetForm} disabled={mealLoading}>
//               <X className="h-4 w-4" />
//             </Button>
//           </div>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <Label htmlFor="title">
//                 Title <span className="text-red-500">*</span>
//               </Label>
//               <Input
//                 id="title"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleInputChange}
//                 required
//                 disabled={mealLoading}
//               />
//             </div>
//             <div>
//               <Label htmlFor="description">
//                 Description <span className="text-red-500">*</span>
//               </Label>
//               <Textarea
//                 id="description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 rows={3}
//                 required
//                 disabled={mealLoading}
//               />
//             </div>

//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <div>
//                 <Label htmlFor="calories">Calories</Label>
//                 <Input
//                   id="calories"
//                   name="calories"
//                   type="number"
//                   value={formData.calories}
//                   onChange={handleInputChange}
//                   required
//                   disabled={mealLoading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="protein">Protein (grams)</Label>
//                 <Input
//                   id="protein"
//                   name="protein"
//                   type="number"
//                   value={formData.protein}
//                   onChange={handleInputChange}
//                   required
//                   disabled={mealLoading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="carbs">Carbs (grams)</Label>
//                 <Input
//                   id="carbs"
//                   name="carbs"
//                   type="number"
//                   value={formData.carbs}
//                   onChange={handleInputChange}
//                   required
//                   disabled={mealLoading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="fats">Fats (grams)</Label>
//                 <Input
//                   id="fats"
//                   name="fats"
//                   type="number"
//                   value={formData.fats}
//                   onChange={handleInputChange}
//                   required
//                   disabled={mealLoading}
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <div>
//                 <Label htmlFor="isVegetarian">Vegetarian</Label>
//                 <Input
//                   id="isVegetarian"
//                   name="isVegetarian"
//                   type="checkbox"
//                   checked={formData.isVegetarian}
//                   onChange={handleCheckboxChange}
//                   disabled={mealLoading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="isVegan">Vegan</Label>
//                 <Input
//                   id="isVegan"
//                   name="isVegan"
//                   type="checkbox"
//                   checked={formData.isVegan}
//                   onChange={handleCheckboxChange}
//                   disabled={mealLoading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="isGlutenFree">Gluten-Free</Label>
//                 <Input
//                   id="isGlutenFree"
//                   name="isGlutenFree"
//                   type="checkbox"
//                   checked={formData.isGlutenFree}
//                   onChange={handleCheckboxChange}
//                   disabled={mealLoading}
//                 />
//               </div>
//             </div>

//             <div>
//               <Label htmlFor="thumbnail">Thumbnail Image</Label>
//               <Input
//                 id="thumbnail"
//                 name="thumbnail"
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => handleFileChange(e, "thumbnail")}
//                 disabled={mealLoading}
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="ingredients">Ingredients</Label>
//               <div className="flex space-x-2">
//                 <Input
//                   id="ingredients"
//                   value={newIngredient}
//                   onChange={(e) => setNewIngredient(e.target.value)}
//                   placeholder="Add an ingredient"
//                   disabled={mealLoading}
//                 />
//                 <Button type="button" onClick={handleAddIngredient} disabled={mealLoading || !newIngredient.trim()}>
//                   <Plus className="h-4 w-4" />
//                 </Button>
//               </div>
//               {formData.ingredients.length > 0 && (
//                 <div className="mt-2 p-3 border rounded-md bg-gray-50">
//                   <h4 className="font-medium mb-2">Ingredient List:</h4>
//                   <ul className="list-disc pl-5 space-y-1">
//                     {formData.ingredients.map((ingredient, index) => (
//                       <li key={index} className="flex items-center justify-between">
//                         <span>{ingredient}</span>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => handleRemoveIngredient(index)}
//                           disabled={mealLoading}
//                         >
//                           <X className="h-3 w-3" />
//                         </Button>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="recipes">Recipes</Label>
//               <div className="flex space-x-2">
//                 <Textarea
//                   id="recipes"
//                   value={newRecipe}
//                   onChange={(e) => setNewRecipe(e.target.value)}
//                   placeholder="Add a recipe step"
//                   rows={2}
//                   disabled={mealLoading}
//                 />
//                 <Button
//                   type="button"
//                   onClick={handleAddRecipe}
//                   className="h-auto"
//                   disabled={mealLoading || !newRecipe.trim()}
//                 >
//                   <Plus className="h-4 w-4" />
//                 </Button>
//               </div>
//               {formData.recipes.length > 0 && (
//                 <div className="mt-2 p-3 border rounded-md bg-gray-50">
//                   <h4 className="font-medium mb-2">Recipe Steps:</h4>
//                   <ol className="list-decimal pl-5 space-y-2">
//                     {formData.recipes.map((recipe, index) => (
//                       <li key={index} className="flex items-start justify-between">
//                         <span>{recipe}</span>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => handleRemoveRecipe(index)}
//                           disabled={mealLoading}
//                         >
//                           <X className="h-3 w-3" />
//                         </Button>
//                       </li>
//                     ))}
//                   </ol>
//                 </div>
//               )}
//             </div>

//             <Button type="submit" className="w-full bg-[#00A8FF] hover:bg-[#0096E6]" disabled={mealLoading}>
//               {editingId ? "Update Meal" : "Add Meal"}
//             </Button>
//           </form>
//         </Card>
//       )}

//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//         {meals.map((meal) => (
//           <Card key={meal._id} className="relative p-4">
//             <div className="absolute top-0 right-0 space-x-2">
//               <Button variant="ghost" onClick={() => handleEdit(meal)}>
//                 <Edit className="h-4 w-4" />
//               </Button>
//               <Button variant="ghost" onClick={() => deleteMeal(meal._id)}>
//                 <Trash className="h-4 w-4" />
//               </Button>
//             </div>
//             <img src={meal.thumbnail || "/placeholder.svg"} alt={meal.title} className="w-full h-40 object-cover" />
//             <div className="mt-4">
//               <h3 className="font-semibold">{meal.title}</h3>
//               <p className="text-sm text-gray-500">{meal.description}</p>
//             </div>
//             {meal.ingredients && meal.ingredients.length > 0 && (
//               <div className="mt-2">
//                 <h4 className="text-xs font-semibold text-gray-700">INGREDIENTS</h4>
//                 <ul className="text-xs text-gray-600 mt-1 list-disc pl-4">
//                   {meal.ingredients.slice(0, 3).map((ingredient, idx) => (
//                     <li key={idx}>{ingredient}</li>
//                   ))}
//                   {meal.ingredients.length > 3 && <li className="italic">+{meal.ingredients.length - 3} more</li>}
//                 </ul>
//               </div>
//             )}
//             {meal.recipes && meal.recipes.length > 0 && (
//               <div className="mt-2">
//                 <h4 className="text-xs font-semibold text-gray-700">RECIPE</h4>
//                 <p className="text-xs text-gray-600 mt-1">
//                   {meal.recipes.length} step{meal.recipes.length !== 1 ? "s" : ""}
//                 </p>
//               </div>
//             )}
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }



"use client"

import { useMealStore } from "../store/meal-store"; // Assuming you have a meal store
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Edit, Trash, Plus, X } from "lucide-react";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export function MealManagement() {
  const navigate = useNavigate()
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    thumbnail: null,
    recipes: "",
    ingredients: "",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
  })

  const trainer = localStorage.getItem("trainer") && JSON.parse(localStorage.getItem("trainer"))
  const trainerId = trainer?._id

  const { meals, loading: mealLoading, error, fetchMeals, addMeal, updateMeal, deleteMeal } = useMealStore()

  useEffect(() => {
    if (trainerId) {
      fetchMeals()
    }
  }, [fetchMeals, trainerId])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleFileChange = (e, field) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.files[0] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!trainerId) {
      console.error("No trainer ID found - user might not be logged in")
      return
    }

    try {
      const mealData = new FormData()

      mealData.append("title", formData.title)
      mealData.append("description", formData.description)
      mealData.append("calories", formData.calories.toString())
      mealData.append("protein", formData.protein.toString())
      mealData.append("carbs", formData.carbs.toString())
      mealData.append("fats", formData.fats.toString())
      mealData.append("trainer", trainerId)
      mealData.append("trainerName", trainer?.name || "")

      if (formData.ingredients) mealData.append("ingredients", formData.ingredients)
      if (formData.recipes) mealData.append("recipes", formData.recipes)

      mealData.append("isVegetarian", formData.isVegetarian)
      mealData.append("isVegan", formData.isVegan)
      mealData.append("isGlutenFree", formData.isGlutenFree)

      if (formData.thumbnail) mealData.append("thumbnail", formData.thumbnail)

      if (editingId) {
        await updateMeal(editingId, mealData)
      } else {
        await addMeal(mealData)
      }

      resetForm()
    } catch (error) {
      console.error("Error submitting meal:", error)
    }
  }

  const handleEdit = (meal) => {
    setIsAdding(true)
    setEditingId(meal._id)
    setFormData({
      title: meal.title || "",
      description: meal.description || "",
      calories: meal.calories || 0,
      protein: meal.protein || 0,
      carbs: meal.carbs || 0,
      fats: meal.fats || 0,
      thumbnail: null,
      recipes: Array.isArray(meal.recipes) ? meal.recipes.join("\n") : meal.recipes || "",
      ingredients: Array.isArray(meal.ingredients) ? meal.ingredients.join("\n") : meal.ingredients || "",
      isVegetarian: meal.isVegetarian || false,
      isVegan: meal.isVegan || false,
      isGlutenFree: meal.isGlutenFree || false,
    })
  }

  const resetForm = () => {
    setIsAdding(false)
    setEditingId(null)
    setFormData({
      title: "",
      description: "",
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
      thumbnail: null,
      recipes: "",
      ingredients: "",
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
    })
  }

  if (!trainerId) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
        <p className="text-gray-600 mb-4">You need to be logged in as a trainer to manage meals.</p>
        <Button onClick={() => navigate("/trainer/login")} className="bg-[#00A8FF] hover:bg-[#0096E6]">
          Go to Login
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Meal Management</h1>
        <Button
          onClick={() => {
            setIsAdding(true)
            setEditingId(null)
            setFormData({
              title: "",
              description: "",
              calories: 0,
              protein: 0,
              carbs: 0,
              fats: 0,
              thumbnail: null,
              recipes: "",
              ingredients: "",
              isVegetarian: false,
              isVegan: false,
              isGlutenFree: false,
            })
          }}
          className="bg-[#00A8FF] hover:bg-[#0096E6]"
          disabled={mealLoading}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Meal
        </Button>
      </div>

      {error && <div className="rounded-md bg-red-100 p-4 text-red-700">{error}</div>}

      {isAdding && (
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{editingId ? "Edit Meal" : "Add New Meal"}</h2>
            <Button variant="ghost" size="icon" onClick={resetForm} disabled={mealLoading}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                disabled={mealLoading}
              />
            </div>
            <div>
              <Label htmlFor="description">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                required
                disabled={mealLoading}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="calories">Calories</Label>
                <Input
                  id="calories"
                  name="calories"
                  type="number"
                  value={formData.calories}
                  onChange={handleInputChange}
                  required
                  disabled={mealLoading}
                />
              </div>
              <div>
                <Label htmlFor="protein">Protein (grams)</Label>
                <Input
                  id="protein"
                  name="protein"
                  type="number"
                  value={formData.protein}
                  onChange={handleInputChange}
                  required
                  disabled={mealLoading}
                />
              </div>
              <div>
                <Label htmlFor="carbs">Carbs (grams)</Label>
                <Input
                  id="carbs"
                  name="carbs"
                  type="number"
                  value={formData.carbs}
                  onChange={handleInputChange}
                  required
                  disabled={mealLoading}
                />
              </div>
              <div>
                <Label htmlFor="fats">Fats (grams)</Label>
                <Input
                  id="fats"
                  name="fats"
                  type="number"
                  value={formData.fats}
                  onChange={handleInputChange}
                  required
                  disabled={mealLoading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="isVegetarian">Vegetarian</Label>
                <Input
                  id="isVegetarian"
                  name="isVegetarian"
                  type="checkbox"
                  checked={formData.isVegetarian}
                  onChange={handleCheckboxChange}
                  disabled={mealLoading}
                />
              </div>
              <div>
                <Label htmlFor="isVegan">Vegan</Label>
                <Input
                  id="isVegan"
                  name="isVegan"
                  type="checkbox"
                  checked={formData.isVegan}
                  onChange={handleCheckboxChange}
                  disabled={mealLoading}
                />
              </div>
              <div>
                <Label htmlFor="isGlutenFree">Gluten-Free</Label>
                <Input
                  id="isGlutenFree"
                  name="isGlutenFree"
                  type="checkbox"
                  checked={formData.isGlutenFree}
                  onChange={handleCheckboxChange}
                  disabled={mealLoading}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="thumbnail">Thumbnail Image</Label>
              <Input
                id="thumbnail"
                name="thumbnail"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "thumbnail")}
                disabled={mealLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ingredients">Ingredients (Markdown)</Label>
              <Textarea
                id="ingredients"
                name="ingredients"
                value={Array.isArray(formData.ingredients) ? formData.ingredients.join("\n") : formData.ingredients}
                onChange={(e) => setFormData((prev) => ({ ...prev, ingredients: e.target.value }))}
                placeholder="Enter ingredients in markdown format"
                rows={5}
                disabled={mealLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipes">Recipes (Markdown)</Label>
              <Textarea
                id="recipes"
                name="recipes"
                value={Array.isArray(formData.recipes) ? formData.recipes.join("\n") : formData.recipes}
                onChange={(e) => setFormData((prev) => ({ ...prev, recipes: e.target.value }))}
                placeholder="Enter recipe steps in markdown format"
                rows={8}
                disabled={mealLoading}
              />
            </div>

            <Button type="submit" className="w-full bg-[#00A8FF] hover:bg-[#0096E6]" disabled={mealLoading}>
              {editingId ? "Update Meal" : "Add Meal"}
            </Button>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {meals.map((meal) => (
          <Card key={meal._id} className="relative p-4">
            <div className="absolute top-0 right-0 space-x-2">
              <Button variant="ghost" onClick={() => handleEdit(meal)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" onClick={() => deleteMeal(meal._id)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <img src={meal.thumbnail || "/placeholder.svg"} alt={meal.title} className="w-full h-40 object-cover" />
            <div className="mt-4">
              <h3 className="font-semibold">{meal.title}</h3>
              <p className="text-sm text-gray-500">{meal.description}</p>
            </div>
            {meal.ingredients && meal.ingredients.length > 0 && (
              <div className="mt-2">
                <h4 className="text-xs font-semibold text-gray-700">INGREDIENTS</h4>
                <ul className="text-xs text-gray-600 mt-1 list-disc pl-4">
                  {meal.ingredients.slice(0, 3).map((ingredient, idx) => (
                    <li key={idx}>{ingredient}</li>
                  ))}
                  {meal.ingredients.length > 3 && <li className="italic">+{meal.ingredients.length - 3} more</li>}
                </ul>
              </div>
            )}
            {meal.recipes && meal.recipes.length > 0 && (
              <div className="mt-2">
                <h4 className="text-xs font-semibold text-gray-700">RECIPE</h4>
                <p className="text-xs text-gray-600 mt-1">
                  {meal.recipes.length} step{meal.recipes.length !== 1 ? "s" : ""}
                </p>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
