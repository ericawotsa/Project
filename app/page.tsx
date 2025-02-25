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
  full_bg: boolean;
  letter_style: string;
}

function getBorderColor(color: string) {
  const mapping: { [key: string]: string } = {
    default: "border-gray-400",
    blue: "border-blue-400",
    gray: "border-gray-400",
    purple: "border-purple-400",
    navy: "border-blue-900",
    maroon: "border-red-800",
    pink: "border-pink-400",
    teal: "border-teal-400",
  };
  return mapping[color] || mapping["default"];
}

function getBgColor(color: string) {
  const mapping: { [key: string]: string } = {
    default: "bg-gray-100",
    blue: "bg-blue-100",
    gray: "bg-gray-100",
    purple: "bg-purple-100",
    navy: "bg-blue-100",
    maroon: "bg-red-100",
    pink: "bg-pink-100",
    teal: "bg-teal-100",
  };
  return mapping[color] || mapping["default"];
}

export default function Home() {
  const [recentMemories, setRecentMemories] = useState<Memory[]>([]);
  const [quoteIndex, setQuoteIndex] = useState(0);
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
    "Forget safety. Live where you fear to live."
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
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900">If Only I Sent This</h1>
          <hr className="my-4 border-gray-300" />
          <nav>
            <ul className="flex flex-wrap justify-center gap-6">
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
          <p className="text-2xl italic text-gray-700">{quotes[quoteIndex]}</p>
        </section>

        {/* Recent Memories */}
        <section>
          <h2 className="text-3xl font-semibold mb-6 text-gray-900">Recent Memories</h2>
          {recentMemories.length > 0 ? (
            recentMemories.map((memory) => (
              <Link key={memory.id} href={`/memories/${memory.id}`} className="block">
                <div className={`shadow-lg rounded-lg p-6 mb-6 transition-transform duration-200 hover:scale-105 ${memory.full_bg ? getBgColor(memory.color) : "bg-white/90"} border-l-4 ${getBorderColor(memory.color)}`}>
                  <h3 className="text-2xl font-semibold text-gray-800">To: {memory.recipient}</h3>
                  <p className="mt-4 text-gray-700">{memory.message}</p>
                  {memory.sender && <p className="mt-4 italic text-lg text-gray-600">— {memory.sender}</p>}
                  <div className="mt-4 border-t border-gray-300 pt-2 flex flex-wrap text-gray-500 text-sm items-center">
                    <span>Date: {new Date(memory.created_at).toLocaleDateString()}</span>
                    <span className="mx-2">|</span>
                    <span>Day: {new Date(memory.created_at).toLocaleDateString(undefined, { weekday: 'long' })}</span>
                    <span className="mx-2">|</span>
                    <span>Time: {new Date(memory.created_at).toLocaleTimeString()}</span>
                    <span className="mx-2">|</span>
                    <span>Color: {memory.color}</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-700">No recent memories found.</p>
          )}
          <div className="text-right mt-4">
            <Link href="/memories" className="text-blue-600 hover:underline transition-colors duration-200">View All Memories &rarr;</Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white/90 backdrop-blur-md shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-4 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} If Only I Sent This
        </div>
      </footer>
    </div>
  );
}
