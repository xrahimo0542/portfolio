import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { SKILL_ICONS } from './icons/TechIcons';
import type { Skill } from '../types';

const Skills: React.FC = () => {
  const { portfolioData } = usePortfolio();
  const { skills } = portfolioData;

  return (
    <section id="skills" className="py-20 md:py-32 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">My Tech Stack</h2>
      <p className="text-slate-400 mb-12 max-w-2xl mx-auto">
        A collection of technologies and tools I'm proficient with.
      </p>
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
        {skills.map((skill: Skill) => {
          const IconComponent = SKILL_ICONS[skill.name as keyof typeof SKILL_ICONS] || SKILL_ICONS['Default'];
          return (
            <div 
              key={skill.name} 
              className="group flex flex-col items-center gap-2 p-4 w-28 h-28 justify-center bg-slate-800 rounded-xl transition-all duration-300 hover:bg-slate-700 hover:-translate-y-2"
            >
              <IconComponent className="w-12 h-12 text-slate-400 group-hover:text-cyan-400 transition-colors duration-300" />
              <span className="text-sm font-medium text-slate-300">{skill.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;