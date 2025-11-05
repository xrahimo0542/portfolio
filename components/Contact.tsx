import React from 'react';
import { GithubIcon, LinkedinIcon, MailIcon } from './icons/SocialIcons';
import { usePortfolio } from '../context/PortfolioContext';

const Contact: React.FC = () => {
  const { portfolioData } = usePortfolio();
  const { contact } = portfolioData;

  return (
    <section id="contact" className="py-20 md:py-32 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get In Touch</h2>
      <p className="text-slate-400 mb-8 max-w-xl mx-auto">
        I'm currently open to new opportunities and collaborations. Whether you have a question or just want to say hi, feel free to reach out. I'll do my best to get back to you!
      </p>
      <a
        href={`mailto:${contact.email}`}
        className="inline-block bg-cyan-500 text-white font-semibold text-lg py-3 px-8 rounded-full hover:bg-cyan-600 transition-all duration-300 shadow-lg shadow-cyan-500/20 mb-12"
      >
        Say Hello
      </a>
      <div className="flex justify-center gap-6">
        <a href={contact.githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300">
          <GithubIcon className="w-8 h-8" />
          <span className="sr-only">GitHub</span>
        </a>
        <a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300">
          <LinkedinIcon className="w-8 h-8" />
          <span className="sr-only">LinkedIn</span>
        </a>
        <a href={`mailto:${contact.email}`} className="text-slate-400 hover:text-cyan-400 transition-colors duration-300">
          <MailIcon className="w-8 h-8" />
          <span className="sr-only">Email</span>
        </a>
      </div>
    </section>
  );
};

export default Contact;