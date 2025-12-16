import {
  CircleIcon,
  ScanLineIcon,
  SquareIcon,
  TriangleIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

const steps = [
  { icon: ScanLineIcon, label: "Analyzing your request..." },
  { icon: SquareIcon, label: "Generating layout structure..." },
  { icon: TriangleIcon, label: "Assembling UI components..." },
  { icon: CircleIcon, label: "Finalizing your website..." },
];

const STEP_DURATION = 45000;

const LoaderSteps = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((s) => (s + 1) % steps.length);
    }, STEP_DURATION);

    return () => clearInterval(interval);
  }, []);

  const Icon = steps[current].icon;

  return (
    <div
      className="
        w-full h-full flex flex-col items-center justify-center
        bg-black relative overflow-hidden text-white
      "
    >
      {/* soft ambient glow */}
      <div
        className="
          absolute inset-0
          bg-linear-to-br from-white/5 via-white/3 to-transparent
          blur-3xl
        "
      />

      {/* loader core */}
      <div className="relative z-10 w-32 h-32 flex items-center justify-center">
        <div
          className="
            absolute inset-0 rounded-full
            border border-white/15
            animate-ping opacity-20
          "
        />
        <div
          className="
            absolute inset-4 rounded-full
            border border-white/10
          "
        />
        <Icon className="w-8 h-8 text-white/85 animate-bounce" />
      </div>

      {/* step label */}
      <p
        key={current}
        className="
          mt-8 text-sm font-medium text-white/80
          tracking-wide transition-all duration-700 ease-in-out
        "
      >
        {steps[current].label}
      </p>

      <p className="text-xs text-white/50 mt-2 transition-opacity duration-700">
        This may take around 2–3 minutes…
      </p>
    </div>
  );
};

export default LoaderSteps;
