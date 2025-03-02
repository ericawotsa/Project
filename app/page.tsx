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
  const [showWelcome, setShowWelcome] = useState(false);
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

    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem("hasSeenWelcome", "true");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-800 via-gray-900 to-black text-gray-300">
      {/* Welcome Modal */}
      {showWelcome && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 backdrop-blur-md">
          <div className="bg-gray-900 p-8 rounded-lg shadow-xl text-center max-w-md w-full border border-gray-700">
            <h2 className="text-3xl font-serif text-gray-100 mb-4">Welcome to the Graveyard of Memories</h2>
            <p className="text-lg text-gray-400 mb-6">
              A resting place for unsent words. New here? Visit "How it Works" to unearth the silence.
            </p>
            <button
              onClick={handleCloseWelcome}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:from-blue-700 hover:to-blue-900 transition duration-200"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-black/70 backdrop-blur-md shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-6 text-center">
          <h1 className="text-4xl font-serif text-gray-100">If Only I Sent This</h1>
          <hr className="my-4 border-dashed border-gray-500" />
          <nav>
            <ul className="flex flex-wrap justify-center gap-6 text-gray-400">
              <li>
                <Link href="/" className="hover:text-blue-300 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/memories" className="hover:text-blue-300 transition-colors duration-200">
                  Memories
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

      {/* Rotating Quote */}
      <section
        className="mb-10 p-4 bg-black/70 rounded-lg shadow-lg text-center flex items-center justify-center border border-gray-700"
        style={{ minHeight: "4rem" }}
      >
        <p className="w-full text-xl md:text-2xl italic text-gray-400 px-2 break-words whitespace-normal font-serif">
          {quotes[quoteIndex]}
        </p>
      </section>

      {/* Recent Memories */}
      <main className="flex-grow max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-serif mb-6 text-gray-100">Recent Memories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentMemories.length > 0 ? (
            recentMemories.map((memory) => (
              <MemoryCard key={memory.id} memory={memory} />
            ))
          ) : (
            <p className="text-gray-400">No recent memories found.</p>
          )}
        </div>
        <div className="text-right mt-4">
          <Link href="/memories" className="text-blue-300 hover:underline transition-colors duration-200">
            View All Memories →
          </Link>
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
