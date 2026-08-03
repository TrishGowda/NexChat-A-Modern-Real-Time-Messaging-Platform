import React from "react";
import { Check, CheckCheck } from "lucide-react";

export default function MessageItem({
  msg,
  currentUserId,
  isSelectedUserOffline,
}) {
  const isMe = msg.sender === currentUserId;

  const renderReceipt = () => {
    if (!isMe) return null;

    // RULE: Offline users NEVER show Blue Tick
    if (isSelectedUserOffline) {
      return <Check size={16} className="text-gray-400" />;
    }

    if (msg.status === "read") {
      return <CheckCheck size={16} className="text-sky-500" />;
    } else if (msg.status === "delivered") {
      return <CheckCheck size={16} className="text-gray-400" />;
    } else {
      return <Check size={16} className="text-gray-400" />;
    }
  };

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`max-w-[70%] px-3 py-1.5 rounded-lg text-sm relative shadow-sm ${
          isMe ? "bg-[#d9fdd3] text-gray-800" : "bg-white text-gray-800"
        }`}
      >
        <p className="pr-12 break-all">{msg?.text || ""}</p>{" "}
        <div className="absolute bottom-1 right-1.5 flex items-center gap-1 text-[10px] text-gray-500">
          <span>
            {new Date(msg.createdAt || Date.now()).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          {renderReceipt()}
        </div>
      </div>
    </div>
  );
}
