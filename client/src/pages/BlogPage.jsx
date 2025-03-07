// "use client"

// import { useState } from "react"
// import { MagnifyingGlassIcon, BookmarkIcon, ShareIcon, ClockIcon, UserCircleIcon } from "@heroicons/react/24/outline"

// // Mock data for blogs
// const blogPosts = [
//   {
//     id: 1,
//     title: "10 Essential Exercises for Building Core Strength",
//     excerpt: "Discover the fundamental exercises that will help you develop a strong and stable core...",
//     category: "Workout",
//     author: "Sarah Johnson",
//     date: "March 15, 2024",
//     readTime: "5 min read",
//     image: "/placeholder.svg?height=400&width=600",
//     featured: true,
//   },
//   {
//     id: 2,
//     title: "The Ultimate Guide to Post-Workout Nutrition",
//     excerpt: "Learn what to eat after your workout to maximize recovery and muscle growth...",
//     category: "Nutrition",
//     author: "Mike Thompson",
//     date: "March 14, 2024",
//     readTime: "8 min read",
//     image: "/placeholder.svg?height=400&width=600",
//   },
//   {
//     id: 3,
//     title: "How to Stay Motivated in Your Fitness Journey",
//     excerpt: "Tips and strategies to keep you motivated and consistent with your fitness goals...",
//     category: "Motivation",
//     author: "Emily Chen",
//     date: "March 13, 2024",
//     readTime: "6 min read",
//     image: "/placeholder.svg?height=400&width=600",
//   },
//   {
//     id: 4,
//     title: "The Benefits of High-Intensity Interval Training",
//     excerpt: "Explore why HIIT workouts are so effective and how to incorporate them into your routine...",
//     category: "Workout",
//     author: "David Wilson",
//     date: "March 12, 2024",
//     readTime: "7 min read",
//     image: "/placeholder.svg?height=400&width=600",
//   },
//   {
//     id: 5,
//     title: "Understanding Macronutrients for Muscle Growth",
//     excerpt: "A comprehensive guide to proteins, carbs, and fats for optimal muscle development...",
//     category: "Nutrition",
//     author: "Lisa Anderson",
//     date: "March 11, 2024",
//     readTime: "10 min read",
//     image: "/placeholder.svg?height=400&width=600",
//   },
//   {
//     id: 6,
//     title: "Best Recovery Practices for Athletes",
//     excerpt: "Essential recovery techniques to prevent injury and improve performance...",
//     category: "Recovery",
//     author: "James Martinez",
//     date: "March 10, 2024",
//     readTime: "8 min read",
//     image: "/placeholder.svg?height=400&width=600",
//   },
// ]

// const categories = ["All", "Workout", "Nutrition", "Motivation", "Recovery"]

// export default function BlogPage() {
//   const [selectedCategory, setSelectedCategory] = useState("All")
//   const [searchQuery, setSearchQuery] = useState("")

//   const filteredPosts = blogPosts.filter((post) => {
//     const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
//     const matchesSearch =
//       post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
//     return matchesCategory && matchesSearch
//   })

//   const featuredPost = blogPosts.find((post) => post.featured)
//   const regularPosts = filteredPosts.filter((post) => !post.featured)

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <div className="bg-gray-900 text-white py-16">
//         <div className="container mx-auto px-4">
//           <h1 className="text-4xl font-bold mb-4">Fitness Blog</h1>
//           <p className="text-gray-300 text-lg">Expert advice on workouts, nutrition, and wellness</p>
//         </div>
//       </div>

//       {/* Search and Filters */}
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
//           <div className="relative flex-1 max-w-md">
//             <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search articles..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>
//           <div className="flex gap-2 overflow-x-auto pb-2">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
//                   ${
//                     selectedCategory === category
//                       ? "bg-green-500 text-white"
//                       : "bg-white text-gray-700 hover:bg-gray-100"
//                   }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Featured Post */}
//         {featuredPost && selectedCategory === "All" && !searchQuery && (
//           <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
//             <div className="md:flex">
//               <div className="md:flex-1">
//                 <img
//                   src={featuredPost.image || "/placeholder.svg"}
//                   alt={featuredPost.title}
//                   className="h-48 md:h-full w-full object-cover"
//                 />
//               </div>
//               <div className="md:flex-1 p-6">
//                 <div className="flex items-center gap-2 mb-4">
//                   <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
//                     {featuredPost.category}
//                   </span>
//                   <span className="text-gray-500 text-sm flex items-center">
//                     <ClockIcon className="w-4 h-4 mr-1" />
//                     {featuredPost.readTime}
//                   </span>
//                 </div>
//                 <h2 className="text-2xl font-bold mb-4">{featuredPost.title}</h2>
//                 <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <UserCircleIcon className="w-10 h-10 text-gray-400" />
//                     <div>
//                       <p className="font-medium">{featuredPost.author}</p>
//                       <p className="text-sm text-gray-500">{featuredPost.date}</p>
//                     </div>
//                   </div>
//                   <div className="flex gap-2">
//                     <button className="p-2 hover:bg-gray-100 rounded-full">
//                       <BookmarkIcon className="w-5 h-5 text-gray-600" />
//                     </button>
//                     <button className="p-2 hover:bg-gray-100 rounded-full">
//                       <ShareIcon className="w-5 h-5 text-gray-600" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Blog Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {regularPosts.map((post) => (
//             <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
//               <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
//               <div className="p-6">
//                 <div className="flex items-center gap-2 mb-4">
//                   <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
//                     {post.category}
//                   </span>
//                   <span className="text-gray-500 text-sm flex items-center">
//                     <ClockIcon className="w-4 h-4 mr-1" />
//                     {post.readTime}
//                   </span>
//                 </div>
//                 <h3 className="text-xl font-bold mb-2">{post.title}</h3>
//                 <p className="text-gray-600 mb-4">{post.excerpt}</p>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <UserCircleIcon className="w-8 h-8 text-gray-400" />
//                     <div>
//                       <p className="font-medium text-sm">{post.author}</p>
//                       <p className="text-xs text-gray-500">{post.date}</p>
//                     </div>
//                   </div>
//                   <div className="flex gap-2">
//                     <button className="p-2 hover:bg-gray-100 rounded-full">
//                       <BookmarkIcon className="w-5 h-5 text-gray-600" />
//                     </button>
//                     <button className="p-2 hover:bg-gray-100 rounded-full">
//                       <ShareIcon className="w-5 h-5 text-gray-600" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

