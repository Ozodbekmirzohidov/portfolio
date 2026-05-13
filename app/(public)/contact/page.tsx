"use client";
import { useState } from "react";
import Link from "next/link";
import { ProfileCard } from "@/components/public/ProfileCard";
import { createClient } from "@/lib/supabase/client";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const supabase = createClient();
      const { error } = await supabase.from("messages").insert({
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        is_read: false,
      });

      if (error) throw error;

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-10 px-4 pb-8">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[32%_66%] gap-[26px]">

          {/* Chap — Profile Card */}
          <div className="w-full">
            <ProfileCard />
          </div>

          {/* O'ng — Content */}
          <div className="w-full h-full">
            <div className="bg-white rounded-2xl border border-white/80 shadow-[0_1px_2px_0_rgba(26,31,44,0.25)] overflow-hidden h-full">
              <div className="px-10 pt-12 pb-10">

                {/* Top info */}
                <div className="mb-12">
                  <h1 className="text-[40px] font-bold text-gray-900 mb-6 leading-[1.3]">
                    Let&apos;s Work{" "}
                    <span className="text-indigo-500">Together!</span>
                  </h1>
                  <p className="max-w-[480px] text-2xl text-gray-500 leading-[1.4]">
                    Have a project in mind? I&apos;d love to hear from you. Send
                    me a message and I&apos;ll get back to you as soon as
                    possible.
                  </p>
                </div>

                {/* Contact info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-7">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-1.5">
                      Email
                    </h3>
                    <Link
                      href="mailto:ozodbek.mirzohidov@icloud.com"
                      className="text-lg text-gray-500 no-underline transition-colors hover:text-indigo-500"
                    >
                      ozodbek.mirzohidov@icloud.com
                    </Link>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-1.5">
                      Telegram
                    </h3>
                    <Link
                      href="https://t.me/mirzohidov_1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg text-gray-500 no-underline transition-colors hover:text-indigo-500"
                    >
                      @mirzohidov_1
                    </Link>
                  </div>
                </div>

                {/* Form */}
                <div className="bg-gray-50 rounded-2xl p-7">
                  <form onSubmit={handleSubmit}>
                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-900">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter your name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          className="px-4 py-3 border border-[#dbdfe5] rounded-xl text-base text-gray-500 bg-white outline-none transition-all placeholder:text-[#adb5bd] focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(71,112,255,0.1)]"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-900">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          className="px-4 py-3 border border-[#dbdfe5] rounded-xl text-base text-gray-500 bg-white outline-none transition-all placeholder:text-[#adb5bd] focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(71,112,255,0.1)]"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="flex flex-col gap-2 mb-4">
                      <label className="text-sm font-medium text-gray-900">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        className="px-4 py-3 border border-[#dbdfe5] rounded-xl text-base text-gray-500 bg-white outline-none transition-all placeholder:text-[#adb5bd] focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(71,112,255,0.1)]"
                      />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-900">
                        Message
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        placeholder="Type details about your inquiry"
                        value={form.message}
                        onChange={handleChange}
                        required
                        className="px-4 py-3 border border-[#dbdfe5] rounded-xl text-base text-gray-500 bg-white outline-none transition-all placeholder:text-[#adb5bd] focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(71,112,255,0.1)] resize-y"
                      />
                    </div>

                    {/* Success / Error xabar */}
                    {status === "success" && (
                      <p className="mt-4 text-sm font-medium text-green-600">
                        ✅ Xabaringiz yuborildi! Tez orada javob beraman.
                      </p>
                    )}
                    {status === "error" && (
                      <p className="mt-4 text-sm font-medium text-red-500">
                        ❌ Xatolik yuz berdi. Qayta urinib ko&apos;ring.
                      </p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full flex items-center justify-center gap-2 mt-5 px-4 py-4 bg-indigo-500 text-white border-none rounded-xl text-[15px] font-semibold cursor-pointer transition-colors hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === "loading" ? "Yuborilmoqda..." : "Send Message"}
                      {status !== "loading" && (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path
                            d="M17.5 11.6665V6.6665H12.5"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17.5 6.6665L10 14.1665L2.5 6.6665"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                  </form>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}