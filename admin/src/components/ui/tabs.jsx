import React, { useState, useContext, createContext } from "react"

const TabsContext = createContext()

export function Tabs({ defaultValue, children, className = "" }) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ children, className = "" }) {
  return <div className={`flex gap-2 border-b ${className}`}>{children}</div>
}

export function TabsTrigger({ value, children, className = "" }) {
  const { activeTab, setActiveTab } = useContext(TabsContext)
  const isActive = activeTab === value

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 text-sm font-medium transition ${
        isActive ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"
      } ${className}`}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, children, className = "" }) {
  const { activeTab } = useContext(TabsContext)
  return activeTab === value ? <div className={className}>{children}</div> : null
}
