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

/* TypewriterPrompt: cycles through 50 poetic prompts instructing the user to tap to flip */
const TypewriterPrompt: React.FC = () => {
  const prompts = useMemo(() => [
    "Gently tap to unveil the hidden sorrow...",
    "A tender touch reveals your unspoken grief...",
    "Tap softly to release silent tears...",
    "Let your touch awaken buried memories...",
    "One gentle tap, and secrets unfurl...",
    "Touch to reveal the quiet lament...",
    "A soft tap to unlock a secret pain...",
    "Tap the card, let the sadness flow...",
    "Embrace the melancholy with a gentle tap...",
    "Tap to let the unvoiced heartache speak...",
    "A gentle touch stirs forgotten memories...",
    "Tap to reveal the whispered sorrow...",
    "Your touch can free hidden regrets...",
    "Tap tenderly to unlock quiet despair...",
    "A soft tap unveils a silent story...",
    "Let your fingers speak; tap to reveal...",
    "Tap to uncover the secret of lost time...",
    "A gentle tap to stir quiet anguish...",
    "Touch to awaken the echoes of pain...",
    "Tap, and let the veiled sorrow emerge...",
    "A simple tap to expose quiet grief...",
    "Tap to let your silent tears be seen...",
    "Gently tap to break the stillness of loss...",
    "Your touch invites the unspoken memories...",
    "Tap softly, let hidden regrets surface...",
    "A tender tap reveals the weight of sorrow...",
    "Let your touch whisper a melancholy tale...",
    "Tap to unlock the door to your past...",
    "A gentle tap to stir the depths of heartache...",
    "Touch to unveil the silent cry within...",
    "Tap to dissolve the silence of regret...",
    "Your gentle tap awakens forgotten pain...",
    "Tap to let the quiet lament unfold...",
    "A soft touch exposes the hidden ache...",
    "Tap, and let the subdued sorrow sing...",
    "Gently tap to free the secret despair...",
    "A tender touch can reveal quiet agony...",
    "Tap to open the book of silent memories...",
    "Your tap unveils a cascade of melancholy...",
    "A gentle tap brings hidden sorrows to light...",
    "Touch to let the silent tears spill...",
    "Tap softly, and watch unvoiced pain emerge...",
    "A tender tap unlocks the story of regret...",
    "Tap to hear the murmurs of your heart...",
    "A gentle touch reveals a tale of sorrow...",
    "Tap to discover the echoes of a lost past...",
    "Let your tap unburden a secret ache...",
    "Tap to witness the quiet dance of grief...",
    "A soft tap and the veil of sadness lifts...",
    "Gently tap to let your hidden heart speak..."
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

  // Flip view (list/home): front side now shows header, a divider, details, and the typewriter prompt.
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
