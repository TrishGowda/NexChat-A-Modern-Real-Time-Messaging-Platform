import React from 'react';

export default function Messages({ messages = [] }) {
  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-3">
      {messages.map((msg) => (
        <div
          key={msg._id}
          className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`p-3 rounded-lg max-w-xs md:max-w-md ${
              msg.sender === 'me' ? 'bg-[#005c4b] text-white' : 'bg-[#202c33] text-gray-200'
            }`}
          >
            <p className="text-sm">{msg.text}</p>
            <div className="flex justify-end items-center space-x-1 mt-1 text-[10px] text-gray-300">
              <span>{msg.createdAt}</span>
              {msg.sender === 'me' && (
                <span className="ml-1 font-bold">
                  {msg.delivered ? (
                    <span className="text-sky-400">✓✓</span> /* Blue Tick */
                  ) : (
                    <span className="text-gray-400">✓</span> /* Single Tick */
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}