import React, { useState } from "react";
// 👇 Fix 2: userImages.js-ல இருந்து getUserImage-ஐ Import செய்கிறோம்
import { getUserImage } from "../userImages";

// Initial Users List
const INITIAL_USERS = [
  { _id: "1", name: "Aadhish", isOnline: true },
  { _id: "2", name: "Gomigha", isOnline: true },
  { _id: "3", name: "KaviPriya", isOnline: true },
  { _id: "4", name: "Lawrance", isOnline: true },
  { _id: "5", name: "Monisha", isOnline: true },
  { _id: "6", name: "Pheebe", isOnline: true },
  { _id: "7", name: "Preethi", isOnline: true },
  { _id: "8", name: "Puvitha", isOnline: false },
  { _id: "9", name: "Samyuktha", isOnline: false },
  { _id: "10", name: "Swetha", isOnline: false },
];

const EMOJIS = ["😊", "😂", "🔥", "👍", "❤️", "😍", "🎉", "😎", "🙏", "✨"];

export default function Home() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Dynamic Auto-Reply Logic
  const getSmartReply = (userText) => {
    const input = userText.toLowerCase().trim();

    if (input === "hi" || input === "hello" || input === "hey") {
      return "Hi! How are you? 😊";
    } else if (
      input.includes("what are you doing") ||
      input.includes("enna panra")
    ) {
      return "I'm just sitting simply. What about you? ✨";
    } else if (input.includes("how are you") || input.includes("epdi iruka")) {
      return "I'm doing great! How is your day going?";
    } else if (input.includes("good morning")) {
      return "Good Morning! Have a great day! ☀️";
    } else if (input.includes("bye")) {
      return "Bye! Take care! 👋";
    } else {
      return `Oh, you said "${userText}"! Tell me more about it. 👍`;
    }
  };

  // Send Message Logic
  const handleSendMessage = () => {
    if (!text.trim() || !selectedUser) return;

    const userId = selectedUser._id;
    const sentText = text;

    const userMsg = {
      _id: Date.now().toString(),
      sender: "me",
      text: sentText,
      createdAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      delivered: false,
    };

    setMessages((prev) => ({
      ...prev,
      [userId]: [...(prev[userId] || []), userMsg],
    }));

    setText("");

    setUsers((prevUsers) => {
      const filtered = prevUsers.filter((u) => u._id !== userId);
      return [selectedUser, ...filtered];
    });

    // Auto-Reply Trigger
    setTimeout(() => {
      const autoReplyText = getSmartReply(sentText);

      const replyMsg = {
        _id: (Date.now() + 1).toString(),
        sender: "them",
        text: autoReplyText,
        createdAt: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => {
        const currentChat = prev[userId] || [];
        const updatedChat = currentChat.map((m) => ({ ...m, delivered: true }));
        return {
          ...prev,
          [userId]: [...updatedChat, replyMsg],
        };
      });
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-[#111b21] text-gray-200">
      {/* LEFT SIDEBAR PANEL */}
      <div className="w-1/3 border-r border-gray-800 flex flex-col bg-[#111b21]">
        {/* Profile Header */}
        <div className="p-4 bg-[#202c33] flex justify-between items-center">
          <div className="flex items-center space-x-3">
            {/* 👇 Local My-Profile Image */}
            <img
              src={getUserImage("my-profile")}
              alt="My Profile"
              className="w-10 h-10 rounded-full border border-gray-600 shrink-0 object-cover"
            />
            <span className="font-semibold text-white">thrisa</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-2 bg-[#111b21]">
          <input
            type="text"
            placeholder="Search or start a new chat"
            className="w-full p-2 text-sm bg-[#202c33] text-gray-200 rounded-lg outline-none placeholder-gray-400"
          />
        </div>

        {/* USER LIST */}
        <div className="flex-1 overflow-y-auto">
          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center p-3 cursor-pointer hover:bg-[#202c33] border-b border-gray-800 ${
                selectedUser?._id === user._id ? "bg-[#2a3942]" : ""
              }`}
            >
              {/* 👇 Fix 2: Automatic URL-க்கு பதிலா Local Image 불러 எடுக்கிறோம் */}
              <img
                src={getUserImage(user.name)}
                alt={user.name}
                className="w-12 h-12 rounded-full mr-3 object-cover border border-gray-700 shrink-0"
              />
              <div className="flex flex-col justify-center">
                <h4 className="text-white font-medium leading-tight">
                  {user.name}
                </h4>
                <p
                  className={`text-xs ${user.isOnline ? "text-green-400" : "text-gray-500"}`}
                >
                  {user.isOnline ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT CHAT PANEL */}
      {selectedUser ? (
        <div className="w-2/3 flex flex-col bg-[#0b141a]">
          {/* Active Chat Header */}
          <div className="p-4 bg-[#202c33] flex items-center space-x-3 border-b border-gray-800">
            {/* 👇 Chat Top Header-ல User Local DP */}
            <img
              src={getUserImage(selectedUser.name)}
              alt={selectedUser.name}
              className="w-10 h-10 rounded-full object-cover border border-gray-600 shrink-0"
            />
            <div>
              <h3 className="text-white font-semibold">{selectedUser.name}</h3>
              <span
                className={`text-xs ${selectedUser.isOnline ? "text-green-400" : "text-gray-400"}`}
              >
                {selectedUser.isOnline ? "Online" : "Offline"}
              </span>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {(messages[selectedUser._id] || []).map((msg) => (
              <div
                key={msg._id}
                className={`flex items-end space-x-2 ${
                  msg.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                {/* 👇 Chat Bubble-க்கு பக்கத்துல Receiver DP */}
                {msg.sender === "them" && (
                  <img
                    src={getUserImage(selectedUser.name)}
                    alt={selectedUser.name}
                    className="w-8 h-8 rounded-full object-cover shrink-0 mb-1"
                  />
                )}

                <div
                  className={`p-3 rounded-lg max-w-xs md:max-w-md ${
                    msg.sender === "me"
                      ? "bg-[#005c4b] text-white"
                      : "bg-[#202c33] text-gray-200"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <div className="flex justify-end items-center space-x-1 mt-1 text-[10px] text-gray-300">
                    <span>{msg.createdAt}</span>
                    {msg.sender === "me" && (
                      <span className="ml-1 font-bold">
                        {msg.delivered ? (
                          <span className="text-sky-400">✓✓</span>
                        ) : (
                          <span className="text-gray-400">✓</span>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Emoji Bar */}
          {showEmojiPicker && (
            <div className="bg-[#202c33] p-2 flex justify-around border-t border-gray-700">
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

          {/* Input Footer */}
          <div className="p-3 bg-[#202c33] flex items-center space-x-2">
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
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 bg-[#2a3942] text-white px-4 py-2 rounded-lg outline-none placeholder-gray-400"
            />
            <button
              type="button"
              onClick={handleSendMessage}
              className="bg-[#00a884] px-4 py-2 rounded-lg text-white font-medium hover:bg-[#028065]"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <div className="w-2/3 flex items-center justify-center bg-[#222e35] text-gray-400">
          <p className="text-lg">Select a user to start chatting</p>
        </div>
      )}
    </div>
  );
}
