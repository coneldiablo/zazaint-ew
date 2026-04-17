import React from 'react';

interface AvatarFallbackProps {
  name: string;
  size?: string;
  className?: string;
}

const AvatarFallback: React.FC<AvatarFallbackProps> = ({ name, size = 'w-full h-full', className = '' }) => {
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className={`${size} ${className} flex items-center justify-center bg-white/5 border border-white/20 rounded-full`}>
      <span className="font-display text-white/80 font-medium" style={{ fontSize: 'inherit' }}>
        {initial}
      </span>
    </div>
  );
};

export default AvatarFallback;
