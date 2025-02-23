// app/memories/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function Memories() {
  const [memories, setMemories] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMemories = async () => {
    let query = supabase
      .from('memories')
      .select('*')
      .order('created_at', { ascending: false });

    if (searchTerm) {
      query = query.ilike('recipient', `%${searchTerm}%`);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Error fetching memories:', error);
    } else {
      setMemories(data || []);
    }
  };

  useEffect(() => {
    fetchMemories();
  }, [searchTerm]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-sm shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Memories</h1>
          <nav>
            <ul className="flex gap-4">
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
      <main className="flex-grow max-w-3xl mx-auto px-4 py-8">
        <input
          type="text"
          placeholder="Search by recipient name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-6 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
        />
        {memories.length > 0 ? (
          memories.map((memory) => (
            <div
              key={memory.id}
              className="bg-white/80 shadow rounded-lg p-4 mb-4 border-l-4 border-pink-300 hover:scale-[101%] transition-transform duration-200"
            >
              <h3 className="text-lg font-semibold text-gray-900">To: {memory.recipient}</h3>
              <p className="mt-2 text-gray-700">{memory.message}</p>
              {memory.sender && (
                <p className="mt-2 italic text-sm text-gray-600">— {memory.sender}</p>
              )}
              <small className="block mt-2 text-gray-500">
                {new Date(memory.created_at).toLocaleString()}
              </small>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No memories found.</p>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/70 backdrop-blur-sm shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 text-sm text-gray-600">
          &copy; {new Date().getFullYear()} If Only I Sent This
        </div>
      </footer>
    </div>
  );
}
