"use client";
import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { IMessage } from "@/types";

export default function MessagesPage() {
  const [messages, setMessages] = useState<IMessage[]>([]);
const supabase = createClient();

  const fetchMessages = useCallback(async () => {
    
      const { data } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });
    setMessages(data as IMessage[]);
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleDelete = async (id: string) => {
    if (!confirm("O'chirishni tasdiqlaysizmi?")) return;
    await supabase.from("messages").delete().eq("id", id);
    fetchMessages();
  };

  const handleRead = async (id: string) => {
    await supabase.from("messages").update({ is_read: true }).eq("id", id);
    fetchMessages();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-(--foreground)">Messages</h1>
      </div>

      <div className="rounded-2xl border border-(--border) overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-(--card) border-b border-(--border)">
            <tr>
              <th className="text-left px-4 py-3 text-(--muted) font-medium">
                Name
              </th>
              <th className="text-left px-4 py-3 text-(--muted) font-medium">
                Email
              </th>
              <th className="text-left px-4 py-3 text-(--muted) font-medium">
                Subject
              </th>
              <th className="text-left px-4 py-3 text-(--muted) font-medium">
                Message
              </th>
              <th className="text-left px-4 py-3 text-(--muted) font-medium">
                Status
              </th>
              <th className="text-left px-4 py-3 text-(--muted) font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {messages?.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-(--muted)">
                  No messages yet
                </td>
              </tr>
            )}
            {messages?.map((message) => (
              <tr
                key={message.id}
                className={`border-b border-(--border) transition ${
                  !message.is_read ? "bg-(--card)" : "hover:bg-(--card)"
                }`}
              >
                <td className="px-4 py-3 text-(--foreground) font-medium">
                  {message.name}
                </td>
                <td className="px-4 py-3 text-(--muted)">{message.email}</td>
                <td className="px-4 py-3 text-(--muted)">
                  {message.subject ?? "—"}
                </td>
                <td className="px-4 py-3 text-(--muted) max-w-xs truncate">
                  {message.message}
                </td>
                <td className="px-4 py-3">
                  {message.is_read ? (
                    <span className="text-xs text-green-400">Read</span>
                  ) : (
                    <span className="text-xs text-(--primary) font-medium">
                      New
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {!message.is_read && (
                      <button
                        onClick={() => handleRead(message.id)}
                        className="px-3 py-1 rounded-lg text-xs bg-(--border) text-(--foreground) hover:opacity-80 transition cursor-pointer"
                      >
                        Mark Read
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(message.id)}
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
    </div>
  );
}
