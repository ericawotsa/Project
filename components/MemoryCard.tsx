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
  // Always call hooks unconditionally.
  const [flipped, setFlipped] = useState(false);
  const borderColor = getBorderColor(memory.color);
  // In list view, if full_bg is false, use a white background.
  const bgColor = memory.full_bg ? getBgColor(memory.color) : "bg-white/90";
  
  const dateStr = new Date(memory.created_at).toLocaleDateString();
  const timeStr = new Date(memory.created_at).toLocaleTimeString();
  const dayStr = new Date(memory.created_at).toLocaleDateString(undefined, { weekday: 'long' });

  if (detail) {
    // Static, book-like card for individual detail view.
    return (
      <div className={`book-card mx-auto my-4 w-full max-w-md p-6 ${bgColor} ${borderColor} border-4 rounded-lg shadow-xl`}>
        <h3 className="text-2xl font-bold text-gray-800">To: {memory.recipient}</h3>
        {memory.sender && <p className="mt-1 text-lg italic text-gray-600">From: {memory.sender}</p>}
        <div className="border-t border-gray-300 pt-2 text-xs text-gray-500 flex flex-wrap justify-center">
          <span>Date: {dateStr}</span>
          <span className="mx-1">|</span>
          <span>Day: {dayStr}</span>
          <span className="mx-1">|</span>
          <span>Time: {timeStr}</span>
          <span className="mx-1">|</span>
          <span>Color: {memory.color}</span>
        </div>
        <div className="mt-4">
          <p className="text-lg italic text-gray-700">An Unsent Tale</p>
          <hr className="my-1 border-gray-300" />
          <p className="text-base text-gray-800 whitespace-pre-wrap">{memory.message}</p>
        </div>
      </div>
    );
  }

  // Flip card view for list/home pages (fixed, responsive square)
  return (
    <div
      className="flip-card relative w-full max-w-sm mx-auto my-4 perspective-1000 aspect-square cursor-pointer overflow-hidden"
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`flip-card-inner relative w-full h-full transition-transform duration-700 transform ${flipped ? "rotate-y-180" : ""}`}>
        {/* Front Side */}
        <div className={`flip-card-front absolute w-full h-full backface-hidden rounded-lg shadow-xl ${bgColor} ${borderColor} border-4 p-4 flex flex-col justify-between`}>
          <div>
            <h3 className="text-xl font-bold text-gray-800">To: {memory.recipient}</h3>
            {memory.sender && <p className="mt-1 text-md italic text-gray-600">From: {memory.sender}</p>}
          </div>
          <div className="border-t border-gray-300 pt-2 text-xs text-gray-500 flex flex-wrap justify-center">
            <span>Date: {dateStr}</span>
            <span className="mx-1">|</span>
            <span>Day: {dayStr}</span>
            <span className="mx-1">|</span>
            <span>Time: {timeStr}</span>
            <span className="mx-1">|</span>
            <span>Color: {memory.color}</span>
          </div>
          {/* Cursive arrow on the right edge for individual open */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <Link href={`/memories/${memory.id}`}>
              <span className="text-2xl text-blue-600" style={{ fontFamily: 'cursive' }}>➜</span>
            </Link>
          </div>
        </div>
        {/* Back Side */}
        <div className={`flip-card-back absolute w-full h-full backface-hidden rounded-lg shadow-xl ${bgColor} ${borderColor} border-4 transform rotate-y-180 p-4 flex flex-col justify-between`}>
          <div>
            <p className="text-lg italic text-gray-700">An Unsent Tale</p>
            <hr className="my-1 border-gray-300" />
            <p className="text-sm text-gray-800 whitespace-pre-wrap">{memory.message}</p>
          </div>
          <div className="border-t border-gray-300 pt-2 text-xs text-gray-500 flex flex-wrap justify-center">
            <span>Date: {dateStr}</span>
            <span className="mx-1">|</span>
            <span>Day: {dayStr}</span>
            <span className="mx-1">|</span>
            <span>Time: {timeStr}</span>
            <span className="mx-1">|</span>
            <span>Color: {memory.color}</span>
          </div>
          {/* Cursive arrow on the right edge for individual open */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <Link href={`/memories/${memory.id}`}>
              <span className="text-2xl text-blue-600" style={{ fontFamily: 'cursive' }}>➜</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
