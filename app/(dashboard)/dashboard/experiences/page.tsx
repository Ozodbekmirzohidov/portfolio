"use client";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { IExperience } from "@/types";
import { ExperienceModal } from "@/components/dashboard/ExperienceModal";

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<IExperience | undefined>();

  const fetchExperiences = useCallback(async () => {
    const { data } = await supabase
      .from("experiences")
      .select("*")
      .order("order_index");
    setExperiences(data as IExperience[]);
  }, []);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  const handleDelete = async (id: string) => {
    if (!confirm("O'chirishni tasdiqlaysizmi?")) return;
    await supabase.from("experiences").delete().eq("id", id);
    fetchExperiences();
  };

  const handleEdit = (experience: IExperience) => {
    setSelected(experience);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setSelected(undefined);
    setModalOpen(true);
  };

  const handleSuccess = () => {
    setModalOpen(false);
    fetchExperiences();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-(--foreground)">Experiences</h1>
        <button
          onClick={handleAdd}
          className="px-4 py-2 rounded-lg bg-(--primary) text-white text-sm font-medium hover:opacity-90 transition cursor-pointer"
        >
          + Add Experience
        </button>
      </div>

      <div className="rounded-2xl border border-(--border) overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-(--card) border-b border-(--border)">
            <tr>
              <th className="text-left px-4 py-3 text-(--muted) font-medium">
                Date
              </th>
              <th className="text-left px-4 py-3 text-(--muted) font-medium">
                Title
              </th>
              <th className="text-left px-4 py-3 text-(--muted) font-medium">
                Company
              </th>
              <th className="text-left px-4 py-3 text-(--muted) font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {experiences?.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-8 text-(--muted)">
                  No experiences yet
                </td>
              </tr>
            )}
            {experiences?.map((experience) => (
              <tr
                key={experience.id}
                className="border-b border-(--border) hover:bg-(--card) transition"
              >
                <td className="px-4 py-3 text-(--muted)">{experience.date}</td>
                <td className="px-4 py-3 text-(--foreground)">
                  {experience.title}
                </td>
                <td className="px-4 py-3 text-(--muted)">
                  {experience.company}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(experience)}
                      className="px-3 py-1 rounded-lg text-xs bg-(--border) text-(--foreground) hover:opacity-80 transition cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(experience.id)}
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
        <ExperienceModal
          experience={selected}
          onClose={() => setModalOpen(false)}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}
