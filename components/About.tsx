import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import BlurText from './BlurText';

const About: React.FC = () => {
  const { portfolioData } = usePortfolio();
  const { about, name } = portfolioData;
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="grid md:grid-cols-5 gap-12 items-center">
        <div className="md:col-span-2">
          <img 
            src={about.imageUrl} 
            alt={`Portrait of ${name}`}
            className="rounded-full shadow-2xl w-full max-w-sm mx-auto"
          />
        </div>
        <div className="md:col-span-3">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            <BlurText text="About Me" />
          </h2>
          <p className="text-slate-400 mb-4 leading-relaxed">
            {about.p1}
          </p>
          <p className="text-slate-400 mb-4 leading-relaxed">
            {about.p2}
          </p>
          <p className="text-slate-400 leading-relaxed">
            {about.p3}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;