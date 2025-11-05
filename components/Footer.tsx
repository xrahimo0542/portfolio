import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const Footer: React.FC = () => {
  const { portfolioData } = usePortfolio();
  const { name } = portfolioData;

  return (
    <footer className="py-6 border-t border-slate-800">
      <div className="container mx-auto text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} {name}. All rights reserved.</p>
        <p className="mt-1">Designed & Built by {name}</p>
      </div>
    </footer>
  );
};

export default Footer;