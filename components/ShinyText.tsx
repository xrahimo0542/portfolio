import React from 'react';
import './ShinyText.css';

interface ShinyTextProps {
  text?: string;
  disabled?: boolean;
  speed?: number; // seconds
  className?: string;
  children?: React.ReactNode;
}

const ShinyText: React.FC<ShinyTextProps> = ({ text, disabled = false, speed = 5, className = '', children }) => {
  const animationDuration = `${speed}s`;

  return (
    <span className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`} style={{ animationDuration }}>
      {children ?? text}
    </span>
  );
};

export default ShinyText;
