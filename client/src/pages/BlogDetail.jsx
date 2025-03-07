// import {
//     ArrowLeftIcon,
//     BookmarkIcon,
//     ShareIcon,
//     ClockIcon,
//     UserCircleIcon,
//     FacebookIcon,
//     TwitterIcon,
//     LinkedInIcon,
//   } from "@heroicons/react/24/outline"
  
//   // Mock data for blog post
//   const blogPost = {
//     id: 1,
//     title: "10 Essential Exercises for Building Core Strength",
//     content: `
//       <h2>Introduction</h2>
//       <p>Core strength is fundamental to overall fitness and daily activities. A strong core not only helps in athletic performance but also improves posture and prevents back pain.</p>
      
//       <h2>Why Core Strength Matters</h2>
//       <p>Your core muscles are involved in almost every movement you make. They provide stability for your spine, help maintain balance, and transfer power between your upper and lower body.</p>
      
//       <h2>The Essential Exercises</h2>
//       <ol>
//         <li>
//           <h3>Plank</h3>
//           <p>The foundation of core training. Hold a straight-arm or forearm plank position for 30-60 seconds.</p>
//         </li>
//         <li>
//           <h3>Dead Bug</h3>
//           <p>Lie on your back, extend opposite arm and leg while maintaining core stability.</p>
//         </li>
//         <li>
//           <h3>Bird Dog</h3>
//           <p>On hands and knees, extend opposite arm and leg while keeping your spine neutral.</p>
//         </li>
//       </ol>
      
//       <h2>Training Tips</h2>
//       <ul>
//         <li>Focus on proper form over repetitions</li>
//         <li>Breathe steadily throughout each exercise</li>
//         <li>Gradually increase duration and difficulty</li>
//         <li>Maintain consistent practice</li>
//       </ul>
      
//       <h2>Conclusion</h2>
//       <p>Incorporating these exercises into your routine will help build a strong foundation for all your fitness goals.</p>
//     `,
//     category: "Workout",
//     author: "Sarah Johnson",
//     authorTitle: "Certified Fitness Trainer",
//     date: "March 15, 2024",
//     readTime: "5 min read",
//     image: "/placeholder.svg?height=600&width=1200",
//     authorImage: "/placeholder.svg?height=100&width=100",
//   }
  
//   // Mock data for related posts
//   const relatedPosts = [
//     {
//       id: 2,
//       title: "Advanced Core Workout Routine",
//       excerpt: "Take your core training to the next level with these advanced exercises...",
//       category: "Workout",
//       author: "Mike Thompson",
//       date: "March 14, 2024",
//       image: "/placeholder.svg?height=200&width=300",
//     },
//     {
//       id: 3,
//       title: "Core Exercises for Better Posture",
//       excerpt: "Improve your posture and reduce back pain with these targeted exercises...",
//       category: "Workout",
//       author: "Emily Chen",
//       date: "March 13, 2024",
//       image: "/placeholder.svg?height=200&width=300",
//     },
//   ]
  
//   export default function BlogDetail() {
//     return (
//       <div className="min-h-screen bg-gray-100">
//         {/* Hero Section */}
//         <div className="relative h-[60vh] bg-gray-900">
//           <img
//             src={blogPost.image || "/placeholder.svg"}
//             alt={blogPost.title}
//             className="w-full h-full object-cover opacity-50"
//           />
//           <div className="absolute inset-0 flex items-center">
//             <div className="container mx-auto px-4">
//               <button className="mb-4 text-white flex items-center gap-2 hover:text-green-400">
//                 <ArrowLeftIcon className="w-5 h-5" />
//                 Back to Blog
//               </button>
//               <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-4xl">{blogPost.title}</h1>
//               <div className="flex items-center gap-6 text-white">
//                 <div className="flex items-center gap-2">
//                   <UserCircleIcon className="w-10 h-10" />
//                   <div>
//                     <p className="font-medium">{blogPost.author}</p>
//                     <p className="text-sm opacity-75">{blogPost.authorTitle}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <ClockIcon className="w-5 h-5" />
//                   <span>{blogPost.readTime}</span>
//                 </div>
//                 <span className="text-sm opacity-75">{blogPost.date}</span>
//               </div>
//             </div>
//           </div>
//         </div>
  
//         {/* Content Section */}
//         <div className="container mx-auto px-4 py-12">
//           <div className="max-w-4xl mx-auto">
//             <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
//               {/* Article Actions */}
//               <div className="flex justify-between items-center mb-8 pb-8 border-b">
//                 <div className="flex gap-2">
//                   <button className="px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-medium">
//                     {blogPost.category}
//                   </button>
//                 </div>
//                 <div className="flex gap-2">
//                   <button className="p-2 hover:bg-gray-100 rounded-full">
//                     <BookmarkIcon className="w-5 h-5 text-gray-600" />
//                   </button>
//                   <button className="p-2 hover:bg-gray-100 rounded-full">
//                     <ShareIcon className="w-5 h-5 text-gray-600" />
//                   </button>
//                 </div>
//               </div>
  
//               {/* Article Content */}
//               <div className="prose prose-lg max-w-none">
//                 <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
//               </div>
  
//               {/* Share Section */}
//               <div className="mt-8 pt-8 border-t">
//                 <h3 className="text-lg font-bold mb-4">Share this article</h3>
//                 <div className="flex gap-4">
//                   <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
//                     <FacebookIcon className="w-5 h-5" />
//                   </button>
//                   <button className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500">
//                     <TwitterIcon className="w-5 h-5" />
//                   </button>
//                   <button className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800">
//                     <LinkedInIcon className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>
//             </div>
  
//             {/* Related Posts */}
//             <div>
//               <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
//               <div className="grid md:grid-cols-2 gap-8">
//                 {relatedPosts.map((post) => (
//                   <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
//                     <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
//                     <div className="p-6">
//                       <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
//                         {post.category}
//                       </span>
//                       <h3 className="text-xl font-bold mt-4 mb-2">{post.title}</h3>
//                       <p className="text-gray-600 mb-4">{post.excerpt}</p>
//                       <div className="flex items-center gap-2">
//                         <UserCircleIcon className="w-8 h-8 text-gray-400" />
//                         <div>
//                           <p className="font-medium text-sm">{post.author}</p>
//                           <p className="text-xs text-gray-500">{post.date}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
    