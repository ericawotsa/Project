"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function SubmitPage() {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState("");
  const [color, setColor] = useState("default");
  const [fullBg, setFullBg] = useState(false);
  const [letterStyle, setLetterStyle] = useState("normal");
  const [animation, setAnimation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const colorOptions = [
    { value: "default", label: "Default" },
    { value: "blue", label: "Blue" },
    { value: "gray", label: "Gray" },
    { value: "purple", label: "Purple" },
    { value: "navy", label: "Navy" },
    { value: "maroon", label: "Maroon" },
    { value: "pink", label: "Pink" },
    { value: "teal", label: "Teal" },
    { value: "olive", label: "Olive" },
    { value: "mustard", label: "Mustard" },
    { value: "beige", label: "Beige" },
    { value: "charcoal", label: "Charcoal" },
    { value: "burgundy", label: "Burgundy" },
    { value: "forest", label: "Forest" },
    { value: "slate", label: "Slate" },
  ];

  const specialEffectOptions = [
    { value: "", label: "None" },
    { value: "bleeding", label: "Bleeding Text Effect" },
    { value: "handwritten", label: "Handwritten Text Effect" },
  ];

  const letterStyleOptions = [
    { value: "normal", label: "Normal" },
    { value: "bold", label: "Bold" },
    { value: "italic", label: "Italic" },
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    const { error } = await supabase.from("memories").insert([
      {
        recipient,
        message,
        sender: sender || null,
        color,
        full_bg: fullBg,
        letter_style: letterStyle,
        animation: animation || null,
        status: "pending",
      },
    ]);

    if (error) {
      setSubmitMessage("Error submitting memory: " + error.message);
    } else {
      setSubmitMessage("Memory submitted successfully! It will be reviewed soon.");
      setRecipient("");
      setMessage("");
      setSender("");
      setColor("default");
      setFullBg(false);
      setLetterStyle("normal");
      setAnimation("");
    }
    setIsSubmitting(false);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-100/90 backdrop-blur-md shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Submit a Memory</h1>
          <hr className="my-4 border-gray-400" />
          <nav>
            <ul className="flex flex-wrap justify-center gap-6">
              <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
              <li><Link href="/memories" className="hover:text-blue-600">Memories</Link></li>
              <li><Link href="/how-it-works" className="hover:text-blue-600">How It Works</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-lg shadow-lg">
          <div className="mb-6">
            <label htmlFor="recipient" className="block text-lg font-medium text-gray-800 mb-2">
              Recipient
            </label>
            <input
              type="text"
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
              className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:border-blue-400"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-lg font-medium text-gray-800 mb-2">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:border-blue-400"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="sender" className="block text-lg font-medium text-gray-800 mb-2">
              Sender (Optional)
            </label>
            <input
              type="text"
              id="sender"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:border-blue-400"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="color" className="block text-lg font-medium text-gray-800 mb-2">
              Card Color
            </label>
            <select
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:border-blue-400"
            >
              {colorOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={fullBg}
                onChange={() => setFullBg(!fullBg)}
                className="mr-2"
              />
              <span className="text-lg text-gray-800">Full Background Color</span>
            </label>
          </div>

          <div className="mb-6">
            <label htmlFor="letterStyle" className="block text-lg font-medium text-gray-800 mb-2">
              Letter Style
            </label>
            <select
              id="letterStyle"
              value={letterStyle}
              onChange={(e) => setLetterStyle(e.target.value)}
              className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:border-blue-400"
            >
              {letterStyleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="animation" className="block text-lg font-medium text-gray-800 mb-2">
              Special Effect
            </label>
            <select
              id="animation"
              value={animation}
              onChange={(e) => setAnimation(e.target.value)}
              className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:border-blue-400"
            >
              {specialEffectOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
          >
            {isSubmitting ? "Submitting..." : "Submit Memory"}
          </button>

          {submitMessage && (
            <p className={`mt-4 text-center ${submitMessage.includes("Error") ? "text-red-600" : "text-green-600"}`}>
              {submitMessage}
            </p>
          )}
        </form>
      </main>

      <footer className="bg-gray-100/90 backdrop-blur-md shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-4 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} If Only I Sent This
        </div>
      </footer>
    </div>
  );
}
