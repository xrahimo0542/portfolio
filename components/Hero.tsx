import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const Hero: React.FC = () => {
  const { portfolioData } = usePortfolio();
  const { hero } = portfolioData;

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center text-center">
      <div className="max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          {hero.greeting} <span className="text-cyan-400">{hero.name}</span>
        </h1>
        <p className="text-2xl md:text-3xl text-slate-300 mb-8">
          {hero.title}
        </p>
        <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">
          {hero.subtitle}
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="#projects"
            className="bg-cyan-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-cyan-600 transition-all duration-300 shadow-lg shadow-cyan-500/20"
          >
            {hero.callToAction1}
          </a>
          <a
            href="#contact"
            className="bg-slate-700 text-white font-semibold py-3 px-8 rounded-full hover:bg-slate-600 transition-all duration-300"
          >
            {hero.callToAction2}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;