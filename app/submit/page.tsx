// app/submit/page.tsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

const colorOptions = [
  { value: "default", label: "Default" },
  { value: "blue", label: "Blue" },
  { value: "gray", label: "Gray" },
  { value: "purple", label: "Purple" },
  { value: "navy", label: "Navy" },
  { value: "maroon", label: "Maroon" },
  { value: "pink", label: "Pink" },
  { value: "teal", label: "Teal" },
];

const letterStyleOptions = [
  { value: "default", label: "Default" },
  { value: "sad", label: "Sad" },
  { value: "love", label: "Love" },
];

export default function Submit() {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState("");
  const [color, setColor] = useState("default");
  const [letterStyle, setLetterStyle] = useState("default");
  const [fullBg, setFullBg] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [previewStyle, setPreviewStyle] = useState("");

  const sadStyles = ["sad-style-1", "sad-style-2", "sad-style-3", "sad-style-4"];
  const loveStyles = ["love-style-1", "love-style-2", "love-style-3", "love-style-4"];

  useEffect(() => {
    if(letterStyle === "sad") {
      const chosen = sadStyles[Math.floor(Math.random() * sadStyles.length)];
      setPreviewStyle(chosen);
    } else if(letterStyle === "love") {
      const chosen = loveStyles[Math.floor(Math.random() * loveStyles.length)];
      setPreviewStyle(chosen);
    } else {
      setPreviewStyle("");
    }
  }, [letterStyle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!recipient || !message) {
      setError("Please fill in all required fields.");
      return;
    }

    const status = "pending";
    const { error } = await supabase
      .from("memories")
      .insert([{ recipient, message, sender, status, color, full_bg: fullBg, letter_style: letterStyle }]);

    if (error) {
      setError("Error submitting your memory.");
      console.error(error);
    } else {
      setSubmitted(true);
      setRecipient("");
      setMessage("");
      setSender("");
      setColor("default");
      setLetterStyle("default");
      setFullBg(false);
    }
  };

  // Helper functions for styling
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

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-900">Submit a Memory</h1>
          <nav>
            <ul className="flex gap-6">
              <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
              <li><Link href="/memories" className="hover:text-blue-600">Memories</Link></li>
              <li><Link href="/about" className="hover:text-blue-600">About</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto px-6 py-8">
        {submitted ? (
          <div className="bg-gradient-to-r from-green-300 to-green-500 text-white p-8 rounded-lg mb-6 text-center">
            Thank you for your submission! Your memory is pending approval.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 bg-white/90 p-8 rounded-lg shadow-lg">
            {error && <p className="text-red-600 text-center font-medium">{error}</p>}

            <div>
              <label className="block font-medium text-gray-700">Recipient&apos;s Name (required):</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                required
                className="w-full mt-2 p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors duration-200"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Message (required):</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="w-full mt-2 p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors duration-200"
              ></textarea>
            </div>

            <div>
              <label className="block font-medium text-gray-700">Your Name (optional):</label>
              <input
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors duration-200"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Select a Color for Your Message (optional):</label>
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors duration-200"
              >
                {colorOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700">Select a Letter Style (optional):</label>
              <select
                value={letterStyle}
                onChange={(e) => setLetterStyle(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors duration-200"
              >
                {letterStyleOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={fullBg}
                onChange={(e) => setFullBg(e.target.checked)}
                id="fullBg"
                className="mr-2"
              />
              <label htmlFor="fullBg" className="font-medium text-gray-700">
                Apply color to full card background
              </label>
            </div>

            {/* Live Preview */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Preview</h2>
              <div className={`shadow-lg rounded-lg p-6 mb-6 transition-transform duration-200 
                  ${fullBg ? getBgColor(color) : "bg-white/90"} 
                  border-l-4 ${getBorderColor(color)} 
                  ${letterStyle !== "default" ? previewStyle : ""}`}>
                <h3 className="text-2xl font-semibold text-gray-800">To: {recipient || "Recipient Name"}</h3>
                <p className="mt-4 text-gray-700">{message || "Your message here..."}</p>
                {sender && <p className="mt-4 italic text-lg text-gray-600">— {sender}</p>}
                <div className="mt-4 border-t pt-2 flex flex-wrap text-gray-500 text-sm items-center">
                  <span>Date: {new Date().toLocaleDateString()}</span>
                  <span className="mx-2">|</span>
                  <span>Day: {new Date().toLocaleDateString(undefined, { weekday: 'long' })}</span>
                  <span className="mx-2">|</span>
                  <span>Time: {new Date().toLocaleTimeString()}</span>
                  <span className="mx-2">|</span>
                  <span>Color: {color}</span>
                  <span className="mx-2">|</span>
                  <span>Letter Style: {letterStyle}</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-800 transition-colors duration-200"
              >
                Submit Memory
              </button>
            </div>
          </form>
        )}
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
