import React from 'react';

const EMOJIS = ['😀', '😂', '❤️', '👍', '😍', '😎', '😢', '🎉', '🔥', '🙏'];

export default function EmojiPicker({ onSelect }) {
  return (
    <div className="absolute bottom-16 left-4 bg-white border border-gray-200 shadow-xl rounded-lg p-2 flex gap-2 z-50">
      {EMOJIS.map((emoji) => (
        <button
          key={emoji}
          type="button"
          onClick={() => onSelect(emoji)}
          className="text-2xl hover:bg-slate-100 p-1 rounded transition transform hover:scale-125"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}