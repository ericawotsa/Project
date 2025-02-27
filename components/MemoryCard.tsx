"use client";
import React, { useState } from "react";
import Link from "next/link";

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

interface MemoryCardProps {
  memory: Memory;
  detail?: boolean;
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

const MemoryCard: React.FC<MemoryCardProps> = ({ memory, detail }) => {
  const borderColor = getBorderColor(memory.color);
  // Always use the chosen color so that both sides reflect it.
  const bgColor = getBgColor(memory.color);

  // Always call hooks at the top
  const [flipped, setFlipped] = useState(false);
  const handleFlip = () => {
    setFlipped(!flipped);
  };

  if (detail) {
    // Render a static, book-like card for the individual memory detail view.
    return (
      <div className={`book-card mx-auto my-4 w-full max-w-md p-6 ${bgColor} ${borderColor} border-4 rounded-xl shadow-2xl ring-4 ring-gray-300`}>
        <h3 className="text-2xl font-bold text-gray-800">To: {memory.recipient}</h3>
        {memory.sender && <p className="mt-2 text-lg italic text-gray-600">From: {memory.sender}</p>}
        <div className="mt-2 text-sm text-gray-500 flex gap-4">
          <span>{new Date(memory.created_at).toLocaleDateString()}</span>
          <span>{new Date(memory.created_at).toLocaleTimeString()}</span>
        </div>
        <hr className="my-4 border-gray-300" />
        <p className="text-lg text-gray-800 whitespace-pre-wrap">{memory.message}</p>
      </div>
    );
  }

  // Flip card view for list/home pages (fixed square)
  return (
    <div
      className="flip-card w-full max-w-xs mx-auto my-4 perspective-1000 aspect-square cursor-pointer"
      onClick={handleFlip}
    >
      <div className={`flip-card-inner relative w-full h-full transition-transform duration-700 transform ${flipped ? "rotate-y-180" : ""}`}>
        {/* Front Side (Cover) */}
        <div className={`flip-card-front absolute w-full h-full backface-hidden rounded-lg shadow-xl ${bgColor} ${borderColor} border-4 flex flex-col justify-center items-center p-4`}>
          <h3 className="text-xl font-bold text-gray-800">To: {memory.recipient}</h3>
          {memory.sender && <p className="mt-2 text-md italic text-gray-600">From: {memory.sender}</p>}
          <div className="mt-2 text-sm text-gray-500">
            <p>{new Date(memory.created_at).toLocaleDateString()}</p>
            <p>{new Date(memory.created_at).toLocaleTimeString()}</p>
          </div>
          <p className="mt-4 text-sm text-gray-700">Tap to reveal message</p>
          <Link href={`/memories/${memory.id}`}>
            <button
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-2 right-2 bg-white/80 px-2 py-1 rounded shadow text-sm text-blue-600 hover:bg-white"
            >
              Open
            </button>
          </Link>
        </div>
        {/* Back Side (Message) */}
        <div className={`flip-card-back absolute w-full h-full backface-hidden rounded-lg shadow-xl ${bgColor} ${borderColor} border-4 transform rotate-y-180 flex flex-col justify-center items-center p-4 overflow-auto`}>
          <p className="text-lg text-gray-800 whitespace-pre-wrap">{memory.message}</p>
          <Link href={`/memories/${memory.id}`}>
            <button
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-2 right-2 bg-white/80 px-2 py-1 rounded shadow text-sm text-blue-600 hover:bg-white"
            >
              Open
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
