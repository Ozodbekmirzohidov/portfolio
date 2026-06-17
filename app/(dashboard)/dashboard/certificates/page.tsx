"use client";
import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { ICertificate } from "@/types";
import { CertificateModal } from "@/components/dashboard/CertificateModal";

export default function CertificatesPage() {
  const supabase = createClient();

  const [certificates, setCertificates] = useState<ICertificate[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<ICertificate | undefined>();

  const fetchCertificates = useCallback(async () => {
    const { data } = await supabase
      .from("certificates")
      .select("*")
      .order("order_index");
    setCertificates(data as ICertificate[]);
  }, []);

  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates]);

  const handleDelete = async (id: string) => {
    if (!confirm("O'chirishni tasdiqlaysizmi?")) return;
    await supabase.from("certificates").delete().eq("id", id);
    await fetch("/api/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tag: "certificates" }),
    });
    fetchCertificates();
  };

  const handleEdit = (certificate: ICertificate) => {
    setSelected(certificate);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setSelected(undefined);
    setModalOpen(true);
  };

  const handleSuccess = async () => {
    setModalOpen(false);
    await fetch("/api/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tag: "certificates" }),
    });
    fetchCertificates();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-(--foreground)">Certificates</h1>
        <button
          onClick={handleAdd}
          className="px-4 py-2 rounded-lg bg-(--primary) text-white text-sm font-medium hover:opacity-90 transition cursor-pointer"
        >
          + Add Certificate
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
                Issuer
              </th>
              <th className="text-left px-4 py-3 text-(--muted) font-medium">
                Date
              </th>
              <th className="text-left px-4 py-3 text-(--muted) font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {certificates?.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-8 text-(--muted)">
                  No certificates yet
                </td>
              </tr>
            )}
            {certificates?.map((cert) => (
              <tr
                key={cert.id}
                className="border-b border-(--border) hover:bg-(--card) transition"
              >
                <td className="px-4 py-3 text-(--foreground)">{cert.title}</td>
                <td className="px-4 py-3 text-(--muted)">{cert.issuer}</td>
                <td className="px-4 py-3 text-(--muted)">{cert.date}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(cert)}
                      className="px-3 py-1 rounded-lg text-xs bg-(--border) text-(--foreground) hover:opacity-80 transition cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cert.id)}
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
        <CertificateModal
          certificate={selected}
          onClose={() => setModalOpen(false)}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}
