import React from 'react';

export interface Skill {
  name: string;
}

export interface Project {
  title:string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  liveUrl?: string;
  repoUrl: string;
  videoUrl?: string;
}

export interface Video {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface HeroData {
    greeting: string;
    name: string;
    title: string;
    subtitle: string;
    callToAction1: string;
    callToAction2: string;
}

export interface AboutData {
    imageUrl: string;
    p1: string;
    p2: string;
    p3: string;
}

export interface ContactData {
    email: string;
    githubUrl: string;
    linkedinUrl: string;
}

export interface NavLinkData {
    href: string;
    label: string;
}

export interface PortfolioData {
    name: string;
    logoUrl: string;
    navLinks: NavLinkData[];
    hero: HeroData;
    about: AboutData;
    skills: Skill[];
    projects: Project[];
    videos: Video[];
    experience: ExperienceItem[];
    contact: ContactData;
}
