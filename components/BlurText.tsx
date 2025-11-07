import React, { useState } from 'react';

interface BlurTextProps {
    text: string;
    className?: string;
}

const BlurText: React.FC<BlurTextProps> = ({ text, className = '' }) => {
    const [isHovered, setIsHovered] = useState(false);
    const letters = text.split('');

    return (
        <span 
            className={`inline-block ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {letters.map((letter, index) => (
                <span 
                    key={index}
                    className={`inline-block transition-all duration-500`}
                    style={{
                        transitionDelay: `${index * 30}ms`,
                        filter: isHovered ? 'blur(0)' : 'blur(4px)',
                        opacity: isHovered ? 1 : 0.5,
                        transform: isHovered ? 'translateY(0)' : 'translateY(-4px)'
                    }}
                >
                    {letter === ' ' ? '\u00A0' : letter}
                </span>
            ))}
        </span>
    );
};

export default BlurText;