import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const Experience: React.FC = () => {
  const { portfolioData } = usePortfolio();
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-20 md:py-32">
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
        Work Experience
      </h2>
      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-slate-700" aria-hidden="true"></div>
        {experience.map((item, index) => (
          <div key={index} className="relative mb-12">
            <div className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
              <div className="w-1/2">
                <div className={`p-6 bg-slate-800 rounded-xl shadow-lg ${index % 2 === 0 ? 'mr-4 md:mr-8' : 'ml-4 md:ml-8'}`}>
                  <p className="text-sm font-semibold text-cyan-400 mb-1">{item.period}</p>
                  <h3 className="text-lg font-bold text-white">{item.role}</h3>
                  <p className="text-slate-400 mb-3">{item.company}</p>
                  <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                    {item.description.map((desc, i) => <li key={i}>{desc}</li>)}
                  </ul>
                </div>
              </div>
              <div className="w-1/2"></div>
            </div>
            {/* Timeline Dot */}
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-500 rounded-full border-4 border-slate-900"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;