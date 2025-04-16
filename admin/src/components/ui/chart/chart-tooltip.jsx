// chart-tooltip.jsx
export function ChartTooltip({ active, payload, label }) {
    if (!active || !payload || payload.length === 0) return null;
  
    return (
      <div className="rounded-md border bg-white px-4 py-2 shadow-sm text-sm">
        <div className="font-semibold mb-1">{label}</div>
        {payload.map((entry, index) => (
          <div key={`tooltip-${index}`} className="text-gray-700">
            <span className="font-medium">{entry.name || entry.dataKey}:</span>{" "}
            {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
          </div>
        ))}
      </div>
    )
  }
  