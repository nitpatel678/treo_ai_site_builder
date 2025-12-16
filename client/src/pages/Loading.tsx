import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";

const Loading = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/";
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div
        className="
          flex flex-col items-center gap-4
          px-10 py-8 rounded-2xl
          bg-white/5 backdrop-blur-md
          border border-white/10
          shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)]
          animate-in fade-in duration-500
        "
      >
        <Loader2Icon className="size-8 animate-spin text-indigo-300" />

        <p className="text-white/80 text-sm animate-pulse">
          Finalizing your purchase…
        </p>
      </div>
    </div>
  );
};

export default Loading;
