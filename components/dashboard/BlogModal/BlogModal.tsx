"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { IBlog } from "@/types";

interface BlogModalProps {
  blog?: IBlog;
  onClose: () => void;
  onSuccess: () => void;
}

export function BlogModal({ blog, onClose, onSuccess }: BlogModalProps) {
  const [form, setForm] = useState({
    slug: blog?.slug ?? "",
    title: blog?.title ?? "",
    image: blog?.image ?? "",
    tag: blog?.tag ?? "",
    read_time: blog?.read_time ?? "",
    content: blog?.content ?? "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (blog) {
      const { error } = await supabase
        .from("blogs")
        .update(form)
        .eq("id", blog.id);
      if (error) setError(error.message);
      else onSuccess();
    } else {
      const { error } = await supabase.from("blogs").insert(form);
      if (error) setError(error.message);
      else onSuccess();
    }

    setLoading(false);
  };

  const inputFields = [
    { name: "slug", label: "Slug", required: true },
    { name: "title", label: "Title", required: true },
    { name: "image", label: "Image URL" },
    { name: "tag", label: "Tag" },
    { name: "read_time", label: "Read Time (e.g. 5 min read)" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg bg-(--card) rounded-2xl border border-(--border) p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-(--foreground)">
            {blog ? "Edit Blog" : "Add Blog"}
          </h2>
          <button
            onClick={onClose}
            className="text-(--muted) hover:text-(--foreground) transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {inputFields.map((field) => (
            <div key={field.name} className="flex flex-col gap-1">
              <label className="text-sm text-(--muted)">{field.label}</label>
              <input
                type="text"
                name={field.name}
                value={form[field.name as keyof typeof form]}
                onChange={handleChange}
                required={field.required}
                className="px-4 py-2 rounded-lg bg-(--background) border border-(--border) text-(--foreground) outline-none focus:border-(--primary) transition text-sm"
              />
            </div>
          ))}

          <div className="flex flex-col gap-1">
            <label className="text-sm text-(--muted)">Content</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={6}
              className="px-4 py-2 rounded-lg bg-(--background) border border-(--border) text-(--foreground) outline-none focus:border-(--primary) transition text-sm resize-none"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-lg border border-(--border) text-(--muted) text-sm hover:opacity-80 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 rounded-lg bg-(--primary) text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
