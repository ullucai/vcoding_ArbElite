export default function Logo() {
  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      {/* Hexagonal Elite Badge */}
      <div className="relative w-12 h-12 flex items-center justify-center">
        {/* Animated outer pulse - continuous */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-orange-500/40 to-orange-600/20 blur-xl transition-all duration-500 animate-pulse" />

        {/* Main hexagon container */}
        <div className="relative z-10 w-full h-full">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Outer hexagon border */}
            <defs>
              <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ea580c" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0.4" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Hexagon shape */}
            <path
              d="M50 5 L85 27.5 L85 72.5 L50 95 L15 72.5 L15 27.5 Z"
              fill="url(#hexGrad)"
              stroke="white"
              strokeWidth="2"
              opacity="0.9"
              className="group-hover:opacity-100 transition-all duration-300"
              filter="url(#glow)"
            />

            {/* Inner geometric pattern */}
            <path
              d="M50 20 L70 35 L70 65 L50 80 L30 65 L30 35 Z"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              opacity="0.6"
              className="transition-all duration-300"
            />

            {/* Center diamond */}
            <path
              d="M50 35 L60 50 L50 65 L40 50 Z"
              fill="white"
              opacity="1"
              className="transition-all duration-300 animate-pulse"
            />

            {/* Elite star accent */}
            <circle
              cx="50"
              cy="50"
              r="3"
              fill="#fff"
              className="animate-pulse"
            />
          </svg>
        </div>

        {/* Floating particles effect - continuous */}
        <div className="absolute inset-0 opacity-100 transition-opacity duration-500">
          <div className="absolute top-0 right-0 w-1 h-1 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '0ms' }} />
          <div className="absolute bottom-0 left-0 w-1 h-1 bg-orange-500 rounded-full animate-ping" style={{ animationDelay: '200ms' }} />
        </div>
      </div>

      {/* Elite text branding */}
      <div className="flex flex-col">
        <span className="text-2xl font-black tracking-tighter leading-none text-white font-sans select-none">
          ARB<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 group-hover:from-orange-400 group-hover:to-orange-500 transition-all duration-300">ELITE</span>
        </span>
        <span className="text-[0.5rem] font-bold tracking-[0.15em] text-orange-500/60 uppercase mt-0.5">
          Unlock Your Edge
        </span>
      </div>
    </div>
  );
}
