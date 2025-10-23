"use client";

export default function LiveVoteChart() {
  const candidates = [
    { name: "John Doe", votes: 45, color: "bg-blue-500" },
    { name: "Jane Smith", votes: 35, color: "bg-green-500" },
    { name: "Mike Johnson", votes: 20, color: "bg-yellow-500" },
  ];

  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4">Live Vote Count</h3>
      <div className="space-y-4">
        {candidates.map((candidate) => (
          <div key={candidate.name}>
            <div className="flex justify-between mb-1">
              <span className="font-medium">{candidate.name}</span>
              <span className="text-gray-600">{candidate.votes} votes</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`${candidate.color} h-4 rounded-full transition-all duration-500`}
                style={{ width: `${(candidate.votes / totalVotes) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <p className="text-2xl font-bold">{totalVotes}</p>
        <p className="text-gray-600">Total Votes Cast</p>
      </div>
    </div>
  );
}
