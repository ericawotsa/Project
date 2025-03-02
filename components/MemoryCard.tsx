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
  animation?: string;
}

interface MemoryCardProps {
  memory: Memory;
  detail?: boolean;
}

function getBorderColor(color: string) {
  const mapping: { [key: string]: string } = {
    default: "border-gray-600",
    blue: "border-blue-500",
    gray: "border-gray-500",
    purple: "border-purple-500",
    navy: "border-blue-900",
    maroon: "border-red-700",
    pink: "border-pink-500",
    teal: "border-teal-500",
    green: "border-green-500",
    orange: "border-orange-500",
    yellow: "border-yellow-500",
    black: "border-black",
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
    green: "#68D391",
    orange: "#F6AD55",
    yellow: "#F6E05E",
    black: "#000000",
  };
  return mapping[color] || "#A0AEC0";
}

function getBgColor(color: string) {
  const mapping: { [key: string]: string } = {
    default: "bg-gray-800",
    blue: "bg-blue-800",
    gray: "bg-gray-700",
    purple: "bg-purple-800",
    navy: "bg-blue-900",
    maroon: "bg-red-800",
    pink: "bg-pink-800",
    teal: "bg-teal-800",
    green: "bg-green-800",
    orange: "bg-orange-800",
    yellow: "bg-yellow-800",
    black: "bg-black",
  };
  return mapping[color] || mapping["default"];
}

function getScrollColors(color: string) {
  const mapping: { [key: string]: { track: string; thumb: string } } = {
    default: { track: "#2D3748", thumb: "#4A5568" },
    blue: { track: "#4299E1", thumb: "#2B6CB0" },
    gray: { track: "#718096", thumb: "#4A5568" },
    purple: { track: "#9F7AEA", thumb: "#6B46C1" },
    navy: { track: "#2C5282", thumb: "#2A4365" },
    maroon: { track: "#E53E3E", thumb: "#C53030" },
    pink: { track: "#D53F8C", thumb: "#B83280" },
    teal: { track: "#38B2AC", thumb: "#319795" },
    green: { track: "#48BB78", thumb: "#2F855A" },
    orange: { track: "#ED8936", thumb: "#DD6B20" },
    yellow: { track: "#ECC94B", thumb: "#D69E2E" },
    black: { track: "#1A202C", thumb: "#2D3748" },
  };
  return mapping[color] || mapping["default"];
}

/* 
   TypewriterPrompt: cycles through 50 very short, refined lines 
   that evoke the unsent pain &ndash; all still here, unchanged.
*/
const TypewriterPrompt: React.FC = () => {
  const prompts = useMemo(() => [
    "Was it so simple? See what stayed.",
    "I never sent it. Look closer.",
    "Words locked away&mdash;dare a peek.",
    "Too raw to send. Uncover it.",
    "Unsaid and hidden. Might you see?",
    "A secret held tight. Dare a glance.",
    "I kept it inside. Could you find it?",
    "Unsent regret&mdash;what remains unseen?",
    "The truth stayed here. Perhaps you&apos;ll know.",
    "I never let go. See the silent truth.",
    "Barely spoken&mdash;wanna see more?",
    "It lies unsent. Would you dare?",
    "All left behind. Could you unveil it?",
    "Hidden in quiet. Uncover my truth.",
    "The unsaid endures. Look a little closer.",
    "I held back my words. See if they shift.",
    "Silence remains&mdash;maybe you can sense it.",
    "Too much left unsaid. Notice it?",
    "I never released it. Find the hidden pain.",
    "The letter stayed. Let it reveal itself.",
    "All unsent. What if you noticed?",
    "I kept my silence. Dare to discern?",
    "Lost in stillness&mdash;see what lingers.",
    "It was never sent. Perhaps you&apos;ll sense it.",
    "My truth was hidden. Would you glimpse it?",
    "I held my words. Notice the quiet sorrow.",
    "Unspoken and raw&mdash;could you see it?",
    "What was never sent still lives here.",
    "The words stayed inside&mdash;could you unveil them?",
    "A quiet miss remains. Would you discover?",
    "I left it unsaid. Might you notice?",
    "A secret letter, unsent. Look a little closer.",
    "Unshared, it endures&mdash;could you sense its weight?",
    "I never dared to send it. See if it changes you.",
    "The silence holds a secret. Do you feel it?",
    "A muted farewell lingers&mdash;could you perceive it?",
    "I never let you in. Perhaps you&apos;ll understand.",
    "The unsent remains, hidden yet true.",
    "Too real to send&mdash;wanna glimpse the truth?",
    "My silence speaks volumes. Can you sense it?",
    "A quiet goodbye, left unsent. Look again.",
    "The words were mine alone&mdash;could you share them?",
    "I kept them hidden&mdash;maybe you&apos;ll notice the void.",
    "What was never sent still speaks softly.",
    "A secret kept in time&mdash;does it stir you?",
    "The unsaid lingers&mdash;perhaps you&apos;ll sense the loss.",
    "I never let it out. Could you feel the absence?",
    "Hidden sorrow endures&mdash;see if it calls to you.",
    "A missed goodbye remains&mdash;wonder what it holds?",
    "Unsent, unspoken&mdash;its truth lies here."
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
    <div className="h-6 text-center text-sm text-gray-300 font-serif">
      {displayedText}
    </div>
  );
};

/* HandwrittenText component for Handwritten Text Effect */
const HandwrittenText: React.FC<{ message: string }> = ({ message }) => (
  <div className="handwritten-text">
    <p>{message}</p>
  </div>
);

/* renderMessage function &ndash; only Bleeding and Handwritten effects retained */
const renderMessage = (memory: Memory, arrowColor: string) => {
  switch (memory.animation) {
    case "bleeding":
      return <p className="bleeding-text">{memory.message}</p>;
    case "handwritten":
      return <HandwrittenText message={memory.message} />;
    default:
      return <p>{memory.message}</p>;
  }
};

const MemoryCard: React.FC<MemoryCardProps> = ({ memory, detail }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const arrowColor = getColorHex(memory.color);
  const borderColor = getBorderColor(memory.color);
  const bgColor = memory.full_bg ? getBgColor(memory.color) : "bg-gray-900/90";
  const scrollColors = getScrollColors(memory.color);

  const dateStr = new Date(memory.created_at).toLocaleDateString();
  const timeStr = new Date(memory.created_at).toLocaleTimeString();
  const dayStr = new Date(memory.created_at).toLocaleDateString(undefined, { weekday: "long" });

  const handleCardClick = () => {
    setFlipped(!flipped);
  };

  const [flipped, setFlipped] = useState(false);

  if (detail) {
    return (
      <div className={`book-card mx-auto my-4 w-full max-w-md p-6 ${bgColor} ${borderColor} border-4 rounded-lg shadow-2xl`}>
        <div className="mb-2">
          <h3 className="text-2xl font-bold text-gray-200">
            {memory.animation && <span style={{ fontSize: "0.8rem", color: arrowColor, marginRight: "4px" }}>&#9733;</span>}
            To: {memory.recipient}
          </h3>
          {memory.sender && <p className="mt-1 text-lg italic text-gray-400">From: {memory.sender}</p>}
        </div>
        <hr className="my-2 border-gray-600" />
        <div className="mb-2">
          {renderMessage(memory, arrowColor)}
        </div>
        <hr className="my-2 border-gray-600" />
        <div className="text-xs text-gray-400 flex flex-wrap justify-center gap-2">
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
      <div className="absolute right-[-40px] top-1/2 transform -translate-y-1/2">
        <Link href={`/memories/${memory.id}`}>
          <span className="fancy-arrow" style={{ color: arrowColor }}>➜</span>
        </Link>
      </div>
      <div
        className="flip-card w-full max-w-sm mx-auto my-4 perspective-1000 aspect-square cursor-pointer overflow-hidden"
        onClick={handleCardClick}
      >
        <div className={`flip-card-inner relative w-full h-full transition-transform duration-700 transform ${flipped ? "rotate-y-180" : ""}`}>
          {/* Front Side */}
          <div className={`flip-card-front absolute w-full h-full backface-hidden rounded-lg shadow-2xl ${bgColor} ${borderColor} border-4 p-4 flex flex-col justify-between`}>
            <div>
              <h3 className="text-xl font-bold text-gray-200">
                {memory.animation && <span style={{ fontSize: "0.8rem", color: arrowColor, marginRight: "4px" }}>&#9733;</span>}
                To: {memory.recipient}
              </h3>
              {memory.sender && <p className="mt-1 text-md italic text-gray-400">From: {memory.sender}</p>}
            </div>
            <hr className="border-t border-gray-600 my-1" />
            <div className="text-xs text-gray-400 flex flex-wrap justify-center gap-1">
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
          <div className={`flip-card-back absolute w-full h-full backface-hidden rounded-lg shadow-2xl ${bgColor} ${borderColor} border-4 transform rotate-y-180 p-4 flex flex-col justify-start`}>
            <div>
              <h3 className="text-lg italic text-gray-300 text-center">if only I sent this</h3>
              <hr className="border-t border-gray-600 my-1" />
            </div>
            <div
              className="flex-1 overflow-y-auto card-scroll cute_scroll text-sm text-gray-200 whitespace-pre-wrap"
              style={{ "--scroll-bg": scrollColors.track, "--scroll-thumb": scrollColors.thumb } as React.CSSProperties}
            >
              {renderMessage(memory, arrowColor)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
