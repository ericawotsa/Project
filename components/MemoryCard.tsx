"use client";
import React, { useState, useEffect, useRef } from "react";
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
  animation?: string;
}

interface MemoryCardProps {
  memory: Memory;
  detail?: boolean;
}

// Helper functions for border, color, etc.
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

function getColorHex(color: string): string {
  const mapping: { [key: string]: string } = {
    default: "#A0AEC0",
    blue: "#63B3ED",
    gray: "#A0AEC0",
    purple: "#B794F4",
    navy: "#2A4365",
    maroon: "#C53030",
    pink: "#F687B3",
    teal: "#38B2AC",
  };
  return mapping[color] || "#A0AEC0";
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

function getScrollColors(color: string) {
  const mapping: { [key: string]: { track: string; thumb: string } } = {
    default: { track: "#ECEFF1", thumb: "#90A4AE" },
    blue: { track: "#BBDEFB", thumb: "#1E88E5" },
    gray: { track: "#ECEFF1", thumb: "#607D8B" },
    purple: { track: "#E1BEE7", thumb: "#8E24AA" },
    navy: { track: "#BBDEFB", thumb: "#0D47A1" },
    maroon: { track: "#FFCDD2", thumb: "#C62828" },
    pink: { track: "#F8BBD0", thumb: "#D81B60" },
    teal: { track: "#B2DFDB", thumb: "#00796B" },
  };
  return mapping[color] || mapping["default"];
}

/* HandwrittenText component for handwritten effect using canvas */
const HandwrittenText: React.FC<{ text: string }> = ({ text }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '30px Pacifico';
    ctx.fillStyle = '#000';
    const maxWidth = canvas.width - 20;
    const words = text.split(' ');
    let line = '';
    let y = 40;
    const lineHeight = 35;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, 10, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 10, y);
  }, [text]);

  return <canvas ref={canvasRef} width={640} height={100} className="handwritten-text-canvas" style={{ width: '100%', height: 'auto' }} />;
};

const MemoryCard: React.FC<MemoryCardProps> = ({ memory, detail }) => {
  const [flipped, setFlipped] = useState(false);
  const borderColor = getBorderColor(memory.color);
  const bgColor = memory.full_bg ? getBgColor(memory.color) : "bg-white/90";
  const scrollColors = getScrollColors(memory.color);
  const arrowColor = getColorHex(memory.color);

  const dateStr = new Date(memory.created_at).toLocaleDateString();
  const timeStr = new Date(memory.created_at).toLocaleTimeString();
  const dayStr = new Date(memory.created_at).toLocaleDateString(undefined, { weekday: 'long' });

  // Render message based on selected effect
  const renderMessage = () => {
    if (memory.letter_style === "love" && memory.animation === "handwritten") {
      return <HandwrittenText text={memory.message} />;
    }
    if (memory.letter_style === "love" && memory.animation === "neon") {
      return (
        <div className="neon-love-container" style={{ color: arrowColor, position: "relative" }}>
          <div className="neon-love-heart">
            <svg width="150" height="150" viewBox="0 0 150 150">
              <g transform="translate(100 100)">
                <path transform="translate(-75 -75)" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" d="M92.71,7.27L92.71,7.27c-9.71-9.69-25.46-9.69-35.18,0L50,14.79l-7.54-7.52C32.75-2.42,17-2.42,7.29,7.27v0 c-9.71,9.69-9.71,25.41,0,35.1L50,85l42.71-42.63C102.43,32.68,102.43,16.96,92.71,7.27z"></path>
              </g>
            </svg>
            <div className="gradient"></div>
            <svg width="150" height="150" viewBox="0 0 150 150">
              <g transform="translate(100 100)">
                <path transform="translate(-75 -75)" stroke="#fffa" strokeWidth="1" strokeLinecap="round" fill="none" d="M92.71,7.27L92.71,7.27c-9.71-9.69-25.46-9.69-35.18,0L50,14.79l-7.54-7.52C32.75-2.42,17-2.42,7.29,7.27v0 c-9.71,9.69-9.71,25.41,0,35.1L50,85l42.71-42.63C102.43,32.68,102.43,16.96,92.71,7.27z"></path>
              </g>
            </svg>
          </div>
          <div className="neon-love-background"></div>
          <div className="neon-love-text" style={{ position: "relative", zIndex: 2 }}>
            <p className="text-base text-gray-800 whitespace-pre-wrap" style={{ wordWrap: "break-word" }}>
              {memory.message}
            </p>
          </div>
        </div>
      );
    }
    if (memory.letter_style === "sad") {
      if (memory.animation === "bleeding") {
        return <p className="text-base text-gray-800 whitespace-pre-wrap bleeding-text" style={{ wordWrap: "break-word" }}>{memory.message}</p>;
      }
      if (memory.animation === "broken") {
        return <p className="text-base text-gray-800 whitespace-pre-wrap broken-text" data-text={memory.message} style={{ wordWrap: "break-word" }}>{memory.message}</p>;
      }
    }
    // Default (no effect)
    return <p className="text-base text-gray-800 whitespace-pre-wrap" style={{ wordWrap: "break-word" }}>{memory.message}</p>;
  };

  const handleCardClick = () => {
    setFlipped(!flipped);
  };

  if (detail) {
    return (
      <div className={`book-card mx-auto my-4 w-full max-w-md p-6 ${bgColor} ${borderColor} border-4 rounded-lg shadow-xl`} style={{ position: "relative" }}>
        <div className="mb-2">
          <h3 className="text-2xl font-bold text-gray-800">
            {memory.animation && <span style={{ fontSize: "0.8rem", color: arrowColor, marginRight: "4px" }}>★</span>}
            To: {memory.recipient}
          </h3>
          {memory.sender && <p className="mt-1 text-lg italic text-gray-600">From: {memory.sender}</p>}
        </div>
        <hr className="my-2 border-gray-300" />
        <div className="mb-2">
          {renderMessage()}
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
    <div className="relative group">
      <div className="absolute right-[-30px] top-1/2 transform -translate-y-1/2">
        <Link href={`/memories/${memory.id}`}>
          <span className="text-3xl" style={{ color: arrowColor, fontFamily: "cursive" }}>
            ➜
          </span>
        </Link>
      </div>
      <div
        className="flip-card w-full max-w-sm mx-auto my-4 perspective-1000 aspect-square cursor-pointer overflow-hidden"
        onClick={handleCardClick}
      >
        <div className={`flip-card-inner relative w-full h-full transition-transform duration-700 transform ${flipped ? "rotate-y-180" : ""}`}>
          {/* Front Side */}
          <div className={`flip-card-front absolute w-full h-full backface-hidden rounded-lg shadow-xl ${bgColor} ${borderColor} border-4 p-4 flex flex-col justify-between`}>
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                {memory.animation && <span style={{ fontSize: "0.8rem", color: arrowColor, marginRight: "4px" }}>★</span>}
                To: {memory.recipient}
              </h3>
              {memory.sender && <p className="mt-1 text-md italic text-gray-600">From: {memory.sender}</p>}
            </div>
            <hr className="border-t border-gray-300 my-1" />
            <div className="text-xs text-gray-500 flex flex-wrap justify-center gap-1">
              <span>Date: {dateStr}</span>
              <span>|</span>
              <span>Day: {dayStr}</span>
              <span>|</span>
              <span>Time: {timeStr}</span>
              <span>|</span>
              <span>Color: {memory.color}</span>
            </div>
            <div className="mt-2">
              {/* (Optional prompt can go here) */}
            </div>
          </div>
          {/* Back Side */}
          <div className={`flip-card-back absolute w-full h-full backface-hidden rounded-lg shadow-xl ${bgColor} ${borderColor} border-4 transform rotate-y-180 p-4 flex flex-col justify-start`}>
            {renderMessage()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
