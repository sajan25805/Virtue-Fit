"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronDown,
  Search,
  Dumbbell,
  Utensils,
  User,
  HelpCircle,
  ArrowLeft,
  CheckCircle,
  Clock,
  Smartphone,
  MessageCircle,
  Heart,
  X,
} from "lucide-react"

const helpCategories = [
  {
    id: "general",
    title: "General & Getting Started",
    icon: <HelpCircle className="w-5 h-5" />,
    questions: [
      {
        id: "what-is",
        question: "What is Virtue Fit and how does it work?",
        answer:
          "Virtue Fit is an all-in-one fitness and wellness platform offering personalized workout plans, meal guidance, meditation sessions, and daily planners—accessible anytime, anywhere.",
      },
      {
        id: "beginners",
        question: "Is Virtue Fit suitable for beginners?",
        answer:
          "Absolutely. Whether you're just starting or returning after a break, our beginner-friendly programs and guided sessions help you build confidence and progress at your own pace.",
      },
      {
        id: "choose-program",
        question: "How do I choose the right program for my fitness goal?",
        answer:
          "After signing up, you'll answer a few quick questions about your goals, fitness level, and preferences. Virtue Fit then recommends programs tailored to your needs.",
      },
    ],
  },
  {
    id: "workouts",
    title: "Workouts & Progress",
    icon: <Dumbbell className="w-5 h-5" />,
    questions: [
      {
        id: "workout-types",
        question: "What types of workouts are available on Virtue Fit?",
        answer:
          "Virtue Fit offers strength training, HIIT, yoga, Pilates, mobility, cardio, and more—led by certified trainers and structured into results-driven programs.",
      },
      {
        id: "track-progress",
        question: "Can I track my workout progress and completion?",
        answer:
          "Yes! Your dashboard tracks completed workouts, program milestones, and overall progress so you stay motivated and on track.",
      },
      {
        id: "equipment",
        question: "Do I need any equipment to get started?",
        answer:
          "Many programs require little to no equipment. For strength-focused plans, basic equipment like dumbbells or resistance bands may be recommended.",
      },
    ],
  },
  {
    id: "nutrition",
    title: "Nutrition & Wellness",
    icon: <Utensils className="w-5 h-5" />,
    questions: [
      {
        id: "meal-plans",
        question: "Does Virtue Fit include meal plans and nutrition guidance?",
        answer:
          "Yes, we provide dietitian-approved meal and snack plans that support your training goals. You'll also find healthy recipes and personalized suggestions.",
      },
      {
        id: "meditation",
        question: "Are there mindfulness or meditation features?",
        answer:
          "Yes. Virtue Fit includes guided meditations and breathing sessions designed to reduce stress, improve focus, and enhance recovery.",
      },
    ],
  },
  {
    id: "account",
    title: "Account & Access",
    icon: <User className="w-5 h-5" />,
    questions: [
      {
        id: "multiple-devices",
        question: "Can I use Virtue Fit on multiple devices?",
        answer:
          "Yes, your account can be accessed across phones, tablets, and desktops so you can train wherever you are.",
      },
      {
        id: "free-use",
        question: "Is Virtue Fit free to use?",
        answer:
          "We offer both free and premium plans. The free plan includes access to select workouts and features, while the premium plan unlocks full programs, nutrition plans, and advanced tracking.",
      },
      {
        id: "cancel-subscription",
        question: "Can I cancel or change my subscription anytime?",
        answer: "Yes, you can manage your subscription in your account settings. Cancel anytime—no questions asked.",
      },
      {
        id: "real-trainers",
        question: "Do I get access to real trainers or support?",
        answer:
          "While Virtue Fit is app-based, all content is developed by real, certified trainers and experts. Our support team is also available to assist you with any questions.",
      },
    ],
  },
]

const QuestionAccordion = ({ question, answer, isOpen, toggleOpen, index }) => {
  const contentRef = useRef(null)
  const [contentHeight, setContentHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight)
    }
  }, [answer])

  return (
    <motion.div
      className="border border-[#ECECEE] rounded-lg mb-3 overflow-hidden bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { delay: index * 0.1 },
      }}
    >
      <button className="w-full px-5 py-4 text-left flex justify-between items-center" onClick={toggleOpen}>
        <span className="font-medium text-[#0E0E2C]">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-5 h-5 text-[#00A8FF]" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? contentHeight : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div ref={contentRef} className="px-5 pb-4 text-[#0E0E2C]/80">
          {answer}
        </div>
      </motion.div>
    </motion.div>
  )
}

const CategorySection = ({ category, activeCategory, setActiveCategory, index, openQuestions, toggleQuestion }) => {
  const isActive = activeCategory === category.id

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { delay: index * 0.1 },
      }}
      className="mb-6"
    >
      <button
        onClick={() => setActiveCategory(isActive ? null : category.id)}
        className={`w-full flex items-center justify-between p-4 rounded-lg transition-all ${
          isActive ? "bg-[#00A8FF] text-white" : "bg-white text-[#0E0E2C] hover:bg-[#F7F7FD]"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${isActive ? "bg-white/20" : "bg-[#F7F7FD]"}`}>{category.icon}</div>
          <span className="font-semibold">{category.title}</span>
        </div>
        <motion.div animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-3 overflow-hidden"
          >
            {category.questions.map((q, i) => (
              <QuestionAccordion
                key={q.id}
                question={q.question}
                answer={q.answer}
                isOpen={openQuestions[q.id] || false}
                toggleOpen={() => toggleQuestion(q.id)}
                index={i}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const HelpPage = () => {
  const [activeCategory, setActiveCategory] = useState("general")
  const [openQuestions, setOpenQuestions] = useState({})
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" })

  const toggleQuestion = (id) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleSearch = (term) => {
    setSearchTerm(term)

    if (term.trim() === "") {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)

    // Search through all questions
    const results = []
    helpCategories.forEach((category) => {
      category.questions.forEach((q) => {
        if (
          q.question.toLowerCase().includes(term.toLowerCase()) ||
          q.answer.toLowerCase().includes(term.toLowerCase())
        ) {
          results.push({
            ...q,
            category: category.title,
            categoryId: category.id,
          })
        }
      })
    })

    setSearchResults(results)
  }

  const clearSearch = () => {
    setSearchTerm("")
    setSearchResults([])
    setIsSearching(false)
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    // Here you would handle the form submission
    alert("Thank you for your message! Our team will get back to you soon.")
    setContactForm({ name: "", email: "", message: "" })
    setShowContactForm(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-[#F7F7FD]">
      {/* Header */}
      <div className="bg-[#0E0E2C] text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">How can we help you?</h1>
            <p className="text-white/80 mb-8">Find answers to common questions about Virtue Fit</p>

            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-5 py-4 pr-12 rounded-lg text-[#0E0E2C] focus:outline-none focus:ring-2 focus:ring-[#00A8FF]"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                {searchTerm ? (
                  <button onClick={clearSearch} className="text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                  </button>
                ) : (
                  <Search className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="text-[#F7F7FD]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="currentColor">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8 pb-16">
        {isSearching ? (
          <div className="max-w-3xl mx-auto">
            <button onClick={clearSearch} className="flex items-center text-[#00A8FF] mb-6 hover:underline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to all help topics
            </button>

            <h2 className="text-xl font-semibold mb-6">
              {searchResults.length > 0 ? `Search results for "${searchTerm}"` : `No results found for "${searchTerm}"`}
            </h2>

            {searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((result) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-lg p-4 border border-[#ECECEE]"
                  >
                    <div className="text-sm text-[#00A8FF] mb-1">{result.category}</div>
                    <h3 className="font-medium text-[#0E0E2C] mb-2">{result.question}</h3>
                    <p className="text-[#0E0E2C]/80">{result.answer}</p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="bg-white rounded-full p-4 inline-flex mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-[#0E0E2C]/80 mb-6">
                  We couldn't find any results matching your search. Try using different keywords or browse our help
                  categories.
                </p>
                <button
                  onClick={() => setShowContactForm(true)}
                  className="bg-[#00A8FF] text-white px-6 py-3 rounded-lg hover:bg-[#0096E6] transition-colors"
                >
                  Contact Support
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-12 gap-8 max-w-6xl mx-auto">
            {/* Left sidebar - Categories */}
            <div className="md:col-span-4">
              <div className="sticky top-6">
                <h2 className="text-xl font-semibold mb-4">Help Topics</h2>
                {helpCategories.map((category, index) => (
                  <CategorySection
                    key={category.id}
                    category={category}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    index={index}
                    openQuestions={openQuestions}
                    toggleQuestion={toggleQuestion}
                  />
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 bg-white p-6 rounded-lg border border-[#ECECEE]"
                >
                  <h3 className="font-semibold text-[#0E0E2C] mb-3">Still need help?</h3>
                  <p className="text-[#0E0E2C]/80 mb-4">
                    Can't find what you're looking for? Our support team is here to help.
                  </p>
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="bg-[#00A8FF] text-white w-full py-3 rounded-lg hover:bg-[#0096E6] transition-colors flex items-center justify-center"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Support
                  </button>
                </motion.div>
              </div>
            </div>

            {/* Right content - Questions */}
            <div className="md:col-span-8">
              <div className="bg-white rounded-lg p-6 border border-[#ECECEE] mb-8">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <h2 className="text-2xl font-bold text-[#0E0E2C] mb-6 flex items-center">
                    {helpCategories.find((c) => c.id === activeCategory)?.icon}
                    <span className="ml-3">{helpCategories.find((c) => c.id === activeCategory)?.title}</span>
                  </h2>
                </motion.div>

                {helpCategories
                  .find((c) => c.id === activeCategory)
                  ?.questions.map((q, i) => (
                    <QuestionAccordion
                      key={q.id}
                      question={q.question}
                      answer={q.answer}
                      isOpen={openQuestions[q.id] || false}
                      toggleOpen={() => toggleQuestion(q.id)}
                      index={i}
                    />
                  ))}
              </div>

              {/* Features section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-4">Why choose Virtue Fit?</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-lg border border-[#ECECEE]">
                    <div className="bg-[#F7F7FD] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <CheckCircle className="w-6 h-6 text-[#00A8FF]" />
                    </div>
                    <h4 className="font-semibold text-[#0E0E2C] mb-2">Expert-Led Programs</h4>
                    <p className="text-[#0E0E2C]/80">
                      All workouts and nutrition plans are designed by certified professionals.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-lg border border-[#ECECEE]">
                    <div className="bg-[#F7F7FD] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <Clock className="w-6 h-6 text-[#00A8FF]" />
                    </div>
                    <h4 className="font-semibold text-[#0E0E2C] mb-2">Flexible Scheduling</h4>
                    <p className="text-[#0E0E2C]/80">
                      Work out on your own time with programs that adapt to your schedule.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-lg border border-[#ECECEE]">
                    <div className="bg-[#F7F7FD] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <Smartphone className="w-6 h-6 text-[#00A8FF]" />
                    </div>
                    <h4 className="font-semibold text-[#0E0E2C] mb-2">Access Anywhere</h4>
                    <p className="text-[#0E0E2C]/80">Take your fitness journey with you on any device, anytime.</p>
                  </div>

                  <div className="bg-white p-5 rounded-lg border border-[#ECECEE]">
                    <div className="bg-[#F7F7FD] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <Heart className="w-6 h-6 text-[#00A8FF]" />
                    </div>
                    <h4 className="font-semibold text-[#0E0E2C] mb-2">Holistic Approach</h4>
                    <p className="text-[#0E0E2C]/80">
                      Combine fitness, nutrition, and mindfulness for complete wellness.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>

      {/* Contact form modal */}
      <AnimatePresence>
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg max-w-md w-full p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-[#0E0E2C]">Contact Support</h3>
                <button onClick={() => setShowContactForm(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleContactSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#0E0E2C] mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-[#ECECEE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8FF]"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#0E0E2C] mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-[#ECECEE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8FF]"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#0E0E2C] mb-1">Message</label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-[#ECECEE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8FF]"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="px-4 py-2 border border-[#ECECEE] rounded-lg text-[#0E0E2C] hover:bg-[#F7F7FD]"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-[#00A8FF] text-white rounded-lg hover:bg-[#0096E6]">
                    Send Message
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HelpPage
