"use client";

import { useState, useEffect, useMemo } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NewsPage() {
  const BASE_URL = "https://student-portal-backend-0tur.onrender.com";

  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Fetch all news
  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${BASE_URL}/news`, { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed to fetch news: ${res.status}`);
      const data = await res.json();
      setArticles(Array.isArray(data) ? data : data?.data || []);
    } catch (e: any) {
      setError(e.message || "Error fetching news");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Create new news
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return alert("Title and content are required");
    try {
      setLoading(true);
      const payload = { title, category, content, imageUrl };
      const res = await fetch(`${BASE_URL}/news`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Failed to create news: ${res.status}`);
      const newArticle = await res.json();
      setArticles((prev) => [newArticle, ...prev]);
      setTitle("");
      setCategory("all");
      setContent("");
      setImageUrl("");
      setOpen(false);
    } catch (e: any) {
      console.error(e);
      alert(e.message || "Failed to create news");
    } finally {
      setLoading(false);
    }
  };

  // Delete news
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this news?")) return;
    try {
      const res = await fetch(`${BASE_URL}/news/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Failed to delete news: ${res.status}`);
      setArticles((prev) => prev.filter((a) => a._id !== id));
    } catch (e: any) {
      console.error(e);
      alert(e.message || "Failed to delete news");
    }
  };

  // Optional: increment views when clicking Eye
  const handleView = async (id: string) => {
    try {
      await fetch(`${BASE_URL}/news/${id}/views`, { method: "PATCH" });
      // update locally
      setArticles((prev) =>
        prev.map((a) =>
          a._id === id ? { ...a, views: (a.views || 0) + 1 } : a
        )
      );
    } catch (e) {
      console.error(e);
    }
  };

  const preview = useMemo(() => articles[0] || {}, [articles]);

  const statusClass = (s?: string) => {
    const v = (s || "").toLowerCase();
    if (v === "published") return "bg-green-500";
    if (v === "archived") return "bg-gray-500";
    return "bg-yellow-500 text-black";
  };

  return (
    <div className="space-y-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>News</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-md bg-blue-100 text-blue-900">
            <Newspaper className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Manage News</h1>
            <p className="text-gray-500">Create and manage news articles</p>
          </div>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
              + Create News Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create News Post</DialogTitle>
              <DialogDescription>
                Add a new news article
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-8" onSubmit={handleCreate}>
              <div className="space-y-3">
                <Label>Title</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Article title"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="election">Election</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="leadership">Leadership</SelectItem>
                      <SelectItem value="all">All</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Optional image URL"
                  />
                </div>
              </div>
              <div className="space-y-5">
                <Label>Content</Label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Full article content"
                  className="min-h-40"
                />
              </div>
              <DialogFooter className="gap-2 sm:gap-0">
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <Button type="submit" className="bg-blue-900 hover:bg-blue-800">
                  {loading ? "Publishing..." : "Publish Post"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardContent className="p-4">
            <div className="mb-3">
              <h2 className="text-lg font-semibold">News Articles</h2>
              <p className="text-sm text-gray-500">
                {loading
                  ? "Loading articles…"
                  : error
                  ? error
                  : `Showing ${articles.length} articles`}
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-gray-600 border-b">
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Views</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((a) => (
                    <tr key={a._id} className="border-b last:border-0">
                      <td className="py-4">{a.title}</td>
                      <td>{a.category}</td>
                      <td>{a.views}</td>
                      <td className="flex items-center gap-2 py-2">
                        <Eye
                          className="w-4 h-4 cursor-pointer"
                          onClick={() => handleView(a._id)}
                        />
                        <Trash
                          className="w-4 h-4 cursor-pointer text-red-600"
                          onClick={() => handleDelete(a._id)}
                        />
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
            {preview.image && (
              <img
                src={preview.image}
                alt="preview"
                className="w-full h-40 rounded-md object-cover"
              />
            )}
            <h3 className="text-xl font-semibold leading-snug">
              {preview.title || "No articles yet"}
            </h3>
            <p className="text-gray-500 text-sm">{preview.category}</p>
            <p className="text-gray-700 text-sm">
              {preview.content
                ? preview.content.slice(0, 100) + "..."
                : "No content"}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>📊 {preview.views ?? 0}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
