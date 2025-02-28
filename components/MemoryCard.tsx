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

/* 
   TypewriterPrompt: cycles through 50 short, poetic lines that indirectly invite a gentle tap 
   to flip the card and reveal unsent words. 
*/
const TypewriterPrompt: React.FC = () => {
  const prompts = useMemo(() => [
    "Had I dared to send this, would you glimpse my secret?",
    "Maybe a soft tap could reveal what I never said.",
    "These unsent words lie in silence—dare to disturb them.",
    "A quiet confession awaits; a gentle shift might set it free.",
    "My secret remains hidden—could a tender nudge expose it?",
    "I kept my truth locked away; perhaps you could let it out.",
    "What if a subtle move revealed my unspoken pain?",
    "Unsent and raw, these words beg to be seen.",
    "A silent letter waits—its truth hidden in darkness.",
    "Would you dare to unseal what I never let go?",
    "A small shift might change this unvoiced regret.",
    "These words were never sent—imagine if they surfaced.",
    "My heart kept a secret; a gentle tap might let it breathe.",
    "I left a confession unsaid—could you help set it free?",
    "In the quiet, my unspoken truth lingers—dare to reveal it.",
    "I never let go of this secret—what if it could change form?",
    "A hidden letter of loss waits in the dark—might you expose it?",
    "The silence holds my truth—perhaps a soft touch can alter it.",
    "I bore an unspoken farewell; a small move might let it speak.",
    "These words remain in shadow—would you risk a tender shift?",
    "My unvoiced sorrow begs for a gentle change—can you sense it?",
    "A secret memory waits, unsent and aching to be seen.",
    "This quiet confession rests—imagine if it could emerge.",
    "I held back my truth—what if a soft nudge revealed it?",
    "A fragile message endures—dare to shift its hidden form.",
    "The unsent note of my heart trembles in silence—could you disturb it?",
    "I kept these words secret; perhaps a slight move might change that.",
    "An unspoken regret lies here—its truth awaits a gentle lift.",
    "Would you dare to transform my silent sorrow into light?",
    "I never released my secret—imagine if it could finally show.",
    "A quiet ache endures within—could a subtle shift unveil it?",
    "These hidden words speak of loss—what if they could be set free?",
    "My letter of regret remains locked away—might you unchain it?",
    "I kept my silence; now, a tender move might break it open.",
    "The secret I never sent waits—its truth, yearning to be seen.",
    "In the stillness, a message of pain lingers—would you let it change?",
    "I carried unsaid words deep inside—could you help them surface?",
    "A muted confession endures—what if it could shift into light?",
    "My unvoiced truth lies dormant—imagine if a small move awakened it.",
    "These unsent lines hold my quiet pain—dare you let them shift?",
    "I held back my confession; perhaps its form could finally change.",
    "A silent regret remains—could a gentle touch bring it to life?",
    "My hidden letter waits in the dark—might you unveil its truth?",
    "The words I never sent linger—imagine if they could softly change.",
    "A secret remains unsaid—what if a tender shift could reveal it?",
    "My quiet truth is confined—dare to let it transform in silence.",
    "These words, never sent, whisper of a loss only a gentle move could mend.",
    "My unshared letter of sorrow awaits—could you allow it to change?"
  ], []);
  
  const initialIndex = useMemo(() => Math.floor(Math.random() * prompts.length), [prompts]);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [displayedText, setDisplayedText] = useState("");
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

  return (
    <div className="relative group">
      {/* Arrow outside the card */}
      <div className="absolute right-[-30px] top-1/2 transform -translate-y-1/2">
        <Link href={`/memories/${memory.id}`}>
          <span className="text-3xl" style={{ color: arrowColor, fontFamily: "cursive" }}>
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
              style={{ "--scroll-bg": scrollColors.track, "--scroll-thumb": scrollColors.thumb } as React.CSSProperties}
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
