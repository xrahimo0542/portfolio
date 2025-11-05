import React, { createContext, useContext, ReactNode } from 'react';
import { usePortfolioData } from '../hooks/usePortfolioData';
import type { PortfolioData } from '../types';

interface PortfolioContextType {
  portfolioData: PortfolioData;
  updatePortfolioData: (newData: PortfolioData) => void;
  loading: boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { portfolioData, updatePortfolioData, loading } = usePortfolioData();

  if(loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
            <div className="text-white text-xl">Loading Portfolio...</div>
        </div>
      );
  }

  return (
    <PortfolioContext.Provider value={{ portfolioData, updatePortfolioData, loading }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
