// app/memories/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

interface Memory {
  id: string;
  recipient: string;
  message: string;
  sender?: string;
  created_at: string;
  status: string;
}

export default function MemoryDetail() {
  const { id } = useParams();
  const [memory, setMemory] = useState<Memory | null>(null);

  useEffect(() => {
    async function fetchMemory() {
      const { data, error } = await supabase
        .from("memories")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error(error);
      } else {
        setMemory(data);
      }
    }
    fetchMemory();
  }, [id]);

  if (!memory) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-900">Memory Detail</h1>
          <nav>
            <ul className="flex gap-6">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/memories" className="hover:text-blue-600 transition-colors duration-200">
                  Back to Memories
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white/90 shadow rounded-lg p-6 mb-6 border-l-4 border-blue-400">
          <h2 className="text-3xl font-semibold text-gray-800">
            To: {memory.recipient}
          </h2>
          <p className="mt-4 text-gray-700">{memory.message}</p>
          {memory.sender && (
            <p className="mt-4 italic text-lg text-gray-600">
              — {memory.sender}
            </p>
          )}
          <small className="block mt-4 text-gray-500">
            {new Date(memory.created_at).toLocaleString()}
          </small>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-4 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} If Only I Sent This
        </div>
      </footer>
    </div>
  );
}
