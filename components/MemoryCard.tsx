"use client";
import React, { useState, useEffect, useMemo } from "react";
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

/* Returns a hex color for elements like the arrow */
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

/* For background colors in cards */
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

/* Returns scrollbar colors (track and thumb) based on card color */
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

/* TypewriterPrompt: cycles through 50 refined, heartbroken prompts urging the user to touch to flip */
const TypewriterPrompt: React.FC = () => {
  const prompts = useMemo(() => [
    "If only I sent this, my secrets would find solace in your touch...",
    "Touch to reveal the letter I never dared to send.",
    "A gentle touch may unlock the words I held inside.",
    "If only I sent this, my heart would whisper truths unknown.",
    "Touch to uncover the confession I locked away in silence.",
    "These unsent words long for your gentle caress—touch to reveal.",
    "If only I sent this, perhaps the weight of my solitude would ease.",
    "A tender touch unveils the letter of my unshared desires.",
    "Touch to read the message I buried deep within my heart.",
    "If only I sent this, my hidden truth might finally breathe.",
    "Touch and let my unsent confession speak in quiet despair.",
    "These words were meant for you—touch to open what I never sent.",
    "If only I sent this, the void inside might be mended by your glance.",
    "A soft touch could reveal the secret I kept from the world.",
    "Touch to expose the truth I trembled to share.",
    "If only I sent this, the silence would break with your kindness.",
    "A gentle touch unveils the unspoken letter of my heart.",
    "Touch to discover the message I dared not send.",
    "If only I sent this, my longing would find its answer in you.",
    "A tender touch reveals the unsent story of my quiet sorrow.",
    "Touch to unseal the letter that I never let go.",
    "If only I sent this, perhaps the pain would soften under your light.",
    "A gentle touch invites you to read what I kept hidden.",
    "Touch to reveal the unvoiced words of my broken heart.",
    "If only I sent this, my silence would no longer be so heavy.",
    "A soft touch may unlock the confession I guarded in secret.",
    "Touch to unearth the letter I penned in the dark of my soul.",
    "If only I sent this, the ache of my heart would speak through you.",
    "A tender touch lets you read the message I never released.",
    "Touch to unveil the quiet truth I kept locked away.",
    "If only I sent this, my hidden dreams might find their home.",
    "A gentle touch reveals the letter of unsent hopes.",
    "Touch to read the words I held back with trembling hands.",
    "If only I sent this, perhaps the wounds would begin to heal.",
    "A soft touch may let you in on the secret of my silent heart.",
    "Touch to discover the promise I never dared to deliver.",
    "If only I sent this, my quiet plea would reach out to you.",
    "A tender touch unveils the letter I hid from the light.",
    "Touch to reveal the unsent memoir of my fragile soul.",
    "If only I sent this, the darkness might yield to gentle understanding.",
    "A gentle touch invites you to read the words I never spoke.",
    "Touch to expose the letter of my unfulfilled desires.",
    "If only I sent this, my heart would no longer be a secret.",
    "A soft touch may bridge the silence between us—open it.",
    "Touch to unlock the message I kept safely in the shadows.",
    "If only I sent this, the quiet of my heart would find its echo in you.",
    "A tender touch reveals the unsent truth of a life unspoken.",
    "Touch to let my hidden words finally be known.",
    "If only I sent this, the letter of my soul would be free at last."
  ], []);
  
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentPrompt = prompts[currentIndex];
    const typeSpeed = isDeleting ? 50 : 100;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentPrompt.substring(0, charIndex + 1));
        if (charIndex + 1 === currentPrompt.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        } else {
          setCharIndex(charIndex + 1);
        }
      } else {
        setDisplayedText(currentPrompt.substring(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setCurrentIndex((currentIndex + 1) % prompts.length);
          setCharIndex(0);
        } else {
          setCharIndex(charIndex - 1);
        }
      }
    }, typeSpeed);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentIndex, prompts]);

  return (
    <div className="h-6 text-center text-sm text-gray-700 font-serif">
      {displayedText}
    </div>
  );
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

  if (detail) {
    // Detail view: full card layout with header, divider, message and details.
    return (
      <div className={`book-card mx-auto my-4 w-full max-w-md p-6 ${bgColor} ${borderColor} border-4 rounded-lg shadow-xl`}>
        <div className="mb-2">
          <h3 className="text-2xl font-bold text-gray-800">To: {memory.recipient}</h3>
          {memory.sender && <p className="mt-1 text-lg italic text-gray-600">From: {memory.sender}</p>}
        </div>
        <hr className="my-2 border-gray-300" />
        <div className="mb-2">
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

  // Flip view (list/home) layout.
  return (
    <div className="relative group">
      {/* Arrow outside the card */}
      <div className="absolute right-[-30px] top-1/2 transform -translate-y-1/2">
        <Link href={`/memories/${memory.id}`}>
          <span
            className="text-3xl"
            style={{ color: arrowColor, fontFamily: "cursive" }}
          >
            ➜
          </span>
        </Link>
      </div>
      <div
        className="flip-card w-full max-w-sm mx-auto my-4 perspective-1000 aspect-square cursor-pointer overflow-hidden"
        onClick={() => setFlipped(!flipped)}
      >
        <div className={`flip-card-inner relative w-full h-full transition-transform duration-700 transform ${flipped ? "rotate-y-180" : ""}`}>
          {/* Front Side */}
          <div className={`flip-card-front absolute w-full h-full backface-hidden rounded-lg shadow-xl ${bgColor} ${borderColor} border-4 p-4 flex flex-col justify-between`}>
            <div>
              <h3 className="text-xl font-bold text-gray-800">To: {memory.recipient}</h3>
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
              <TypewriterPrompt />
            </div>
          </div>
          {/* Back Side */}
          <div className={`flip-card-back absolute w-full h-full backface-hidden rounded-lg shadow-xl ${bgColor} ${borderColor} border-4 transform rotate-y-180 p-4 flex flex-col justify-start`}>
            <div>
              <h3 className="text-lg italic text-gray-700 text-center">if only I sent this</h3>
              <hr className="border-t border-gray-300 my-1" />
            </div>
            <div 
              className="flex-1 overflow-y-auto card-scroll cute_scroll text-sm text-gray-800 whitespace-pre-wrap" 
              style={
                { 
                  "--scroll-bg": scrollColors.track, 
                  "--scroll-thumb": scrollColors.thumb 
                } as React.CSSProperties
              }
            >
              {memory.message}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
