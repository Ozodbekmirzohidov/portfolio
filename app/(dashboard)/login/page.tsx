"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase"; 
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-(--background)">
      <div className="w-full max-w-md p-8 rounded-2xl bg-(--card) border border-(--border)">
        <h1 className="text-2xl font-bold mb-2 text-(--foreground)">
          Admin Login
        </h1>
        <p className="text-(--muted) mb-6 text-sm">
          Dashboard ga kirish uchun login qiling
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-(--muted)">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              required
              className="px-4 py-2.5 rounded-lg bg-(--background) border border-(--border) text-(--foreground) outline-none focus:border-(--primary) transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-(--muted)">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="px-4 py-2.5 rounded-lg bg-(--background) border border-(--border) text-(--foreground) outline-none focus:border-[var(--primary) transition"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 py-2.5 rounded-lg bg-(--primary) text-white font-semibold hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Kirish..." : "Kirish"}
          </button>
        </form>
      </div>
    </main>
  );
}
