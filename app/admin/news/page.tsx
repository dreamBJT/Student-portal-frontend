import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Newspaper, Eye, Edit, Trash } from "lucide-react";

export default function NewsPage() {
  const articles = [
    {
      title: "Presidential Election 2025 Officially Opens",
      category: "Elections",
      views: 1234,
      status: { label: "Published", color: "bg-green-500" },
      date: "Oct 10, 2025",
      image:
        "https://images.unsplash.com/photo-1596526131090-6b0f9c5c8f5e?q=80&w=1200&auto=format&fit=crop",
      comments: 45,
    },
    {
      title: "Meet the Candidates: Town Hall Q&A",
      category: "Elections",
      views: 987,
      status: { label: "Published", color: "bg-green-500" },
      date: "Oct 12, 2025",
      image:
        "https://images.unsplash.com/photo-1520975901460-1f2a83537f84?q=80&w=1200&auto=format&fit=crop",
      comments: 22,
    },
    {
      title: "New Voting System Launched",
      category: "General",
      views: 2145,
      status: { label: "Published", color: "bg-green-500" },
      date: "Oct 8, 2025",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
      comments: 12,
    },
    {
      title: "Campus Democracy Week Schedule",
      category: "Leadership",
      views: 654,
      status: { label: "Draft", color: "bg-yellow-500 text-black" },
      date: "Oct 5, 2025",
      image:
        "https://images.unsplash.com/photo-1537204696483-9b6a1f3b1f3c?q=80&w=1200&auto=format&fit=crop",
      comments: 0,
    },
    {
      title: "Student Council Year in Review",
      category: "Leadership",
      views: 432,
      status: { label: "Archived", color: "bg-gray-500" },
      date: "May 15, 2024",
      image:
        "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop",
      comments: 9,
    },
  ];

  const preview = articles[0];

  return (
    <div className="space-y-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Manage News Posts</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-md bg-blue-100 text-blue-900">
            <Newspaper className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Manage News Posts</h1>
            <p className="text-gray-500">Create, edit, and manage news articles</p>
          </div>
        </div>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
          + Create News Post
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="secondary" className="bg-blue-900 text-white hover:bg-blue-800 h-9">All</Button>
        <Button variant="secondary" className="h-9">Published</Button>
        <Button variant="secondary" className="h-9">Draft</Button>
        <Button variant="secondary" className="h-9">Archived</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardContent className="p-4">
            <div className="mb-3">
              <h2 className="text-lg font-semibold">News Articles</h2>
              <p className="text-sm text-gray-500">Showing {articles.length} of {articles.length} articles</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-gray-600 border-b">
                  <tr>
                    <th className="pb-3">Title</th>
                    <th>Category</th>
                    <th>Views</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((a, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="py-4">{a.title}</td>
                      <td>
                        <span className="text-blue-700 font-medium">{a.category}</span>
                      </td>
                      <td>{a.views.toLocaleString()}</td>
                      <td>
                        <span className={`inline-block text-white text-xs px-2 py-1 rounded ${a.status.color}`}>
                          {a.status.label}
                        </span>
                      </td>
                      <td className="flex items-center gap-2 py-2">
                        <Edit className="w-4 h-4 cursor-pointer" />
                        <Trash className="w-4 h-4 cursor-pointer text-red-600" />
                        <Eye className="w-4 h-4 cursor-pointer" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-3">
            <h2 className="text-lg font-semibold">Preview</h2>
            <p className="text-sm text-gray-500 -mt-2">Selected article preview</p>
            <img
              src={preview.image}
              alt="preview"
              className="w-full h-40 rounded-md object-cover"
            />
            <span className="text-xs text-blue-700 font-medium">{preview.category}</span>
            <h3 className="text-xl font-semibold leading-snug">{preview.title}</h3>
            <div className="text-gray-500 text-sm">{preview.date}</div>
            <p className="text-gray-700 text-sm">
              The voting period for the 2025 Student President Election has officially begun...
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>📊 {preview.views.toLocaleString()}</span>
              <span>💬 {preview.comments}</span>
            </div>
            <Button variant="secondary">Full Preview</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
