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

export default function Home() {
  const [recentMemories, setRecentMemories] = useState<Memory[]>([]);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const quotes = [
    "The wound is the place where the Light enters you.",
    "Let yourself be silently drawn by the strange pull of what you really love.",
    "When you let go, you feel free.",
    "Don’t grieve. Anything you lose comes round in another form.",
    "The minute I heard my first love story, I started looking for you, not knowing how blind that was.",
    "Why do you stay in prison when the door is so wide open?",
    "The soul has been given its own ears to hear things the mind does not understand.",
    "Let the beauty we love be what we do.",
    "Everything that is made beautiful and fair is made for the eye of one who sees.",
    "Forget safety. Live where you fear to live.",
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
    }, 5000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Welcome Modal */}
      {showWelcome && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 p-8 rounded-lg text-center">
            <h2 className="text-3xl font-bold text-red-400 mb-4">Welcome to the Graveyard of Memories</h2>
            <p className="text-gray-300 mb-6">A place where unsent words find solace in darkness. If you're new, please visit the "How It Works" page to learn about this melancholic sanctuary.</p>
            <button onClick={() => setShowWelcome(false)} className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition">
              OK
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-6 text-center">
          <h1 className="text-4xl font-bold text-gray-100">If Only I Sent This</h1>
          <hr className="my-4 border-gray-700" />
          <nav>
            <ul className="flex flex-wrap justify-center gap-6">
              <li>
                <Link href="/" className="hover:text-red-400 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/memories" className="hover:text-red-400 transition-colors duration-200">
                  Memories
                </Link>
              </li>
              <li>
                <Link href="/submit" className="hover:text-red-400 transition-colors duration-200">
                  Submit
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-red-400 transition-colors duration-200">
                  How It Works
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Rotating Quote */}
      <section
        className="mb-10 p-6 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg text-center flex items-center justify-center"
        style={{ minHeight: "4rem" }}
      >
        <p className="w-full text-xl md:text-2xl italic text-gray-300 px-2 break-words whitespace-normal">
          {quotes[quoteIndex]}
        </p>
      </section>

      {/* Recent Memories */}
      <main className="flex-grow max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-semibold mb-6 text-gray-100">Recent Memories</h2>
        {recentMemories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentMemories.map((memory) => (
              <MemoryCard key={memory.id} memory={memory} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No recent memories found.</p>
        )}
        <div className="text-right mt-4">
          <Link href="/memories" className="text-red-400 hover:underline transition-colors duration-200">
            View All Memories &rarr;
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} If Only I Sent This
        </div>
      </footer>
    </div>
  );
}
