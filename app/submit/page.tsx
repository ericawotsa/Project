'use client';

import { useState } from 'react';
import MemoryCard from '../../components/MemoryCard';

export default function Submit() {
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('default');
  const [effect, setEffect] = useState('none');
  const [preview, setPreview] = useState(false);

  const colorOptions = [
    'default', 'blue', 'gray', 'purple', 'navy', 'maroon', 'pink', 'teal',
    'charcoal', 'olive', 'burgundy', 'forest',
  ];

  const effectOptions = ['none', 'bleeding', 'handwritten'];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here (unchanged)
    console.log({ message, color, effect });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#34495E] p-6">
      <h1 className="text-4xl font-['Playfair_Display'] text-center mb-6">Bury Your Words</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write the words you never sent..."
          className="w-full p-4 mb-4 border border-[#2C3E50] bg-[#ECF0F1] text-[#34495E] rounded resize-none"
          rows={5}
        />
        <div className="mb-4">
          <label className="block mb-2 font-['Courier_New']">Card Color:</label>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full p-2 border border-[#2C3E50] bg-[#ECF0F1] rounded"
          >
            {colorOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-['Courier_New']">Special Effect:</label>
          <select
            value={effect}
            onChange={(e) => setEffect(e.target.value)}
            className="w-full p-2 border border-[#2C3E50] bg-[#ECF0F1] rounded"
          >
            {effectOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={() => setPreview(!preview)}
          className="w-full p-2 mb-4 bg-[#E74C3C] text-white rounded hover:bg-[#C0392B]"
        >
          {preview ? 'Hide Preview' : 'Show Preview'}
        </button>
        {preview && (
          <MemoryCard
            message={message || 'Your unsent words...'}
            color={color}
            effect={effect}
            isPreview={true}
          />
        )}
        <button
          type="submit"
          className="w-full p-2 bg-[#2C3E50] text-white rounded hover:bg-[#34495E]"
        >
          Submit Memory
        </button>
      </form>
    </div>
  );
}
