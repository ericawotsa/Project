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

export default function MemoryCard({ memory, detail }: MemoryCardProps) {
  // Decide whether to apply full background color or just a border
  const borderColor = getBorderColor(memory.color);
  const computedBg = memory.full_bg ? getBgColor(memory.color) : "bg-white";

  // If we're in the detail view, show a "book card" with everything at once
  if (detail) {
    return (
      <div className={`book-card mx-auto my-6 w-full max-w-2xl ${computedBg} ${borderColor} border-4 rounded-xl shadow-2xl`}>
        <h2 className="text-3xl font-bold text-gray-800">To: {memory.recipient}</h2>
        {memory.sender && (
          <p className="mt-2 text-lg italic text-gray-600">From: {memory.sender}</p>
        )}
        <hr className="my-4 border-gray-300" />
        <p className="text-lg text-gray-800 whitespace-pre-wrap">{memory.message}</p>
        {/* Footer details */}
        <hr className="my-4 border-gray-300" />
        <div className="flex flex-wrap text-gray-600 text-sm gap-2">
          <span>Date: {new Date(memory.created_at).toLocaleDateString()}</span>
          <span className="mx-1">|</span>
          <span>Day: {new Date(memory.created_at).toLocaleDateString(undefined, { weekday: "long" })}</span>
          <span className="mx-1">|</span>
          <span>Time: {new Date(memory.created_at).toLocaleTimeString()}</span>
          <span className="mx-1">|</span>
          <span>Color: {memory.color}</span>
        </div>
      </div>
    );
  }

  // Otherwise, show a flip-card on list/home pages
  const [flipped, setFlipped] = useState(false);
  const handleFlip = () => setFlipped(!flipped);

  return (
    <div
      className="flip-card w-full max-w-md mx-auto my-6 relative perspective-1000 cursor-pointer min-h-[300px]"
      onClick={handleFlip}
    >
      <div
        className={`flip-card-inner absolute w-full h-full transition-transform duration-700 transform ${flipped ? "rotate-y-180" : ""}`}
      >
        {/* FRONT SIDE */}
        <div
          className={`flip-card-front absolute w-full h-full backface-hidden rounded-xl shadow-2xl p-6 ${computedBg} ${borderColor} border-4 flex flex-col justify-between`}
        >
          <div>
            <h3 className="text-xl font-bold text-gray-800">To: {memory.recipient}</h3>
            {memory.sender && (
              <p className="mt-1 text-md italic text-gray-600">From: {memory.sender}</p>
            )}
          </div>
          <hr className="my-3 border-gray-300" />
          <div className="flex justify-end items-center">
            {/* Cursive arrow link to detail page */}
            <Link
              href={`/memories/${memory.id}`}
              onClick={(e) => e.stopPropagation()}
              className="text-2xl text-gray-600 hover:text-blue-600 font-[cursive]"
            >
              &rarr;
            </Link>
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className={`flip-card-back absolute w-full h-full backface-hidden rounded-xl shadow-2xl p-6 transform rotate-y-180 flex flex-col justify-between ${computedBg} ${borderColor} border-4`}
        >
          <div>
            <p className="text-lg text-gray-800 whitespace-pre-wrap">{memory.message}</p>
          </div>
          <hr className="my-3 border-gray-300" />
          {/* Footer details (date, day, time, color) */}
          <div className="text-sm text-gray-600">
            <p>Date: {new Date(memory.created_at).toLocaleDateString()}</p>
            <p>Day: {new Date(memory.created_at).toLocaleDateString(undefined, { weekday: "long" })}</p>
            <p>Time: {new Date(memory.created_at).toLocaleTimeString()}</p>
            <p>Color: {memory.color}</p>
          </div>
          <div className="flex justify-end items-center mt-3">
            <Link
              href={`/memories/${memory.id}`}
              onClick={(e) => e.stopPropagation()}
              className="text-2xl text-gray-600 hover:text-blue-600 font-[cursive]"
            >
              &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
