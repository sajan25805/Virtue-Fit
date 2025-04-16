export function ChartContainer({ children }) {
    return (
      <div className="w-full h-full bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        {children}
      </div>
    )
  }