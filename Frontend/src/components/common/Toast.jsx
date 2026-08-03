import { useEffect } from "react";
import { AlertCircle, CheckCircle2, X } from "lucide-react";

function Toast({ message, type = "error", onClose, duration = 4000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  if (!message) return null;

  const isError = type === "error";

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-100 ${
        isError ? "bg-red-600" : "bg-emerald-600"
      } text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 max-w-sm w-[90%]`}
    >
      {isError ? (
        <AlertCircle size={18} className="shrink-0" />
      ) : (
        <CheckCircle2 size={18} className="shrink-0" />
      )}
      <span className="text-sm flex-1">{message}</span>
      <button
        onClick={onClose}
        className="shrink-0 hover:opacity-80"
        aria-label="Close"
      >
        <X size={16} />
      </button>
    </div>
  );
}

export default Toast;