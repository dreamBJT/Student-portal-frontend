"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Eye, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";

interface Comment {
  text: string;
}

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
  comments?: Comment[];
  commentsCount?: number;
}

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const BASE_URL = "https://student-portal-backend-0tur.onrender.com";

  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [commentsOpen, setCommentsOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;
  const commentsEndRef = useRef<HTMLDivElement | null>(null);
  const [comments, setComments] = useState<any[]>([]);

  // Fetch news by ID
  const fetchArticle = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${BASE_URL}/news/${id}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed to fetch news: ${res.status}`);
      const data = await res.json();
      setArticle(data);
    } catch (e: any) {
      setError(e.message || "Error fetching news");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
    fetchComments();
  }, [id]);

  // Time ago
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

  // Increment views
  const handleView = async () => {
    if (!article) return;
    try {
      await fetch(`${BASE_URL}/news/${id}/views`, { method: "PATCH" });
      setArticle({ ...article, views: (article.views || 0) + 1 });
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch comments list
  const fetchComments = async () => {
    try {
      const res = await fetch(`${BASE_URL}/news/${id}/comments`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`Failed to fetch comments: ${res.status}`);
      const data = await res.json();
      setComments(Array.isArray(data) ? data : data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Add comment and refetch
  const handleAddComment = async () => {
    if (!article || !comment.trim()) return;
    try {
      const res = await fetch(`${BASE_URL}/news/${id}/comments`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment }),
      });
      if (!res.ok) throw new Error("Failed to add comment");

      setComment("");
      setCommentsOpen(true);
      await fetchComments(); // refetch to show new comment

      setTimeout(() => {
        commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-gray-500">Loading article…</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!article) return <p className="text-gray-500">Article not found.</p>;

  const img = article.image || article.imageUrl;
  const when = article.createdAt || article.publishedAt || article.updatedAt;

  // Pagination
  const totalComments = comments.length;
  const totalPages = Math.ceil(totalComments / commentsPerPage);
  const displayedComments = comments.slice(
    (currentPage - 1) * commentsPerPage,
    currentPage * commentsPerPage
  );

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 space-y-6">
      {img && (
        <img
          src={img}
          alt={article.title}
          className="w-2/3 h-96 md:h-96 object-cover rounded-xl shadow"
        />
      )}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
            {article.category.charAt(0).toUpperCase() +
              article.category.slice(1)}
          </span>
          {when && <span>{timeAgo(when)}</span>}
        </div>
        <h1 className="text-3xl font-bold">{article.title}</h1>
        <p className="text-gray-700 text-base whitespace-pre-line">
          {article.content}
        </p>
        <div className="flex items-center gap-4 text-gray-600 mt-4">
          <button
            onClick={handleView}
            className="inline-flex items-center gap-1"
          >
            <Eye className="h-4 w-4" /> {article.views ?? 0}
          </button>
          <span className="inline-flex items-center gap-1">
            <MessageSquare className="h-4 w-4" /> {totalComments}
          </span>
        </div>
      </div>

      {/* Add Comment */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Add a Comment</h2>
        <div className="flex gap-2 flex-col sm:flex-row">
          <input
            type="text"
            placeholder="Write your comment..."
            className="flex-1 px-3 py-2 border rounded"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddComment();
            }}
          />
          <Button onClick={handleAddComment}>Comment</Button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setCommentsOpen(!commentsOpen)}
        >
          <h2 className="text-lg font-semibold">Comments ({totalComments})</h2>
          {commentsOpen ? <ChevronUp /> : <ChevronDown />}
        </div>
        {commentsOpen && (
          <div className="mt-3 space-y-3 max-h-96 overflow-y-auto">
            {displayedComments.length > 0 ? (
              displayedComments.map((c, i) => {
                let body = "";
                let by = "";
                let whenStr = "";
                if (typeof c === "string") {
                  body = c;
                } else if (c && typeof c === "object") {
                  const anyC = c as any;
                  // Prefer backend schema field 'comment'
                  body =
                    anyC.comment ??
                    anyC.text ??
                    anyC.message ??
                    anyC.content ??
                    "";
                  by = anyC.userId ? String(anyC.userId) : "";
                  whenStr = anyC.createdAt
                    ? timeAgo(String(anyC.createdAt))
                    : "";
                } else {
                  body = String(c ?? "");
                }
                return (
                  <div
                    key={i}
                    className="p-3 bg-gray-50 rounded border text-sm text-gray-800"
                  >
                    {body}
                    {(by || whenStr) && (
                      <div className="text-xs text-gray-500 mt-1">
                        {by ? `by ${by}` : ""}
                        {by && whenStr ? " • " : ""}
                        {whenStr}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-sm">No comments yet.</p>
            )}
            <div ref={commentsEndRef} />
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Prev
                </Button>
                <span className="px-2 py-1 text-sm">
                  {currentPage} / {totalPages}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
