import Link from "next/link";

export default function NewsSection() {
  const newsItems = [
    {
      id: 1,
      title: "Election Registration Opens",
      excerpt: "Students can now register for the upcoming presidential election",
      date: "2025-10-20",
    },
    {
      id: 2,
      title: "Candidate Debates Scheduled",
      excerpt: "Join us for the candidate debates next week",
      date: "2025-10-19",
    },
    {
      id: 3,
      title: "Voting Guidelines Released",
      excerpt: "Learn how to cast your vote in the election",
      date: "2025-10-18",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.id}`}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.excerpt}</p>
              <p className="text-sm text-gray-400">{item.date}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
