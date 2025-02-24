// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

// Import helper functions here or re-define them in this file
function getBorderColor(color: string) { /* ... as above ... */ }
function getBgColor(color: string) { /* ... as above ... */ }
function getExtraLetterStyle(id: string, letterStyle: string) { /* ... as above ... */ }

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
}

export default function Home() {
  const [recentMemories, setRecentMemories] = useState<Memory[]>([]);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const quotes = [
    // 50 quotes as before...
    "I wish I could tell you how much I miss you.",
    "My heart still aches for the words left unsaid.",
    // ... etc.
    "Our love remains, a bittersweet ghost in my heart.",
  ];

  useEffect(() => {
    async function fetchRecentMemories() {
      const { data, error } = await supabase
        .from("memories")
        .select("*")
        .eq("status", "approved")
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

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000); // 5 seconds interval
    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-900">If Only I Sent This</h1>
          <nav>
            <ul className="flex gap-6">
              <li><Link href="/" className="hover:text-blue-600 transition-colors duration-200">Home</Link></li>
              <li><Link href="/memories" className="hover:text-blue-600 transition-colors duration-200">Memories</Link></li>
              <li><Link href="/submit" className="hover:text-blue-600 transition-colors duration-200">Submit</Link></li>
              <li><Link href="/about" className="hover:text-blue-600 transition-colors duration-200">About</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto px-6 py-8">
        {/* Rotating Quote */}
        <section className="mb-10 p-8 bg-white/90 rounded-lg shadow-lg text-center">
          <p className="text-2xl italic text-gray-700">&quot;{quotes[quoteIndex]}&quot;</p>
        </section>

        {/* Recent Memories */}
        <section>
          <h2 className="text-3xl font-semibold mb-6 text-gray-900">Recent Memories</h2>
          {recentMemories.length > 0 ? (
            recentMemories.map((memory) => (
              <Link key={memory.id} href={`/memories/${memory.id}`} className="block">
                <div
                  className={`shadow rounded-lg p-6 mb-6 min-h-[220px] flex flex-col justify-between ${
                    memory.full_bg
                      ? (memory.letter_style === "default"
                          ? getBgColor(memory.color)
                          : getExtraLetterStyle(memory.id, memory.letter_style))
                      : "bg-white/90"
                  } border-l-4 ${getBorderColor(memory.color)} hover:scale-105 transition-transform duration-200`}
                >
                  <div>
                    <h3 className={`text-2xl font-semibold text-gray-800`}>
                      To: {memory.recipient}
                    </h3>
                    <p className="mt-4 text-gray-700">{memory.message}</p>
                    {memory.sender && (
                      <p className="mt-4 italic text-lg text-gray-600">
                        — {memory.sender}
                      </p>
                    )}
                  </div>
                  <div className="mt-6 border-t pt-4 text-gray-500 text-sm flex flex-wrap justify-between">
                    <span>Date: {new Date(memory.created_at).toLocaleDateString()}</span>
                    <span>Day: {new Date(memory.created_at).toLocaleDateString(undefined, { weekday: "long" })}</span>
                    <span>Time: {new Date(memory.created_at).toLocaleTimeString()}</span>
                    <span>Color: {memory.color}</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-700">No recent memories found.</p>
          )}
          <div className="text-right mt-4">
            <Link href="/memories" className="text-blue-600 hover:underline transition-colors duration-200">
              View All Memories &rarr;
            </Link>
          </div>
        </section>
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
