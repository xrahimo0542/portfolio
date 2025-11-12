import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import TypeWriter from './TypeWriter';
import ShinyText from './ShinyText';
import { SplineScene } from './SplineScene';

const Hero: React.FC = () => {
  const { portfolioData } = usePortfolio();
  const { hero } = portfolioData;

  return (
    <section 
      id="hero"
      className="min-h-screen flex flex-row items-center justify-between px-8 relative overflow-hidden"
      style={{ width: "100vw", minHeight: "100vh" }}
    >
      {/* Center: Hero Content */}
      <div className="flex-1 z-10 flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          <TypeWriter 
            text={`${hero.greeting} `} 
            delay={80}
            onComplete={() => {}}
            showCursor={false}
          />
          <span className="text-cyan-400">
            <TypeWriter 
              text={hero.name}
              delay={80}
              onComplete={() => {}}
              showCursor={true}
              endCharacter={"♥"}
            />
          </span>
        </h1>
        <p className="text-2xl md:text-3xl text-slate-300 mb-8">
          <ShinyText speed={6} className="inline">{hero.title}</ShinyText>
        </p>
        <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">
          <ShinyText speed={5} className="inline">{hero.subtitle}</ShinyText>
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="#projects"
            className="bg-cyan-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-cyan-600 transition-all duration-300 shadow-lg shadow-cyan-500/20 btn-shiny btn-glow--cyan"
          >
            <ShinyText className="inline" speed={3}>{hero.callToAction1}</ShinyText>
          </a>
          <a
            href="#contact"
            className="bg-slate-700 text-white font-semibold py-3 px-8 rounded-full hover:bg-slate-600 transition-all duration-300 btn-shiny btn-glow--muted"
          >
            <ShinyText className="inline" speed={3}>{hero.callToAction2}</ShinyText>
          </a>
        </div>
      </div>

      {/* Right: Spline Robot */}
      <div className="flex-none w-[40vw] h-[80vh] relative z-0 flex items-center justify-end">
        <SplineScene
          scene="https://prod.spline.design/LlLc5I740eRpg5sC/scene.splinecode"
          className="w-full h-full"
        />
      </div>
    </section>
  );
};

export default Hero;
