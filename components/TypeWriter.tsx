import React, { useState, useEffect } from 'react';

interface TypeWriterProps {
    text: string;
    delay?: number;
    className?: string;
    onComplete?: () => void;
    showCursor?: boolean;
    cursorCharacter?: string;
    cursorClassName?: string;
    endCharacter?: string;
}

const TypeWriter: React.FC<TypeWriterProps> = ({ 
    text, 
    delay = 100, 
    className = '',
    onComplete,
    showCursor = false,
    cursorCharacter = '_',
    cursorClassName = '',
    endCharacter = ''
}) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hasAppendedEndChar, setHasAppendedEndChar] = useState(false);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText(prevText => prevText + text[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, delay);

            return () => clearTimeout(timeout);
        } else {
            // Typing finished
            if (endCharacter && !hasAppendedEndChar) {
                setCurrentText(prev => prev + endCharacter);
                setHasAppendedEndChar(true);
                if (onComplete) onComplete();
            } else if (!endCharacter && !hasAppendedEndChar) {
                // No endCharacter but still call onComplete once
                setHasAppendedEndChar(true);
                if (onComplete) onComplete();
            }
        }
    }, [currentIndex, delay, text, onComplete]);

    return (
        <span className={className}>
            {currentText}
            {showCursor && !hasAppendedEndChar && (
                <span className={`ml-1 align-middle font-bold animate-blink ${cursorClassName}`}>
                    {cursorCharacter}
                </span>
            )}
        </span>
    );
};

export default TypeWriter;