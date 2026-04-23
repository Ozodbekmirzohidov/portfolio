import Image from "next/image";
import Link from "next/link";
import { ISkill } from "@/types";

interface ExpertAreaProps {
  skills: ISkill[];
}

export function ExpertArea({ skills }: ExpertAreaProps) {
  return (
    <div className="bg-white rounded-2xl border border-white/80 shadow-[0_1px_2px_0_rgba(26,31,44,0.25)] overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-gray-900">
            My Expert Area
          </h3>
          <Link
            href="/about"
            className="text-base font-medium text-indigo-500 border-b border-gray-200 no-underline hover:border-indigo-500 transition-all"
          >
            See All →
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="flex flex-col items-center bg-gray-100 rounded-xl px-2 py-3"
            >
              <Image
                src={`/assets/img/icons/${skill.file}.${skill.ext}`}
                alt={skill.name}
                width={40}
                height={40}
                className="object-contain"
              />
              <h4 className="text-xs text-gray-600 mt-2 text-center">
                {skill.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
