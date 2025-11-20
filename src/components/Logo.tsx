export default function Logo() {
  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      <div className="relative w-11 h-11 flex items-center justify-center">
        {/* Animated outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/5 blur-md group-hover:from-orange-500/30 group-hover:to-orange-600/10 transition-all duration-300" />

        {/* Target rings with refined styling */}
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none relative z-10">
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke="white"
            strokeWidth="3"
            opacity="0.95"
            className="group-hover:stroke-orange-400 transition-all duration-300"
          />
          <circle
            cx="50"
            cy="50"
            r="32"
            stroke="white"
            strokeWidth="2.5"
            opacity="0.6"
            className="group-hover:stroke-orange-400 transition-all duration-300"
          />
          <circle
            cx="50"
            cy="50"
            r="20"
            stroke="white"
            strokeWidth="2"
            opacity="0.3"
            className="group-hover:stroke-orange-400 transition-all duration-300"
          />
          <circle
            cx="50"
            cy="50"
            r="8"
            fill="#ea580c"
            opacity="0.8"
            className="group-hover:opacity-100 transition-opacity duration-300"
          />
        </svg>

        {/* Precision dart with sharper angle */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <svg width="22" height="22" viewBox="0 0 24 24" className="transform rotate-[-15deg] translate-x-1.5 -translate-y-1.5 drop-shadow-[0_0_12px_rgba(234,88,12,1)] group-hover:drop-shadow-[0_0_16px_rgba(234,88,12,1)] transition-all duration-300">
            {/* Dart trajectory line */}
            <line
              x1="22"
              y1="2"
              x2="11"
              y2="13"
              stroke="#ea580c"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.9"
            />
            {/* Dart body - sharper and more refined */}
            <path
              d="M22 2L15 22L11 13L2 9L22 2Z"
              fill="#ea580c"
            />
            {/* Dart tip highlight */}
            <circle
              cx="22"
              cy="2"
              r="1.5"
              fill="#ff6b35"
              className="group-hover:r-2 transition-all duration-300"
            />
          </svg>
        </div>
      </div>
      <span className="text-xl font-black tracking-tight text-white font-sans select-none">
        Arb<span className="text-[#ea580c] group-hover:text-orange-400 transition-colors duration-300">Elite</span>
      </span>
    </div>
  );
}
