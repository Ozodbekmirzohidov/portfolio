"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ICertificate } from "@/types";

interface CertificateModalProps {
  certificate?: ICertificate;
  onClose: () => void;
  onSuccess: () => void;
}

export function CertificateModal({
  certificate,
  onClose,
  onSuccess,
}: CertificateModalProps) {
  const supabase = createClient();

  const [form, setForm] = useState({
    title: certificate?.title ?? "",
    issuer: certificate?.issuer ?? "",
    date: certificate?.date ?? "",
    image: certificate?.image ?? "",
    credential_link: certificate?.credential_link ?? "",
    order_index: certificate?.order_index ?? 0,
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

    if (certificate) {
      const { error } = await supabase
        .from("certificates")
        .update(form)
        .eq("id", certificate.id);
      if (error) setError(error.message);
      else onSuccess();
    } else {
      const { error } = await supabase.from("certificates").insert(form);
      if (error) setError(error.message);
      else onSuccess();
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg bg-(--card) rounded-2xl border border-(--border) p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-(--foreground)">
            {certificate ? "Edit Certificate" : "Add Certificate"}
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
            { name: "title", label: "Title", required: true },
            { name: "issuer", label: "Issuer (Kimdan)", required: true },
            { name: "date", label: "Date (2024)", required: true },
            { name: "image", label: "Image URL" },
            { name: "credential_link", label: "Credential Link" },
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
