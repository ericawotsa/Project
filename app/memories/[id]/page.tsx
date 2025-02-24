// app/memories/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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

export default function MemoryDetail() {
  const { id } = useParams();
  const [memory, setMemory] = useState<Memory | null>(null);

  useEffect(() => {
    async function fetchMemory() {
      const { data, error } = await supabase
        .from("memories")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error(error);
      } else {
        setMemory(data);
      }
    }
    fetchMemory();
  }, [id]);

  if (!memory) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-900">Memory Detail</h1>
          <nav>
            <ul className="flex gap-6">
              <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
              <li><Link href="/memories" className="hover:text-blue-600">Back to Memories</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto px-6 py-8">
        <div className={`shadow-lg rounded-lg p-6 mb-6 min-h-[250px] 
                  ${memory.full_bg ? getBgColor(memory.color) : "bg-white/90"} 
                  border-l-4 ${getBorderColor(memory.color)}`}>
          <h2 className="text-3xl font-semibold text-gray-800">To: {memory.recipient}</h2>
          <p className="mt-4 text-gray-700">{memory.message}</p>
          {memory.sender && <p className="mt-4 italic text-lg text-gray-600">— {memory.sender}</p>}
          <div className="mt-6 border-t border-gray-300 pt-3 flex flex-wrap text-gray-500 text-sm items-center">
            <span>Date: {new Date(memory.created_at).toLocaleDateString()}</span>
            <span className="mx-2">|</span>
            <span>Day: {new Date(memory.created_at).toLocaleDateString(undefined, { weekday: "long" })}</span>
            <span className="mx-2">|</span>
            <span>Time: {new Date(memory.created_at).toLocaleTimeString()}</span>
            <span className="mx-2">|</span>
            <span>Color: {memory.color}</span>
          </div>
        </div>
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
