import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import type { Video } from '../types';

const Videos: React.FC = () => {
  const { portfolioData } = usePortfolio();
  const { videos } = portfolioData;

  if (!videos.length) {
    return null;
  }

  return (
    <section id="videos" className="py-20 md:py-32">
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Video Highlights</h2>
      <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
        A selection of recent motion design and video editing work. Each clip showcases storytelling, pacing, and polished visuals.
      </p>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {videos.map(video => (
          <VideoHighlightCard key={video.title} video={video} />
        ))}
      </div>
    </section>
  );
};

const VideoHighlightCard: React.FC<{ video: Video }> = ({ video }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const aspectRatio = dimensions.width && dimensions.height ? dimensions.width / dimensions.height : undefined;

  const handleMetadata = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const element = event.currentTarget;
    if (!element.videoWidth || !element.videoHeight) {
      return;
    }
    setDimensions({
      width: element.videoWidth,
      height: element.videoHeight,
    });
  };

  return (
    <article className="bg-slate-800 rounded-xl overflow-hidden shadow-lg shadow-black/10 border border-slate-700">
      <div className="relative bg-black overflow-hidden" style={{ aspectRatio: aspectRatio ?? 16 / 9 }}>
        <video
          controls
          poster={video.thumbnailUrl || undefined}
          onLoadedMetadata={handleMetadata}
          className="w-full h-full object-contain bg-black"
        >
          <source src={video.videoUrl} />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="p-6 space-y-3">
        <h3 className="text-xl font-semibold text-white">{video.title}</h3>
        {video.description?.trim() ? (
          <p className="text-slate-400 text-sm leading-relaxed">{video.description}</p>
        ) : null}
      </div>
    </article>
  );
};

export default Videos;
