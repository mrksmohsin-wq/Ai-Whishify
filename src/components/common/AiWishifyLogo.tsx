import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const AiWishifyLogo: React.FC<LogoProps> = ({
  className = '',
  size = 48,
  showText = false,
}) => {
  const logoImage = (
    <img
      src="/logo.svg"
      alt="Ai Wishify Logo"
      width={size}
      height={size}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        aspectRatio: '1 / 1',
        minWidth: `${size}px`,
        minHeight: `${size}px`,
        maxWidth: `${size}px`,
        maxHeight: `${size}px`,
      }}
      className={`aspect-square object-contain drop-shadow-sm select-none shrink-0 ${className}`}
      loading="eager"
    />
  );

  if (!showText) {
    return logoImage;
  }

  return (
    <div className="inline-flex items-center gap-2.5 shrink-0">
      {logoImage}
      <div>
        <span className="font-display font-black text-xl text-slate-900 tracking-tight leading-none block">
          Ai Wishify
        </span>
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
          Animated Greetings
        </span>
      </div>
    </div>
  );
};
