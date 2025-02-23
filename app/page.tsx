// app/page.tsx
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
}

export default function Home() {
  const [recentMemories, setRecentMemories] = useState<Memory[]>([]);
  const quotes = [
    "The silence between us is louder than words.",
    "I wish I could have told you what my heart felt.",
    "Sometimes the things unsaid hurt the most.",
    "Every missed message is a story left untold.",
    "The regret of never saying goodbye echoes forever."
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  useEffect(() => {
    async function fetchRecentMemories() {
      const { data, error } = await supabase
        .from("memories")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);
      if (error) {
        console.error("Error fetching recent memories:", error);
      } else {
        setRecentMemories(data || []);
      }
    }
    fetchRecentMemories();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
            If Only I Sent This
          </h1>
          <nav>
            <ul className="flex gap-6">
              <li>
                <Link
                  href="/memories"
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  Memories
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
        {/* Random Quote */}
        <section className="mb-10 p-6 bg-white/90 rounded shadow text-center">
          <p className="text-xl italic text-gray-700">"{randomQuote}"</p>
        </section>

        {/* Recent Memories */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Recent Memories
          </h2>
          {recentMemories.length > 0 ? (
            recentMemories.map((memory) => (
              <div
                key={memory.id}
                className="bg-white/90 shadow rounded-lg p-6 mb-6 border-l-4 border-blue-300"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  To: {memory.recipient}
                </h3>
                <p className="mt-2 text-gray-700">{memory.message}</p>
                {memory.sender && (
                  <p className="mt-2 italic text-sm text-gray-600">
                    — {memory.sender}
                  </p>
                )}
                <small className="block mt-2 text-gray-500">
                  {new Date(memory.created_at).toLocaleString()}
                </small>
              </div>
            ))
          ) : (
            <p className="text-gray-700">No recent memories found.</p>
          )}
          <div className="text-right mt-4">
            <Link
              href="/memories"
              className="text-blue-600 hover:underline transition-colors duration-200"
            >
              View all memories &rarr;
            </Link>
          </div>
        </section>
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
