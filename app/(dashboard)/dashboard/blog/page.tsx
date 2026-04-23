"use client";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { IBlog } from "@/types";
import { BlogModal } from "@/components/dashboard/BlogModal";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<IBlog | undefined>();

  const fetchBlogs = useCallback(async () => {
    const { data } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });
    setBlogs(data as IBlog[]);
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleDelete = async (id: string) => {
    if (!confirm("O'chirishni tasdiqlaysizmi?")) return;
    await supabase.from("blogs").delete().eq("id", id);
    fetchBlogs();
  };

  const handleEdit = (blog: IBlog) => {
    setSelected(blog);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setSelected(undefined);
    setModalOpen(true);
  };

  const handleSuccess = () => {
    setModalOpen(false);
    fetchBlogs();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-(--foreground)">Blog</h1>
        <button
          onClick={handleAdd}
          className="px-4 py-2 rounded-lg bg-(--primary) text-white text-sm font-medium hover:opacity-90 transition cursor-pointer"
        >
          + Add Blog
        </button>
      </div>

      <div className="rounded-2xl border border-(--border) overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-(--card) border-b border-(--border)">
            <tr>
              <th className="text-left px-4 py-3 text-(--muted) font-medium">
                Title
              </th>
              <th className="text-left px-4 py-3 text-(--muted) font-medium">
                Tag
              </th>
              <th className="text-left px-4 py-3 text-(--muted) font-medium">
                Read Time
              </th>
              <th className="text-left px-4 py-3 text-(--muted) font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs?.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-8 text-(--muted)">
                  No blogs yet
                </td>
              </tr>
            )}
            {blogs?.map((blog) => (
              <tr
                key={blog.id}
                className="border-b border-(--border) hover:bg-(--card) transition"
              >
                <td className="px-4 py-3 text-(--foreground)">{blog.title}</td>
                <td className="px-4 py-3 text-(--muted)">{blog.tag ?? "—"}</td>
                <td className="px-4 py-3 text-(--muted)">
                  {blog.read_time ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="px-3 py-1 rounded-lg text-xs bg-(--border) text-(--foreground) hover:opacity-80 transition cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="px-3 py-1 rounded-lg text-xs bg-red-500/10 text-red-400 hover:opacity-80 transition cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <BlogModal
          blog={selected}
          onClose={() => setModalOpen(false)}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}
