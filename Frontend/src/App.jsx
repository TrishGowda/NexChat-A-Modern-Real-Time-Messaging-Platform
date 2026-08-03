import React, { useState } from "react";
import { getUserImage } from "./utils/userImages";

// 1. Initial Users List
const INITIAL_USERS = [
  {
    _id: "1",
    name: "Aadhish",
    avatar: getUserImage("Aadhish"),
    isOnline: true,
  },
  {
    _id: "2",
    name: "Gomigha",
    avatar: getUserImage("Gomigha"),
    isOnline: true,
  },
  {
    _id: "3",
    name: "KaviPriya",
    avatar: getUserImage("KaviPriya"),
    isOnline: true,
  },
  {
    _id: "4",
    name: "Lawrance",
    avatar: getUserImage("Lawrance"),
    isOnline: true,
  },
  {
    _id: "5",
    name: "Monisha",
    avatar: getUserImage("Monisha"),
    isOnline: true,
  },
  { _id: "6", name: "Pheebe", avatar: getUserImage("Pheebe"), isOnline: true },
  {
    _id: "7",
    name: "Preethi",
    avatar: getUserImage("Preethi"),
    isOnline: true,
  },
  {
    _id: "8",
    name: "Puvitha",
    avatar: getUserImage("Puvitha"),
    isOnline: false,
  },
  {
    _id: "9",
    name: "Samyuktha",
    avatar: getUserImage("Samyuktha"),
    isOnline: false,
  },
  {
    _id: "10",
    name: "Swetha",
    avatar: getUserImage("Swetha"),
    isOnline: false,
  },
];

// 2. Exactly 10 Emojis
const EMOJIS = ["😊", "😂", "🔥", "👍", "❤️", "😍", "🎉", "😎", "🙏", "✨"];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  // Chat App States
  const [users, setUsers] = useState(INITIAL_USERS);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Custom Auto-Reply Logic based on input
  const getSmartReply = (userText) => {
    const input = userText.toLowerCase().trim();

    if (
      input.includes("hi") ||
      input.includes("hello") ||
      input.includes("hey")
    ) {
      return "Hello! How are you doing? 😊";
    } else if (input.includes("how are you")) {
      return "I am doing great! What about you? ✨";
    } else if (input.includes("good morning")) {
      return "Good Morning! Have a fantastic day! ☀️";
    } else if (input.includes("good night")) {
      return "Good Night! Sweet dreams! 🌙";
    } else if (input.includes("bye")) {
      return "Bye! Take care! 👋";
    } else if (input.includes("thanks") || input.includes("thank you")) {
      return "You are most welcome! 👍";
    } else if (
      input.includes("vaada") ||
      input.includes("machi") ||
      input.includes("bro")
    ) {
      return "Sollu bro! Enna vishayam? 🔥";
    } else {
      return `Seringa, purinjithu! "${userText}" badhilukku confirm pantean! 👍`;
    }
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

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
      delivered: false, // Single tick initially
    };

    // Message Add
    setMessages((prev) => ({
      ...prev,
      [userId]: [...(prev[userId] || []), userMsg],
    }));

    setText("");

    // Active chat-a list mela move pannuradhu
    setUsers((prevUsers) => {
      const filtered = prevUsers.filter((u) => u._id !== userId);
      return [selectedUser, ...filtered];
    });

    // Dynamic reply after 1.2s
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
        // Mark sent messages as delivered (Double Blue Tick)
        const updatedChat = currentChat.map((m) => ({ ...m, delivered: true }));
        return {
          ...prev,
          [userId]: [...updatedChat, replyMsg],
        };
      });
    }, 1200);
  };

  // ---------------- VIEW 1: AUTHENTICATION ----------------
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#111b21] text-gray-200">
        <div className="w-full max-w-md p-8 bg-[#202c33] rounded-2xl shadow-xl border border-gray-800">
          <h2 className="text-2xl font-bold text-center text-white mb-6">
            {isLoginView ? "Login" : "Sign Up"}
          </h2>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {!isLoginView && (
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full p-3 bg-[#2a3942] text-white rounded-lg outline-none focus:ring-2 focus:ring-[#00a884]"
                />
              </div>
            )}

            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full p-3 bg-[#2a3942] text-white rounded-lg outline-none focus:ring-2 focus:ring-[#00a884]"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full p-3 bg-[#2a3942] text-white rounded-lg outline-none focus:ring-2 focus:ring-[#00a884]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-2 bg-[#00a884] hover:bg-[#028065] text-white font-bold rounded-lg transition duration-200"
            >
              {isLoginView ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            {isLoginView ? (
              <p>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLoginView(false)}
                  className="text-[#00a884] font-semibold hover:underline ml-1"
                >
                  Sign Up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLoginView(true)}
                  className="text-[#00a884] font-semibold hover:underline ml-1"
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ---------------- VIEW 2: MAIN CHAT APP ----------------
  return (
    <div className="flex h-screen bg-[#111b21] text-gray-200">
      {/* Sidebar Panel */}
      <div className="w-1/3 border-r border-gray-800 flex flex-col bg-[#111b21]">
        {/* Header */}
        <div className="p-4 bg-[#202c33] flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img
              src="https://i.pravatar.cc/150?img=3"
              alt="My Profile"
              className="w-10 h-10 rounded-full border border-gray-600"
            />
            <span className="font-semibold text-white">
              {username || "thrisa"}
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="p-2 bg-[#111b21]">
          <input
            type="text"
            placeholder="Search or start a new chat"
            className="w-full p-2 text-sm bg-[#202c33] text-gray-200 rounded-lg outline-none placeholder-gray-400"
          />
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto">
          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center p-3 cursor-pointer hover:bg-[#202c33] border-b border-gray-800 ${
                selectedUser?._id === user._id ? "bg-[#2a3942]" : ""
              }`}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full mr-3 object-cover border border-gray-700"
              />
              <div className="flex-1">
                <h4 className="text-white font-medium">{user.name}</h4>
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

      {/* Main Chat Area */}
      {selectedUser ? (
        <div className="w-2/3 flex flex-col bg-[#0b141a]">
          {/* Chat Header */}
          <div className="p-4 bg-[#202c33] flex items-center space-x-3 border-b border-gray-800">
            <img
              src={selectedUser.avatar}
              alt={selectedUser.name}
              className="w-10 h-10 rounded-full object-cover border border-gray-600"
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

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {(messages[selectedUser._id] || []).map((msg) => (
              <div
                key={msg._id}
                className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "them" && (
                  <img
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                    className="w-8 h-8 rounded-full mr-2 self-end mb-1 object-cover"
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

          {/* Emoji Picker Bar */}
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
