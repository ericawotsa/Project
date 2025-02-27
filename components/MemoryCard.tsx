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

/* TypewriterPrompt: cycles through poetic messages with a typewriter effect */
const TypewriterPrompt: React.FC = () => {
  const prompts = useMemo(() => [
    "Whisper your sorrow...",
    "Reveal the hidden pain...",
    "Unfold your secret story...",
    "Let your heart speak...",
    "Dare to unveil the silence...",
    "Unlock the silent tears...",
    "Embrace the quiet grief...",
    "Expose the hidden ache...",
    "Set your unspoken words free...",
    "Turn the page of your soul...",
    "Murmur your midnight lament...",
    "Unravel the threads of loss...",
    "Break the silence of solitude...",
    "Echo the whispers of regret...",
    "Let sorrow find its voice...",
    "Unleash the ache within...",
    "Discover the depth of despair...",
    "Release your unvoiced emotions...",
    "Unmask the layers of longing...",
    "Paint your pain in silence...",
    "Whisper the secrets of your heart...",
    "Show the scars of time...",
    "Reveal the story untold...",
    "Speak the words unspoken...",
    "Unveil the echoes of yesterday...",
    "Sing the dirge of lost love...",
    "Let grief be your guide...",
    "Trace the lines of your memory...",
    "Awaken the dormant tears...",
    "Breathe life into your sorrows...",
    "Echo the silence of your past...",
    "Expose the tender wounds...",
    "Share the burden of solitude...",
    "Illuminate the shadows of regret...",
    "Embrace the quiet melancholy...",
    "Let the silence be broken...",
    "Express the depths of despair...",
    "Unfold the layers of your heart...",
    "Trace the echoes of your longing...",
    "Whisper the forgotten dreams...",
    "Resonate with silent laments...",
    "Unveil the story of your pain...",
    "Surrender to the melancholy muse...",
    "Let your tears narrate the tale...",
    "Reveal the art of silent grieving...",
    "Echo the heartbeat of sorrow...",
    "Express the quiet agony...",
    "Turn the key of your hidden grief...",
    "Embrace the void of memories...",
    "Uncover the shadows of yesterday..."
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
      <div className="absolute right-[-30px] top-1/2 transform -translate-y-1/2">
        <Link href={`/memories/${memory.id}`}>
          <span
            className="text-3xl"
            style={{ color: borderColor.replace("border-", "") || "#000", fontFamily: "cursive" }}
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
            <hr className="border-t border-gray-300 my-1" />
            <div>
              <TypewriterPrompt />
            </div>
          </div>
          <div className={`flip-card-back absolute w-full h-full backface-hidden rounded-lg shadow-xl ${bgColor} ${borderColor} border-4 transform rotate-y-180 p-4 flex flex-col justify-between`}>
            <div>
              <p className="text-lg italic text-gray-700">An Unsent Tale</p>
              <hr className="border-t border-gray-300 my-1" />
              <div className="card-scroll cute_scroll max-h-36 overflow-y-auto text-sm text-gray-800 whitespace-pre-wrap">
                {memory.message}
              </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
