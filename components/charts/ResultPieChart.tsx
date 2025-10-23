"use client";

export default function ResultPieChart() {
  const results = [
    { name: "John Doe", votes: 450, percentage: 45, color: "bg-blue-500" },
    { name: "Jane Smith", votes: 350, percentage: 35, color: "bg-green-500" },
    { name: "Mike Johnson", votes: 200, percentage: 20, color: "bg-yellow-500" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4">Election Results</h3>

      <div className="flex justify-center mb-6">
        <div className="relative w-64 h-64">
          <svg viewBox="0 0 100 100" className="transform -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="20"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="20"
              strokeDasharray={`${results[0].percentage * 2.51} 251.2`}
              strokeDashoffset="0"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-bold">{results[0].percentage}%</p>
              <p className="text-sm text-gray-600">Winner</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {results.map((result) => (
          <div key={result.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded ${result.color}`}></div>
              <span className="font-medium">{result.name}</span>
            </div>
            <div className="text-right">
              <p className="font-bold">{result.percentage}%</p>
              <p className="text-sm text-gray-600">{result.votes} votes</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
