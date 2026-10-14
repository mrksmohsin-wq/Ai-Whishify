import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const AiWishifyLogo: React.FC<LogoProps> = ({
  className = 'w-10 h-10',
  size = 48,
  showText = false,
}) => {
  return (
    <div className="inline-flex items-center gap-2.5 shrink-0">
      <div
        style={{ width: size, height: size }}
        className={`aspect-square relative flex items-center justify-center shrink-0 ${className}`}
      >
        <svg
          viewBox="0 0 200 200"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full aspect-square drop-shadow-sm select-none"
        >
          <defs>
            <radialGradient id="pinkGradSquare" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFAEAE" />
              <stop offset="100%" stopColor="#FF9696" />
            </radialGradient>
            <filter id="subtleShadowSquare" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Centered 16-petal scalloped badge */}
          <g transform="translate(100, 96) scale(0.92) translate(-100, -105)">
            {/* Outer scalloped path */}
            <path
              d="M 100 8
                 C 107 8 114 13 118 19
                 C 125 18 132 21 137 26
                 C 142 31 145 38 144 45
                 C 150 49 155 56 155 63
                 C 159 69 161 77 159 84
                 C 163 90 164 98 162 105
                 C 164 112 163 120 159 126
                 C 161 133 159 141 155 147
                 C 155 154 150 161 144 165
                 C 145 172 142 179 137 184
                 C 132 189 125 192 118 191
                 C 114 197 107 202 100 202
                 C 93 202 86 197 82 191
                 C 75 192 68 189 63 184
                 C 58 179 55 172 56 165
                 C 50 161 45 154 45 147
                 C 41 141 39 133 41 126
                 C 37 120 36 112 38 105
                 C 36 98 37 90 41 84
                 C 39 77 41 69 45 63
                 C 45 56 50 49 56 45
                 C 55 38 58 31 63 26
                 C 68 21 75 18 82 19
                 C 86 13 93 8 100 8 Z"
              fill="url(#pinkGradSquare)"
              stroke="#1E1624"
              strokeWidth="3.6"
              strokeLinejoin="round"
              filter="url(#subtleShadowSquare)"
            />

            {/* Inner concentric scalloped ring border */}
            <path
              d="M 100 16
                 C 106 16 112 20 115 25
                 C 121 24 127 27 131 31
                 C 135 35 137 41 136 47
                 C 141 50 145 56 145 62
                 C 148 67 150 74 148 80
                 C 151 85 152 92 150 98
                 C 152 104 151 111 148 116
                 C 150 122 148 129 145 134
                 C 145 140 141 146 136 149
                 C 137 155 135 161 131 165
                 C 127 169 121 172 115 171
                 C 112 176 106 180 100 180
                 C 94 180 88 176 85 171
                 C 79 172 73 169 69 165
                 C 65 161 63 155 64 149
                 C 59 146 55 140 55 134
                 C 52 129 50 122 52 116
                 C 49 111 48 104 50 98
                 C 48 92 49 85 52 80
                 C 50 74 52 67 55 62
                 C 55 56 59 50 64 47
                 C 63 41 65 35 69 31
                 C 73 27 79 24 85 25
                 C 88 20 94 16 100 16 Z"
              fill="none"
              stroke="#1E1624"
              strokeWidth="1.8"
              strokeLinejoin="round"
              opacity="0.9"
            />

            {/* Central Detailed Firework Burst */}
            <g stroke="#1E1624" strokeWidth="1.15" strokeLinecap="round" opacity="0.95" transform="translate(100, 72)">
              {/* Main radial rays */}
              <line x1="0" y1="0" x2="0" y2="-22" />
              <line x1="0" y1="0" x2="6" y2="-20" />
              <line x1="0" y1="0" x2="13" y2="-17" />
              <line x1="0" y1="0" x2="19" y2="-11" />
              <line x1="0" y1="0" x2="22" y2="-4" />
              <line x1="0" y1="0" x2="22" y2="4" />
              <line x1="0" y1="0" x2="18" y2="12" />
              <line x1="0" y1="0" x2="13" y2="18" />
              <line x1="0" y1="0" x2="5" y2="21" />
              <line x1="0" y1="0" x2="-2" y2="22" />
              <line x1="0" y1="0" x2="-9" y2="19" />
              <line x1="0" y1="0" x2="-16" y2="14" />
              <line x1="0" y1="0" x2="-20" y2="7" />
              <line x1="0" y1="0" x2="-22" y2="-2" />
              <line x1="0" y1="0" x2="-19" y2="-11" />
              <line x1="0" y1="0" x2="-13" y2="-17" />
              <line x1="0" y1="0" x2="-6" y2="-21" />

              {/* Secondary fine sparkles */}
              <line x1="0" y1="0" x2="3" y2="-14" strokeWidth="0.8" />
              <line x1="0" y1="0" x2="10" y2="-12" strokeWidth="0.8" />
              <line x1="0" y1="0" x2="15" y2="-5" strokeWidth="0.8" />
              <line x1="0" y1="0" x2="14" y2="6" strokeWidth="0.8" />
              <line x1="0" y1="0" x2="8" y2="13" strokeWidth="0.8" />
              <line x1="0" y1="0" x2="-5" y2="14" strokeWidth="0.8" />
              <line x1="0" y1="0" x2="-12" y2="8" strokeWidth="0.8" />
              <line x1="0" y1="0" x2="-14" y2="-6" strokeWidth="0.8" />
              <line x1="0" y1="0" x2="-8" y2="-13" strokeWidth="0.8" />

              {/* Stippled tips / star dust */}
              <circle cx="0" cy="-24" r="0.85" fill="#1E1624" />
              <circle cx="15" cy="-19" r="0.75" fill="#1E1624" />
              <circle cx="24" cy="-5" r="0.75" fill="#1E1624" />
              <circle cx="21" cy="14" r="0.85" fill="#1E1624" />
              <circle cx="6" cy="23" r="0.75" fill="#1E1624" />
              <circle cx="-11" cy="21" r="0.75" fill="#1E1624" />
              <circle cx="-23" cy="8" r="0.85" fill="#1E1624" />
              <circle cx="-23" cy="-4" r="0.75" fill="#1E1624" />
              <circle cx="-15" cy="-19" r="0.85" fill="#1E1624" />
            </g>

            {/* Cursive "Ai Wishify" Typography */}
            <text
              x="100"
              y="124"
              textAnchor="middle"
              fontFamily="'Dancing Script', 'Caveat', cursive"
              fontSize="24"
              fontWeight="700"
              fill="#1E1624"
              letterSpacing="0.2"
            >
              Ai Wishify
            </text>
          </g>

          {/* Bottom dot accent centered */}
          <circle cx="100" cy="191" r="3.5" fill="#FFAEAE" stroke="#1E1624" strokeWidth="1" />
        </svg>
      </div>

      {showText && (
        <div>
          <span className="font-display font-black text-xl text-slate-900 tracking-tight leading-none block">
            Ai Wishify
          </span>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
            Animated Greetings
          </span>
        </div>
      )}
    </div>
  );
};
