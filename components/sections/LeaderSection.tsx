import Link from "next/link";

export default function LeaderSection() {
  const leaders = [
    {
      id: 1,
      name: "John Doe",
      position: "Presidential Candidate",
      party: "Student Unity Party",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Presidential Candidate",
      party: "Progressive Student Alliance",
    },
    {
      id: 3,
      name: "Mike Johnson",
      position: "Presidential Candidate",
      party: "Independent",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Meet the Candidates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leaders.map((leader) => (
            <Link
              key={leader.id}
              href={`/leaders/${leader.id}`}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">{leader.name}</h3>
              <p className="text-gray-600 mb-1">{leader.position}</p>
              <p className="text-sm text-gray-500">{leader.party}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
