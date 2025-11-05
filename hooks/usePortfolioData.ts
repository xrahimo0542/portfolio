import { useState, useEffect } from 'react';
import type { PortfolioData } from '../types';
import { DEFAULT_PORTFOLIO_DATA } from '../constants';

const PORTFOLIO_STORAGE_KEY = 'portfolioData';

export const usePortfolioData = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(DEFAULT_PORTFOLIO_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData) as Partial<PortfolioData>;
        const normalizedData: PortfolioData = {
          ...DEFAULT_PORTFOLIO_DATA,
          ...parsedData,
          hero: {
            ...DEFAULT_PORTFOLIO_DATA.hero,
            ...(parsedData.hero ?? {}),
          },
          about: {
            ...DEFAULT_PORTFOLIO_DATA.about,
            ...(parsedData.about ?? {}),
          },
          contact: {
            ...DEFAULT_PORTFOLIO_DATA.contact,
            ...(parsedData.contact ?? {}),
          },
          navLinks: parsedData.navLinks ?? DEFAULT_PORTFOLIO_DATA.navLinks,
          skills: parsedData.skills ?? DEFAULT_PORTFOLIO_DATA.skills,
          projects: parsedData.projects ?? DEFAULT_PORTFOLIO_DATA.projects,
          videos: parsedData.videos ?? DEFAULT_PORTFOLIO_DATA.videos,
          experience: parsedData.experience ?? DEFAULT_PORTFOLIO_DATA.experience,
        };
        setPortfolioData(normalizedData);
      } else {
        setPortfolioData(DEFAULT_PORTFOLIO_DATA);
      }
    } catch (error) {
      console.error('Failed to load portfolio data from localStorage', error);
      setPortfolioData(DEFAULT_PORTFOLIO_DATA);
    } finally {
        setLoading(false);
    }
  }, []);

  const updatePortfolioData = (newData: PortfolioData) => {
    try {
      const newPortfolioData = { ...portfolioData, ...newData };
      localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(newPortfolioData));
      setPortfolioData(newPortfolioData);
    } catch (error) {
      console.error('Failed to save portfolio data to localStorage', error);
    }
  };

  return { portfolioData, updatePortfolioData, loading };
};
