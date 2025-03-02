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

export default function MemoriesPage() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchMemories() {
      let query = supabase
        .from("memories")
        .select("*")
        .eq("status", "approved")
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

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-100/90 backdrop-blur-md shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Memories</h1>
          <hr className="my-4 border-gray-400" />
          <nav>
            <ul className="flex flex-wrap justify-center gap-6">
              <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
              <li><Link href="/submit" className="hover:text-blue-600">Submit</Link></li>
              <li><Link href="/how-it-works" className="hover:text-blue-600">How It Works</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-4xl mx-auto px-6 py-8">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by recipient name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {memories.length > 0 ? (
            memories.map((memory) => (
              <MemoryCard key={memory.id} memory={memory} />
            ))
          ) : (
            <p className="text-gray-700 col-span-2">No memories found.</p>
          )}
        </div>
      </main>

      <footer className="bg-gray-100/90 backdrop-blur-md shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-4 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} If Only I Sent This
        </div>
      </footer>
    </div>
  );
}
