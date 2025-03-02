"use client";
import React, { useState, useEffect } from "react";
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

/* 
   TypewriterPrompt: cycles through refined lines that evoke unsent memories.
*/
const TypewriterPrompt: React.FC = () => {
  const prompts = [
    "Was it so simple? See what stayed.",
    "I never sent it. Look closer.",
    "Words locked away—dare a peek.",
    "Too raw to send. Uncover it.",
    "Unsaid and hidden. Might you see?",
    "A secret held tight. Dare a glance.",
    "I kept it inside. Could you find it?",
    "Unsent regret—what remains unseen?",
    "The truth stayed here. Perhaps you’ll know.",
    "I never let go. See the silent truth.",
    "Barely spoken—wanna see more?",
    "It lies unsent. Would you dare?",
    "All left behind. Could you unveil it?"
  ];
  const [index, setIndex] = useState(Math.floor(Math.random() * prompts.length));
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentPrompt = prompts[index];
    const speed = isDeleting ? 50 : 100;
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
          setIndex((index + 1) % prompts.length);
          setCharIndex(0);
        } else {
          setCharIndex(charIndex - 1);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index, prompts]);

  return (
    <div className="h-6 text-center text-sm text-gray-700 font-serif">
      {displayedText}
    </div>
  );
};

const MemoryCard: React.FC<MemoryCardProps> = ({ memory, detail }) => {
  const [flipped, setFlipped] = useState(false);
  // For non‑shattering animations (glitch, vanishing, inkBleeding, love effects)
  const [animate, setAnimate] = useState(false);
  // For shattering effect (sad) – triggers briefly every 5 seconds
  const [shatter, setShatter] = useState(false);

  // Set up timers for animation effects when a memory has a selected animation
  useEffect(() => {
    if (memory.animation) {
      if (memory.letter_style === "sad" && memory.animation === "shattering") {
        // Repeat shatter every 5 seconds
        const interval = setInterval(() => {
          setShatter(true);
          setTimeout(() => setShatter(false), 1000); // shatter lasts 1 second
        }, 5000);
        return () => clearInterval(interval);
      } else {
        // For other effects: apply once after 5 seconds
        const timer = setTimeout(() => {
          setAnimate(true);
        }, 5000);
        return () => clearTimeout(timer);
      }
    }
  }, [memory.animation, memory.letter_style]);

  // On any user tap, reset the animations (and restart timer for non‑shattering ones)
  const handleReset = () => {
    setAnimate(false);
    setShatter(false);
    if (memory.animation && !(memory.letter_style === "sad" && memory.animation === "shattering")) {
      const timer = setTimeout(() => {
        setAnimate(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  };

  // Determine which CSS animation class to apply
  let animationClass = "";
  if (memory.animation) {
    if (memory.letter_style === "sad") {
      if (memory.animation === "shattering") {
        if (shatter) animationClass = "shattering-animation";
      } else if (animate) {
        if (memory.animation === "glitch") animationClass = "glitch-animation";
        else if (memory.animation === "vanishing") animationClass = "vanishing-animation";
        else if (memory.animation === "inkBleeding") animationClass = "inkBleeding-animation";
      }
    } else if (memory.letter_style === "love" && animate) {
      if (memory.animation === "handwrittenNeon") animationClass = "handwrittenNeon-animation";
      else if (memory.animation === "fireAndIce") animationClass = "fireAndIce-animation";
      else if (memory.animation === "handwrittenLove") animationClass = "handwrittenLove-animation";
      else if (memory.animation === "neonGlow") animationClass = "neonGlow-animation";
    }
  }

  // Wrap message text in a container that supports potential glitch effect via data attribute
  const textContent = (
    <p
      className={`text-base text-gray-800 whitespace-pre-wrap break-words ${animationClass}`}
      data-text={memory.message}
    >
      {memory.message}
    </p>
  );

  const dateStr = new Date(memory.created_at).toLocaleDateString();
  const timeStr = new Date(memory.created_at).toLocaleTimeString();
  const dayStr = new Date(memory.created_at).toLocaleDateString(undefined, { weekday: 'long' });
  const borderColor = getBorderColor(memory.color);
  const bgColor = memory.full_bg ? getBgColor(memory.color) : "bg-white/90";
  const scrollColors = getScrollColors(memory.color);
  const arrowColor = getColorHex(memory.color);

  if (detail) {
    return (
      <div
        className={`book-card mx-auto my-4 w-full max-w-md p-6 ${bgColor} ${borderColor} border-4 rounded-lg shadow-xl`}
        onClick={handleReset}
      >
        <div className="mb-2">
          <h3 className="text-2xl font-bold text-gray-800">
            {memory.animation && (
              <span style={{ fontSize: "0.8rem", color: arrowColor, marginRight: "4px" }}>★</span>
            )}
            To: {memory.recipient}
          </h3>
          {memory.sender && (
            <p className="mt-1 text-lg italic text-gray-600">From: {memory.sender}</p>
          )}
        </div>
        <hr className="my-2 border-gray-300" />
        <div className="mb-2">{textContent}</div>
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
    <div className="relative group" onClick={handleReset}>
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
        onClick={handleReset}
      >
        <div
          className={`flip-card-inner relative w-full h-full transition-transform duration-700 transform ${
            flipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Front Side */}
          <div
            className={`flip-card-front absolute w-full h-full backface-hidden rounded-lg shadow-xl ${bgColor} ${borderColor} border-4 p-4 flex flex-col justify-between`}
          >
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                {memory.animation && (
                  <span style={{ fontSize: "0.8rem", color: arrowColor, marginRight: "4px" }}>★</span>
                )}
                To: {memory.recipient}
              </h3>
              {memory.sender && (
                <p className="mt-1 text-md italic text-gray-600">From: {memory.sender}</p>
              )}
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
          <div
            className={`flip-card-back absolute w-full h-full backface-hidden rounded-lg shadow-xl ${bgColor} ${borderColor} border-4 transform rotate-y-180 p-4 flex flex-col justify-start`}
          >
            <div>
              <h3 className="text-lg italic text-gray-700 text-center">
                if only I sent this
              </h3>
              <hr className="border-t border-gray-300 my-1" />
            </div>
            <div
              className={`flex-1 overflow-y-auto card-scroll cute_scroll text-sm text-gray-800 whitespace-pre-wrap break-words ${animationClass}`}
              style={{
                "--scroll-bg": scrollColors.track,
                "--scroll-thumb": scrollColors.thumb,
              } as React.CSSProperties}
            >
              {textContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
