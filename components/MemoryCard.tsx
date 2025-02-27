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
  const [flipped, setFlipped] = useState(false);
  const borderColor = getBorderColor(memory.color);
  // In flip view, if full_bg is false, use white background; in detail view, always use chosen background
  const bgColor = memory.full_bg || detail ? getBgColor(memory.color) : "bg-white";
  
  const dateStr = new Date(memory.created_at).toLocaleDateString();
  const timeStr = new Date(memory.created_at).toLocaleTimeString();
  const dayStr = new Date(memory.created_at).toLocaleDateString(undefined, { weekday: 'long' });

  if(detail) {
    return (
      <div className={`book-card mx-auto my-4 w-full max-w-md p-4 ${bgColor} ${borderColor} border-4 rounded-lg shadow-xl`}>
        <div className="mb-2">
          <h3 className="text-2xl font-bold text-gray-800">To: {memory.recipient}</h3>
          {memory.sender && <p className="text-lg italic text-gray-600">From: {memory.sender}</p>}
        </div>
        <hr className="my-2 border-gray-300" />
        <div className="message-container cute_scroll max-h-64 overflow-y-auto my-2">
          <p className="text-base text-gray-800 whitespace-pre-wrap">{memory.message}</p>
        </div>
        <hr className="my-2 border-gray-300" />
        <div className="text-xs text-gray-500 flex flex-wrap justify-center gap-2">
          <span>Date: {dateStr}</span>
          <span>|</span>
          <span>Day: {dayStr}</span>
          <span>|</span>
          <span>Time: {timeStr}</span>
          <span>|</span>
          <span>Color: {memory.color}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flip-card-wrapper relative w-full max-w-sm mx-auto my-4">
      <div className="flip-card perspective-1000 aspect-square cursor-pointer" onClick={() => setFlipped(!flipped)}>
        <div className={`flip-card-inner relative w-full h-full transition-transform duration-700 transform ${flipped ? "rotate-y-180" : ""}`}>
          {/* Front Side */}
          <div className={`flip-card-front absolute w-full h-full backface-hidden rounded-lg shadow-xl ${bgColor} ${borderColor} border-4 p-4 flex flex-col justify-between`}>
            <div>
              <h3 className="text-xl font-bold text-gray-800">To: {memory.recipient}</h3>
              {memory.sender && <p className="text-md italic text-gray-600">From: {memory.sender}</p>}
            </div>
            <div className="text-xs text-gray-500 border-t border-gray-300 pt-2 flex flex-wrap justify-center gap-1">
              <span>Date: {dateStr}</span>
              <span>|</span>
              <span>Day: {dayStr}</span>
              <span>|</span>
              <span>Time: {timeStr}</span>
              <span>|</span>
              <span>Color: {memory.color}</span>
            </div>
            <div className="mt-2 flex justify-center">
              <div className="flip-hint">
                <div className="teddy-bear" style={{ color: getBorderColor(memory.color).replace('border-', '') }}></div>
                <span className="flip-text">Tap to reveal</span>
              </div>
            </div>
          </div>
          {/* Back Side */}
          <div className={`flip-card-back absolute w-full h-full backface-hidden rounded-lg shadow-xl ${bgColor} ${borderColor} border-4 transform rotate-y-180 p-4 flex flex-col justify-between`}>
            <div>
              <p className="text-lg italic text-gray-700">An Unsent Tale</p>
              <hr className="my-1 border-gray-300" />
              <div className="message-container cute_scroll max-h-40 overflow-y-auto">
                <p className="text-sm text-gray-800 whitespace-pre-wrap">{memory.message}</p>
              </div>
            </div>
            <div className="text-xs text-gray-500 border-t border-gray-300 pt-2 flex flex-wrap justify-center gap-1">
              <span>Date: {dateStr}</span>
              <span>|</span>
              <span>Day: {dayStr}</span>
              <span>|</span>
              <span>Time: {timeStr}</span>
              <span>|</span>
              <span>Color: {memory.color}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Arrow placed outside the card */}
      <Link href={`/memories/${memory.id}`}>
        <div className="arrow-outside">
          <span className="arrow text-2xl text-blue-600" style={{ fontFamily: 'cursive' }}>➜</span>
        </div>
      </Link>
    </div>
  );
};

export default MemoryCard;
