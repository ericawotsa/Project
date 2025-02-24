// app/memories/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

interface Memory {
  id: string;
  recipient: string;
  message: string;
  sender?: string;
  created_at: string;
  status: string;
  color: string;
}

export default function Memories() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchMemories() {
      const { data, error } = await supabase
        .from("memories")
        .select("*")
        .eq("status", "approved")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching memories:", error);
      } else {
        setMemories(data || []);
      }
    }
    fetchMemories();
  }, [searchTerm]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-900">Memories</h1>
          <nav>
            <ul className="flex gap-6">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/memories" className="hover:text-blue-600 transition-colors duration-200">
                  Memories
                </Link>
              </li>
              <li>
                <Link href="/submit" className="hover:text-blue-600 transition-colors duration-200">
                  Submit
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600 transition-colors duration-200">
                  About
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
            <Link key={memory.id} href={`/memories/${memory.id}`} className="block">
              <div className={`bg-white/90 shadow rounded-lg p-6 mb-6 border-l-8 ${
                  memory.color === "blue"
                    ? "border-blue-400"
                    : memory.color === "gray"
                    ? "border-gray-400"
                    : memory.color === "purple"
                    ? "border-purple-400"
                    : memory.color === "black"
                    ? "border-black"
                    : memory.color === "navy"
                    ? "border-blue-900"
                    : memory.color === "maroon"
                    ? "border-red-800"
                    : "border-blue-400"
                } hover:scale-[102%] transition-transform duration-200`}>
                <h3 className="text-2xl font-semibold text-gray-800">To: {memory.recipient}</h3>
                <p className="mt-3 text-gray-700">{memory.message}</p>
                {memory.sender && (
                  <p className="mt-3 italic text-lg text-gray-600">— {memory.sender}</p>
                )}
                <div className="mt-4 text-gray-500 text-sm">
                  <p>Date: {new Date(memory.created_at).toLocaleDateString()}</p>
                  <p>Day: {new Date(memory.created_at).toLocaleDateString(undefined, { weekday: 'long' })}</p>
                  <p>Time: {new Date(memory.created_at).toLocaleTimeString()}</p>
                  <p>Selected Color: {memory.color}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-700">No memories found.</p>
        )}
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
