"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IExperience } from "@/types";

interface WorkExperienceProps {
  experiences: IExperience[];
}

export function WorkExperience({ experiences }: WorkExperienceProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [listHeight, setListHeight] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (listRef.current) {
        setListHeight(listRef.current.scrollHeight / 2);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [experiences]);

  return (
    <div className="bg-white rounded-2xl border border-white/80 shadow-[0_1px_2px_0_rgba(26,31,44,0.25)] overflow-hidden">
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          Work Experience
        </h3>
        <div className="overflow-hidden" style={{ height: listHeight }}>
          <motion.ul
            ref={listRef}
            className="flex flex-col list-none p-0 m-0"
            animate={{ y: [0, -listHeight] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            {[...Array(2)].map((_, i) => (
              <div key={i}>
                {experiences.map((exp) => (
                  <li key={exp.title + i} className="flex flex-col mb-4">
                    <p className="text-sm font-medium text-gray-500">
                      {exp.date}
                    </p>
                    <h4 className="text-base font-semibold text-gray-900 leading-8">
                      {exp.title}
                    </h4>
                    <h6 className="text-sm font-normal text-gray-500 mt-0.5">
                      {exp.company}
                    </h6>
                  </li>
                ))}
              </div>
            ))}
          </motion.ul>
        </div>
      </div>
    </div>
  );
}
