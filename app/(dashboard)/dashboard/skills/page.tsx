"use client";
import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { ISkill } from "@/types";
import { SkillModal } from "@/components/dashboard/SkillModal";

export default function SkillsPage() {
  const supabase = createClient();

  const [skills, setSkills] = useState<ISkill[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<ISkill | undefined>();

  const fetchSkills = useCallback(async () => {
    const { data } = await supabase
      .from("skills")
      .select("*")
      .order("order_index");
    setSkills(data as ISkill[]);
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const handleDelete = async (id: string) => {
    if (!confirm("O'chirishni tasdiqlaysizmi?")) return;
    await supabase.from("skills").delete().eq("id", id);
    fetchSkills();
  };

  const handleEdit = (skill: ISkill) => {
    setSelected(skill);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setSelected(undefined);
    setModalOpen(true);
  };

  const handleSuccess = () => {
    setModalOpen(false);
    fetchSkills();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-(--foreground)">Skills</h1>
        <button
          onClick={handleAdd}
          className="px-4 py-2 rounded-lg bg-(--primary) text-white text-sm font-medium hover:opacity-90 transition cursor-pointer"
        >
          + Add Skill
        </button>
      </div>

      <div className="rounded-2xl border border-(--border) overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-(--card) border-b border-(--border)">
            <tr>
              <th className="text-left px-4 py-3 text-(--muted) font-medium">
                Name
              </th>
              <th className="text-left px-4 py-3 text-(--muted) font-medium">
                File
              </th>
              <th className="text-left px-4 py-3 text-(--muted) font-medium">
                Ext
              </th>
              <th className="text-left px-4 py-3 text-(--muted) font-medium">
                Order
              </th>
              <th className="text-left px-4 py-3 text-(--muted) font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {skills?.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-(--muted)">
                  No skills yet
                </td>
              </tr>
            )}
            {skills?.map((skill) => (
              <tr
                key={skill.id}
                className="border-b border-(--border) hover:bg-(--card) transition"
              >
                <td className="px-4 py-3 text-(--foreground)">{skill.name}</td>
                <td className="px-4 py-3 text-(--muted)">{skill.file}</td>
                <td className="px-4 py-3 text-(--muted)">{skill.ext}</td>
                <td className="px-4 py-3 text-(--muted)">
                  {skill.order_index}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(skill)}
                      className="px-3 py-1 rounded-lg text-xs bg-(--border) text-(--foreground) hover:opacity-80 transition cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(skill.id)}
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
        <SkillModal
          skill={selected}
          onClose={() => setModalOpen(false)}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}
