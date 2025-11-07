import React from 'react';

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrl: string;
    alt: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageUrl, alt }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300"
            onClick={onClose}
        >
            <div 
                className="relative max-w-[90vw] max-h-[90vh] animate-scaleIn"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 text-white hover:text-cyan-400 transition-colors"
                    aria-label="Close modal"
                >
                    Close ×
                </button>
                <img 
                    src={imageUrl} 
                    alt={alt} 
                    className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                />
            </div>
        </div>
    );
};

export default ImageModal;