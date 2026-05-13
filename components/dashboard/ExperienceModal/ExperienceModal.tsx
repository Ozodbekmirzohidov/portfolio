"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { IExperience } from "@/types";

interface ExperienceModalProps {
  experience?: IExperience;
  onClose: () => void;
  onSuccess: () => void;
}

export function ExperienceModal({
  experience,
  onClose,
  onSuccess,
}: ExperienceModalProps) {
  const supabase = createClient();

  const [form, setForm] = useState({
    date: experience?.date ?? "",
    title: experience?.title ?? "",
    company: experience?.company ?? "",
    order_index: experience?.order_index ?? 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (experience) {
      const { error } = await supabase
        .from("experiences")
        .update(form)
        .eq("id", experience.id);
      if (error) setError(error.message);
      else onSuccess();
    } else {
      const { error } = await supabase.from("experiences").insert(form);
      if (error) setError(error.message);
      else onSuccess();
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md bg-(--card) rounded-2xl border border-(--border) p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-(--foreground)">
            {experience ? "Edit Experience" : "Add Experience"}
          </h2>
          <button
            onClick={onClose}
            className="text-(--muted) hover:text-(--foreground) transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {[
            {
              name: "date",
              label: "Date (e.g. 2021 - Present)",
              required: true,
            },
            { name: "title", label: "Title", required: true },
            { name: "company", label: "Company", required: true },
            { name: "order_index", label: "Order" },
          ].map((field) => (
            <div key={field.name} className="flex flex-col gap-1">
              <label className="text-sm text-(--muted)">{field.label}</label>
              <input
                type={field.name === "order_index" ? "number" : "text"}
                name={field.name}
                value={form[field.name as keyof typeof form]}
                onChange={handleChange}
                required={field.required}
                className="px-4 py-2 rounded-lg bg-(--background) border border-(--border) text-(--foreground) outline-none focus:border-(--primary) transition text-sm"
              />
            </div>
          ))}

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
