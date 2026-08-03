import React, { useState } from 'react';

const EMOJIS = ['😊', '😂', '🔥', '👍', '❤️', '😍', '🎉', '😎', '🙏', '✨'];

export default function MessageInput({ onSendMessage }) {
  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSend = () => {
    if (!text.trim()) return;
    onSendMessage(text);
    setText('');
  };

  return (
    <div className="flex flex-col bg-[#202c33]">
      {/* Step 3: 10 Emojis Bar */}
      {showEmojiPicker && (
        <div className="p-2 flex justify-around border-t border-gray-700 bg-[#111b21]">
          {EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => setText((prev) => prev + emoji)}
              className="text-2xl hover:scale-125 transition-transform p-1"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* Input Field */}
      <div className="p-3 flex items-center space-x-2">
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="text-2xl p-1 hover:opacity-80"
        >
          😊
        </button>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message"
          className="flex-1 bg-[#2a3942] text-white px-4 py-2 rounded-lg outline-none placeholder-gray-400"
        />
        <button
          type="button"
          onClick={handleSend}
          className="bg-[#00a884] px-4 py-2 rounded-lg text-white font-medium hover:bg-[#028065]"
        >
          Send
        </button>
      </div>
    </div>
  );
}