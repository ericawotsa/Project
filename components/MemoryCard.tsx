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

/* TypewriterPrompt: cycles through 50 unsent, heart-wrenching yet delicate messages
   that evoke the bittersweet regret of what was never sent, alluding indirectly to "If Only I Sent This." */
const TypewriterPrompt: React.FC = () => {
  const prompts = useMemo(() => [
    "If Only I Sent This, then the quiet night would hold my unsaid farewell.",
    "In the stillness, a letter of what might have been lingers unseen.",
    "There are words I never dared release—lost like autumn leaves.",
    "If Only I Sent This, my silence would speak of a love left unfulfilled.",
    "A secret note, too fragile for daylight, rests in the twilight of memory.",
    "I kept a confession hidden in the depths of longing and regret.",
    "If Only I Sent This, perhaps the void would echo with gentle remorse.",
    "In the hush of the night, an unsent letter remains a silent testimony.",
    "There is a story of us that I never dared to write.",
    "If Only I Sent This, the weight of my unsaid words might lift like morning mist.",
    "A delicate refrain of lost time, kept secret in the shadows.",
    "In a quiet corner of my heart, a letter remains forever unread.",
    "If Only I Sent This, my solitude would find solace in unspoken truths.",
    "A memory of a love untold, lingering like a fading star.",
    "In the silence of dusk, a hidden letter waits for gentle understanding.",
    "If Only I Sent This, perhaps the aching void would know a whisper of hope.",
    "The unsent words, like forgotten poetry, reside in the depths of night.",
    "In the quiet aftermath, a letter remains—a testament to what was left behind.",
    "If Only I Sent This, the soft glow of regret might kindle a lost warmth.",
    "A secret letter, delicate as dew, never touched by the light of day.",
    "In a realm of unspoken dreams, my heart wrote what it could not send.",
    "If Only I Sent This, the lingering silence would speak of a love unreturned.",
    "A quiet musing of what might have been, lost in the corridors of time.",
    "In the still night air, unsent words drift like distant memories.",
    "If Only I Sent This, the silence would carry the weight of unshed tears.",
    "A fragile whisper of regret, left unspoken in the deep of night.",
    "In the realm of lost chances, a letter of longing remains concealed.",
    "If Only I Sent This, the night would cradle my secret remorse.",
    "A tender memory, too raw to send, now lies hidden in silent sorrow.",
    "In the quiet pause of twilight, a confession remains a secret hope.",
    "If Only I Sent This, perhaps the darkness would understand my quiet plea.",
    "A silent testament to what was lost, hidden in the fabric of time.",
    "In the depths of my solitude, unsent words bloom like nocturnal flowers.",
    "If Only I Sent This, the night would hold the weight of my gentle regret.",
    "A private verse of longing, written in the language of the unsaid.",
    "In the soft hush before dawn, my heart penned a letter that never flew.",
    "If Only I Sent This, the void would shimmer with memories of a faded love.",
    "A wistful musing of moments gone by, preserved in silent ink.",
    "In the quiet margins of a forgotten day, a letter remains unshared.",
    "If Only I Sent This, my solitude would resonate with the music of regret.",
    "A tender secret, too beautiful and raw to ever be delivered.",
    "In the shadows of lost hope, an unsent confession lingers quietly.",
    "If Only I Sent This, the chill of absence would be warmed by a silent verse.",
    "A delicate missive of what was never said, hidden like a precious relic.",
    "In the lingering dusk, the words I never sent shimmer in quiet remorse.",
    "If Only I Sent This, the night would softly murmur of a love left behind.",
    "A hidden letter of unspoken dreams, too bittersweet for the world to know.",
    "In the serene hush of memory, my heart holds a message never sent.",
    "If Only I Sent This, the gentle melancholy of the night would carry my truth."
  ], []);
  
  // Start with a random index so each instance is unique.
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
