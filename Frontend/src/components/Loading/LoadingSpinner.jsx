function LoadingSpinner({ fullScreen = false, label = "Loading..." }) {
  return (
    <div
      className={
        fullScreen
          ? "min-h-screen w-full flex flex-col items-center justify-center bg-[#0b141a]"
          : "flex-1 flex flex-col items-center justify-center py-10 w-full"
      }
    >
      <div className="w-10 h-10 border-4 border-[#00a884] border-t-transparent rounded-full animate-spin" />
      <p className="mt-3 text-sm text-gray-400">{label}</p>
    </div>
  );
}

export default LoadingSpinner;