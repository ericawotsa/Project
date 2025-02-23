// app/submit/page.tsx
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function Submit() {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!recipient || !message) {
      setError("Please fill in all required fields.");
      return;
    }

    const { error } = await supabase
      .from("memories")
      .insert([{ recipient, message, sender }]);

    if (error) {
      setError("Error submitting your memory.");
      console.error(error);
    } else {
      setSubmitted(true);
      // Clear form fields
      setRecipient("");
      setMessage("");
      setSender("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Submit a Memory</h1>
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
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto px-6 py-8">
        {submitted ? (
          <div className="bg-green-100 text-green-800 p-6 rounded-lg mb-6 text-center">
            Thank you for your submission!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <p className="text-red-600 text-center font-medium">{error}</p>
            )}

            <div>
              <label className="block font-medium text-gray-700">
                Recipient&apos;s Name (required):
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                required
                className="w-full mt-2 p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">
                Message (required):
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="w-full mt-2 p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>

            <div>
              <label className="block font-medium text-gray-700">
                Your Name (optional):
              </label>
              <input
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Submit Memory
              </button>
            </div>
          </form>
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
