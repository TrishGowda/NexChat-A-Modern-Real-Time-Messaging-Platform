import { ArrowLeft, Phone, Video, MoreVertical } from "lucide-react";
import userImages from "../../utils/userImages";

function ChatHeader({ selectedUser, onBack }) {
  if (!selectedUser) return null;

  return (
    <div className="h-16 bg-[#202c33] border-b border-[#2a3942] flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onBack}
          className="md:hidden text-gray-300 hover:text-white p-1 -ml-1"
        >
          <ArrowLeft size={22} />
        </button>

        <div className="relative">
          <img
            src={
              userImages[selectedUser.username.toLowerCase()] ||
              selectedUser.image
            }
            alt={selectedUser.username}
            className="w-10 h-10 rounded-full object-cover"
          />

          {selectedUser.online && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25d366] rounded-full border-2 border-[#202c33]" />
          )}
        </div>

        <div>
          <h2 className="font-medium text-gray-100">
            {selectedUser.username}
          </h2>

          <p className={selectedUser.online ? "text-[#25d366] text-xs" : "text-gray-400 text-xs"}>
            {selectedUser.online ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-5 text-gray-300">
        <Phone size={20} />
        <Video size={20} />
        <MoreVertical size={20} />
      </div>
    </div>
  );
}

export default ChatHeader;