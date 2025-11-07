import React, { useState, useCallback, useRef } from 'react';
import ImageModal from './ImageModal';
import { usePortfolio } from '../context/PortfolioContext';
import type { Project } from '../types';

// Visual card used for static graphic design and 3D render projects.
const ImageCard: React.FC<{ project: Project }> = ({ project }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (project.images && project.images.length > 0) {
            setCurrentImageIndex((prev) => (prev + 1) % project.images!.length);
        }
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (project.images && project.images.length > 0) {
            setCurrentImageIndex((prev) => (prev - 1 + project.images!.length) % project.images!.length);
        }
    };

    const handleImageClick = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="bg-slate-800 rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2 relative cursor-pointer" onClick={handleImageClick}>
                <div className="relative">
                    <img 
                        src={project.images ? project.images[currentImageIndex] : project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover aspect-[4/3] group-hover:scale-110 transition-transform duration-500" 
                    />
                    {project.images && project.images.length > 1 && (
                        <>
                            <button 
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                aria-label="Previous image"
                            >
                                ←
                            </button>
                            <button 
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                aria-label="Next image"
                            >
                                →
                            </button>
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                                {project.images.map((_, index) => (
                                    <div 
                                        key={index}
                                        className={`w-2 h-2 rounded-full ${
                                            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                        }`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                    <h3 className="text-xl font-bold text-white mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-in-out">{project.title}</h3>
                    <p className="text-cyan-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">{project.category}</p>
                </div>
            </div>
            <ImageModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                imageUrl={project.images ? project.images[currentImageIndex] : project.image!}
                alt={project.title}
            />
        </>
    );
};


// The original card, now used for detailed projects like websites and engineering.
const ProjectCard: React.FC<{ project: Project; onCardClick?: (project: Project) => void }> = ({ project, onCardClick }) => {
    const isClickable = Boolean(onCardClick && project.liveUrl && project.liveUrl !== '#');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleCardClick = () => {
        if (isClickable) {
            onCardClick?.(project);
        }
    };

    const handleCardKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (!isClickable) {
            return;
        }

        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onCardClick?.(project);
        }
    };

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (project.images && project.images.length > 0) {
            setCurrentImageIndex((prev) => (prev + 1) % project.images!.length);
        }
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (project.images && project.images.length > 0) {
            setCurrentImageIndex((prev) => (prev - 1 + project.images!.length) % project.images!.length);
        }
    };

    return (
        <div
            className={`bg-slate-800 rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-2 flex flex-col ${
                isClickable ? 'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500' : ''
            }`}
            onClick={handleCardClick}
            onKeyDown={handleCardKeyDown}
            role={isClickable ? 'link' : undefined}
            tabIndex={isClickable ? 0 : undefined}
            aria-label={isClickable ? `Open ${project.title}` : undefined}
        >
            <div className="relative overflow-hidden">
                <img 
                    src={project.images ? project.images[currentImageIndex] : project.image} 
                    alt={project.title} 
                    className="w-full object-cover aspect-[4/3] group-hover:scale-110 transition-transform duration-500" 
                />
                {project.images && project.images.length > 1 && (
                    <>
                        <button 
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Previous image"
                        >
                            ←
                        </button>
                        <button 
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Next image"
                        >
                            →
                        </button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                            {project.images.map((_, index) => (
                                <div 
                                    key={index}
                                    className={`w-2 h-2 rounded-full ${
                                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                    }`}
                                />
                            ))}
                        </div>
                    </>
                )}
                <div className="absolute inset-0 bg-black/40"></div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-slate-400 mb-4 text-sm leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                        <span key={tag} className="bg-slate-700 text-cyan-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};



const normalizeLiveUrl = (rawUrl?: string | null): string | null => {
    if (!rawUrl) {
        return null;
    }

    const trimmed = rawUrl.trim();

    if (!trimmed || trimmed === '#') {
        return null;
    }

    if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) {
        return trimmed;
    }

    if (trimmed.startsWith('//')) {
        return `http:${trimmed}`;
    }

    return `http://${trimmed.replace(/^\/+/, '')}`;
};

const Projects: React.FC = () => {
    const { portfolioData } = usePortfolio();
    const baseProjects = Array.isArray(portfolioData.projects) ? portfolioData.projects : [];
    const videos = Array.isArray(portfolioData.videos) ? portfolioData.videos : [];

    type RenderItem = {
        kind: 'project' | 'video';
        project: Project;
        key: string;
    };

    const projectItems: RenderItem[] = baseProjects
        .map((project, index) => ({
            kind: 'project',
            key: `project-${index}-${project.title}`,
            project,
        }));

    const categories = ['All', 'Graphic Design', '3D Renders', 'Websites', 'Video Editing', 'Engineering'];
    const [activeCategory, setActiveCategory] = useState('All');

    const imageOnlyCategories = ['Graphic Design', '3D Renders'];

    const openProjectLink = useCallback((proj: Project) => {
        const targetUrl = normalizeLiveUrl(proj.liveUrl);
        if (!targetUrl) {
            return;
        }

        if (typeof window !== 'undefined') {
            window.open(targetUrl, '_blank', 'noopener,noreferrer');
        }
    }, []);

    let filteredItems: RenderItem[] = activeCategory === 'All' 
        ? projectItems 
        : projectItems.filter(item => item.project.category === activeCategory);

    return (
        <section id="projects" className="py-20 md:py-32">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Featured Projects</h2>
            <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
                Here are some of the projects I'm proud of. Each one represents a challenge I was excited to tackle.
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                            activeCategory === category
                                ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
                {filteredItems.map(item => {
                    const { project } = item;

// Video card component for video projects
const VideoCard: React.FC<{ project: Project }> = ({ project }) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMetadata = (event: React.SyntheticEvent<HTMLVideoElement>) => {
        const video = event.currentTarget;
        if (!video.videoWidth || !video.videoHeight) {
            return;
        }
        setDimensions({
            width: video.videoWidth,
            height: video.videoHeight,
        });
        
        // Set random frame as thumbnail
        if (video.duration) {
            const randomTime = Math.random() * video.duration;
            video.currentTime = randomTime;
        }
    };

    const handleClick = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const aspectRatio = dimensions.width && dimensions.height
        ? dimensions.width / dimensions.height
        : undefined;

    return (
        <div className="bg-slate-800 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-2">
            <div
                className="relative overflow-hidden bg-black cursor-pointer"
                style={{ aspectRatio: aspectRatio ?? 16 / 9 }}
                onClick={handleClick}
            >
                <video
                    ref={videoRef}
                    src={project.videoUrl}
                    onLoadedMetadata={handleMetadata}
                    preload="metadata"
                    className="w-full h-full object-contain bg-black"
                />
                {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity hover:bg-black/40">
                        <div className="w-16 h-16 rounded-full bg-white/25 flex items-center justify-center">
                            <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[16px] border-l-white border-b-8 border-b-transparent ml-1"/>
                        </div>
                    </div>
                )}
            </div>
            <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                {project.description?.trim() && (
                    <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>
                )}
                {project.tags?.length ? (
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                            <span key={tag} className="bg-slate-700 text-cyan-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                ) : null}
            </div>
        </div>
    );
};

                    const card = (() => {
                        if (project.videoUrl) {
                            return <VideoCard project={project} />;
                        }

                        if (imageOnlyCategories.includes(project.category) || project.images) {
                            return <ImageCard project={project} />;
                        }

                        const isWebsite = project.category === 'Websites' && project.liveUrl && project.liveUrl !== '#';
                        return <ProjectCard project={project} onCardClick={isWebsite ? openProjectLink : undefined} />;
                    })();

                    return (
                        <div key={item.key} className="mb-8 break-inside-avoid rounded-xl">
                            {card}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Projects;
