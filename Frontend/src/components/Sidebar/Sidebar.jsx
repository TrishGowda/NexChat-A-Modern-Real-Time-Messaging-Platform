import { useState } from "react";
import { LogOut, MoreVertical, Search } from "lucide-react";
import userImages from "../../utils/userImages";
import { useAuth } from "../../hooks/useAuth";
import LoadingSpinner from "../Loading/LoadingSpinner";

function Sidebar({ users, selectedUser, setSelectedUser, loading }) {
  const { user, logout } = useAuth();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full h-full bg-[#111b21] border-r border-[#2a3942] flex flex-col">
      {/* Header */}
      <div className="h-16 bg-[#202c33] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <img
  src={userImages[user?.username?.toLowerCase()]}
  alt={user?.username}
  className="w-10 h-10 rounded-full object-cover"
/>

          <h2 className="font-semibold text-gray-100 truncate">
            {user?.username}
          </h2>
        </div>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="text-gray-300 hover:text-white p-2 rounded-full hover:bg-[#2a3942] transition-colors"
            aria-label="Menu"
          >
            <MoreVertical size={20} />
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />

              <div className="absolute right-0 mt-2 w-44 bg-[#233138] rounded-lg shadow-xl overflow-hidden z-20">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-[#2a3942] transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="p-3 bg-[#111b21] shrink-0">
        <div className="flex items-center gap-2 bg-[#202c33] rounded-lg px-3 py-2">
          <Search size={16} className="text-gray-400 shrink-0" />

          <input
            type="text"
            placeholder="Search or start a new chat"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm text-gray-100 placeholder-gray-500 min-w-0"
          />
        </div>
      </div>

      {/* Users */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <LoadingSpinner label="Loading chats..." />
        ) : filteredUsers.length === 0 ? (
          <p className="text-center text-gray-500 mt-10 px-4">
            No users found
          </p>
        ) : (
          filteredUsers.map((u) => (
            <div
              key={u._id}
              onClick={() => setSelectedUser(u)}
              className={`flex items-center gap-3 p-3 border-b border-[#2a3942] cursor-pointer hover:bg-[#202c33] transition-colors ${
                selectedUser?._id === u._id ? "bg-[#2a3942]" : ""
              }`}
            >
              <div className="relative shrink-0">
                <img
                  src={u.image}
                  alt={u.username}
                  className="w-12 h-12 rounded-full object-cover"
                />

                {u.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25d366] rounded-full border-2 border-[#111b21]" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-100 truncate">
                  {u.username}
                </h3>

                <p
                  className={`text-xs ${
                    u.online ? "text-[#25d366]" : "text-gray-500"
                  }`}
                >
                  {u.online ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Sidebar;