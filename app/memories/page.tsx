// app/memories/page.tsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

interface Memory {
  id: string;
  recipient: string;
  message: string;
  sender?: string;
  created_at: string;
}

// Predefined list of Tailwind border color classes
const borderColors = [
  "border-pink-300",
  "border-blue-300",
  "border-green-300",
  "border-yellow-300",
  "border-purple-300",
];

export default function Memories() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchMemories() {
      let query = supabase
        .from("memories")
        .select("*")
        .order("created_at", { ascending: false });

      if (searchTerm) {
        query = query.ilike("recipient", `%${searchTerm}%`);
      }

      const { data, error } = await query;
      if (error) {
        console.error("Error fetching memories:", error);
      } else {
        setMemories(data || []);
      }
    }
    fetchMemories();
  }, [searchTerm]);

  // Function to consistently assign a color based on memory.id
  const getColorClass = (id: string) => {
    const code = id.charCodeAt(0);
    return borderColors[code % borderColors.length];
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Memories</h1>
          <nav>
            <ul className="flex gap-6">
              <li>
                <Link
                  href="/"
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/submit"
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  Submit
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto px-6 py-8">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by recipient name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
          />
        </div>
        {memories.length > 0 ? (
          memories.map((memory) => (
            <div
              key={memory.id}
              className={`bg-white/90 shadow rounded-lg p-6 mb-6 border-l-8 ${getColorClass(
                memory.id
              )} hover:scale-[102%] transition-transform duration-200`}
            >
              <h3 className="text-2xl font-semibold text-gray-800">
                To: {memory.recipient}
              </h3>
              <p className="mt-3 text-gray-700">{memory.message}</p>
              {memory.sender && (
                <p className="mt-3 italic text-lg text-gray-600">
                  — {memory.sender}
                </p>
              )}
              <small className="block mt-3 text-gray-500">
                {new Date(memory.created_at).toLocaleString()}
              </small>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No memories found.</p>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} If Only I Sent This
        </div>
      </footer>
    </div>
  );
}
