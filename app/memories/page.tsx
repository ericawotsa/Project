"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import MemoryCard from "@/components/MemoryCard";

interface Memory {
  id: string;
  recipient: string;
  message: string;
  sender?: string;
  created_at: string;
  status: string;
  color: string;
  full_bg: boolean;
  letter_style: string;
  animation?: string;
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
  }, []);

  const filteredMemories = memories.filter((memory) =>
    memory.recipient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-300">
      {/* Header */}
      <header className="bg-black/70 backdrop-blur-md shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-6 text-center">
          <h1 className="text-4xl font-serif text-gray-100">Memories</h1>
          <hr className="my-4 border-dashed border-gray-500" />
          <nav>
            <ul className="flex flex-wrap justify-center gap-6 text-gray-400">
              <li>
                <Link href="/" className="hover:text-blue-300 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/submit" className="hover:text-blue-300 transition-colors duration-200">
                  Submit
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-blue-300 transition-colors duration-200">
                  How it Works
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Search Bar */}
      <section className="max-w-4xl mx-auto px-6 py-4">
        <input
          type="text"
          placeholder="Search by recipient..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-500 rounded-lg focus:outline-none focus:border-blue-300 transition duration-200 bg-gray-900 text-gray-100"
        />
      </section>

      {/* Memories List */}
      <main className="flex-grow max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMemories.length > 0 ? (
            filteredMemories.map((memory) => (
              <MemoryCard key={memory.id} memory={memory} />
            ))
          ) : (
            <p className="text-gray-400">No memories found.</p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/70 backdrop-blur-md shadow-lg text-gray-400">
        <div className="max-w-4xl mx-auto px-6 py-4 text-center text-sm">
          © {new Date().getFullYear()} If Only I Sent This
        </div>
      </footer>
    </div>
  );
}
