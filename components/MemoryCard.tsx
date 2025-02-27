"use client";
import React, { useState } from "react";

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

const MemoryCard: React.FC<MemoryCardProps> = ({ memory }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const borderColor = getBorderColor(memory.color);
  const bgColor = memory.full_bg ? getBgColor(memory.color) : "bg-white/90";

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
        </div>
        {/* Back Side (Message) */}
        <div className="flip-card-back absolute w-full h-full backface-hidden rounded-lg shadow-xl bg-white/95 border-4 border-gray-300 transform rotate-y-180 flex flex-col justify-center items-center p-4">
          <p className="text-lg text-gray-800">{memory.message}</p>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
