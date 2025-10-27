"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, MessageSquare, Search } from "lucide-react";
import Footer from "@/components/layout/Footer";

interface NewsArticle {
  _id: string;
  title: string;
  content: string;
  category: string;
  image?: string;
  imageUrl?: string;
  createdAt?: string;
  publishedAt?: string;
  updatedAt?: string;
  views?: number;
  comments?: { text: string }[];
  commentsCount?: number;
}

export default function NewsPage() {
  const BASE_URL = "https://student-portal-backend-0tur.onrender.com";

  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const categories = [
    { label: "All", value: "all" },
    { label: "Elections", value: "election" },
    { label: "General", value: "general" },
    { label: "Leadership", value: "leadership" },
  ];

  useEffect(() => {
    const run = async () => {
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
    run();
  }, []);

  // Human-readable time
  const timeAgo = (iso?: string) => {
    if (!iso) return "";
    const d = new Date(iso).getTime();
    if (Number.isNaN(d)) return "";
    const s = Math.floor((Date.now() - d) / 1000);
    if (s < 5) return "just now";
    if (s < 60) return `${s}s ago`;
    const m = Math.floor(s / 60);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    const days = Math.floor(h / 24);
    if (days === 1) return "yesterday";
    if (days < 7) return `${days}d ago`;
    const w = Math.floor(days / 7);
    if (w < 5) return `${w}w ago`;
    const mo = Math.floor(days / 30);
    if (mo < 12) return `${mo}mo ago`;
    const y = Math.floor(days / 365);
    return `${y}y ago`;
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles
      .filter((a) =>
        category === "all"
          ? true
          : (a.category || "").toLowerCase() === category
      )
      .filter((a) =>
        !q
          ? true
          : [a.title, a.content, a.category]
              .map((x) => (x || "").toString().toLowerCase())
              .some((t) => t.includes(q))
      );
  }, [articles, category, query]);

  const handleView = async (id: string) => {
    try {
      await fetch(`${BASE_URL}/news/${id}/views`, { method: "PATCH" });
      setArticles((prev) =>
        prev.map((a) =>
          a._id === id ? { ...a, views: (a.views || 0) + 1 } : a
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddComment = async (id: string, text: string) => {
    if (!text) return;
    try {
      const res = await fetch(`${BASE_URL}/news/${id}/comments`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error("Failed to add comment");
      setArticles((prev) =>
        prev.map((a) =>
          a._id === id
            ? {
                ...a,
                commentsCount: (a.commentsCount || 0) + 1,
                comments: [...(a.comments || []), { text }],
              }
            : a
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        {/* Search & Category */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold tracking-tight">
            Latest News & Updates
          </h1>
          <p className="mt-2 text-gray-500">
            Stay informed about elections, campus events, and student leadership
          </p>
        </div>
        <div className="flex flex-col gap-4 mb-8">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search news articles..."
              className="pl-9 h-11 rounded-lg"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                className={`px-4 py-1.5 rounded-lg text-sm border transition-colors ${
                  category === c.value
                    ? "bg-blue-600 text-white border-blue-600 shadow"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        {loading && <p className="text-gray-500">Loading news…</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && filtered.length === 0 && (
          <p className="text-gray-500">No news found.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((a) => {
            const id = a._id;
            const img = a.image || a.imageUrl;
            const when = a.createdAt || a.publishedAt || a.updatedAt;
            const comments =
              (Array.isArray(a.comments)
                ? a.comments.length
                : a.commentsCount) ?? 0;

            return (
              <div
                key={id}
                className="rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg transition-all bg-white flex flex-col"
              >
                {img && (
                  <img
                    src={img}
                    alt={a.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                      {a.category.charAt(0).toUpperCase() + a.category.slice(1)}
                    </span>
                    <span className="text-gray-500">{timeAgo(when)}</span>
                  </div>
                  <Link href={`/news/${id}`}>
                    <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 hover:underline cursor-pointer">
                      {a.title}
                    </h3>
                  </Link>
                  <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                    {a.content || "No content"}
                  </p>

                  <div className="flex items-center gap-6 text-gray-600 text-xs mt-auto">
                    <button
                      className="inline-flex items-center gap-1"
                      onClick={() => handleView(id)}
                    >
                      <Eye className="h-4 w-4" /> {a.views ?? 0}
                    </button>
                    <span className="inline-flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" /> {comments}
                    </span>
                  </div>

                  <div className="mt-4">
                    <Link href={`/news/${id}`}>
                      <Button
                        variant="link"
                        size="sm"
                        className="px-0 text-blue-600"
                      >
                        Read Article
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
