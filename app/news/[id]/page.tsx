export default function NewsDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">News Article</h1>
      <p className="text-gray-600">Article ID: {params.id}</p>
    </div>
  );
}
