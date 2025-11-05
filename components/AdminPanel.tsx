import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import type { PortfolioData, Project, Video } from '../types';

const AdminPanel: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { portfolioData, updatePortfolioData } = usePortfolio();
  const [localData, setLocalData] = useState<PortfolioData>(portfolioData);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    if (isOpen) {
      setLocalData(portfolioData);
    }
  }, [isOpen, portfolioData]);

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    updatePortfolioData(localData);
    onClose();
  };

  const handleRootInputChange = (field: keyof PortfolioData, value: string) => {
    setLocalData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleInputChange = (section: keyof PortfolioData, field: any, value: any, index: number | null = null) => {
    setLocalData(prev => {
      // FIX: Check if the section data is an object before attempting to spread it.
      // This prevents runtime errors if the section is a primitive type like a string.
      const sectionData = prev[section];
      const newSection = Array.isArray(sectionData) 
        ? [...sectionData] 
        : (typeof sectionData === 'object' && sectionData !== null ? { ...sectionData } : sectionData);

      if (index !== null && Array.isArray(newSection)) {
        newSection[index] = { ...newSection[index], [field]: value };
      } else if (typeof newSection === 'object' && newSection !== null && !Array.isArray(newSection)) {
        (newSection as any)[field] = value;
      }

      return { ...prev, [section]: newSection };
    });
  };
  
  const handleProjectChange = (index: number, field: keyof Project, value: any) => {
    setLocalData(prev => {
      const currentProjects = Array.isArray(prev.projects) ? [...prev.projects] : [];
      if (field === 'tags') {
        currentProjects[index] = {
          ...currentProjects[index],
          [field]: value.split(',').map((t: string) => t.trim()).filter(Boolean),
        };
      } else {
        currentProjects[index] = { ...currentProjects[index], [field]: value };
      }
      return { ...prev, projects: currentProjects };
    });
  };

  const handleVideoChange = (index: number, field: keyof Video, value: any) => {
    setLocalData(prev => {
      const currentVideos = Array.isArray(prev.videos) ? [...prev.videos] : [];
      currentVideos[index] = { ...currentVideos[index], [field]: value };
      return { ...prev, videos: currentVideos };
    });
  };

  const handleAddItem = (section: 'projects' | 'skills' | 'experience' | 'navLinks' | 'videos') => {
    setLocalData(prev => {
      const source = Array.isArray((prev as any)[section]) ? (prev as any)[section] : [];
      const newItems = [...source];
      let newItem;
      switch(section) {
        case 'projects': newItem = { title: 'New Project', description: '', image: '', category: 'New Category', tags: [], repoUrl: '' }; break;
        case 'skills': newItem = { name: 'New Skill' }; break;
        case 'experience': newItem = { role: 'New Role', company: '', period: '', description: [] }; break;
        case 'navLinks': newItem = { href: '#', label: 'New Link' }; break;
        case 'videos': newItem = { title: 'New Video', description: '', videoUrl: '', thumbnailUrl: '' }; break;
        default: newItem = {};
      }
      newItems.push(newItem);
      return { ...prev, [section]: newItems };
    });
  };

  const handleRemoveItem = (section: 'projects' | 'skills' | 'experience'| 'navLinks' | 'videos', index: number) => {
    setLocalData(prev => {
      const source = Array.isArray((prev as any)[section]) ? (prev as any)[section] : [];
      const newItems = [...source];
      newItems.splice(index, 1);
      return { ...prev, [section]: newItems };
    });
  };

  const renderGeneralForm = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">General Settings</h3>
      <div>
        <label className="block text-sm font-medium text-slate-400">Display Name</label>
        <input type="text" value={localData.name} onChange={e => handleRootInputChange('name', e.target.value)} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"/>
      </div>
       <div>
        <label className="block text-sm font-medium text-slate-400">Logo URL (Base64 or link)</label>
        <textarea value={localData.logoUrl} onChange={e => handleRootInputChange('logoUrl', e.target.value)} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 h-24"/>
      </div>
    </div>
  );


  const renderHeroForm = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">Hero Section</h3>
      <div>
        <label className="block text-sm font-medium text-slate-400">Greeting</label>
        <input type="text" value={localData.hero.greeting} onChange={e => handleInputChange('hero', 'greeting', e.target.value)} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"/>
      </div>
       <div>
        <label className="block text-sm font-medium text-slate-400">Name (in hero section)</label>
        <input type="text" value={localData.hero.name} onChange={e => handleInputChange('hero', 'name', e.target.value)} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"/>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-400">Title</label>
        <input type="text" value={localData.hero.title} onChange={e => handleInputChange('hero', 'title', e.target.value)} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"/>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-400">Subtitle</label>
        <textarea value={localData.hero.subtitle} onChange={e => handleInputChange('hero', 'subtitle', e.target.value)} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 h-24"/>
      </div>
    </div>
  );
  
   const renderProjectsForm = () => (
    <div className="space-y-6">
       <h3 className="text-xl font-semibold text-white">Projects Section</h3>
      {localData.projects.map((project, index) => (
        <div key={index} className="bg-slate-800 p-4 rounded-lg space-y-3">
             <h4 className="text-lg font-semibold text-cyan-400">Project {index + 1}</h4>
          <div>
            <label className="block text-sm font-medium text-slate-400">Title</label>
            <input type="text" value={project.title} onChange={e => handleProjectChange(index, 'title', e.target.value)} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400">Description</label>
            <textarea value={project.description} onChange={e => handleProjectChange(index, 'description', e.target.value)} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"/>
          </div>
           <div>
            <label className="block text-sm font-medium text-slate-400">Image URL</label>
            <input type="text" value={project.image} onChange={e => handleProjectChange(index, 'image', e.target.value)} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"/>
          </div>
           <div>
            <label className="block text-sm font-medium text-slate-400">Category</label>
            <input type="text" value={project.category} onChange={e => handleProjectChange(index, 'category', e.target.value)} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"/>
          </div>
           <div>
            <label className="block text-sm font-medium text-slate-400">Tags (comma separated)</label>
            <input type="text" value={project.tags.join(', ')} onChange={e => handleProjectChange(index, 'tags', e.target.value)} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"/>
          </div>
           <div>
            <label className="block text-sm font-medium text-slate-400">Live URL</label>
            <input type="text" value={project.liveUrl ?? ''} onChange={e => handleProjectChange(index, 'liveUrl', e.target.value)} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400">Repo URL</label>
            <input type="text" value={project.repoUrl} onChange={e => handleProjectChange(index, 'repoUrl', e.target.value)} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"/>
          </div>
          <button onClick={() => handleRemoveItem('projects', index)} className="text-red-400 hover:text-red-300 text-sm font-medium">Remove Project</button>
        </div>
      ))}
      <button onClick={() => handleAddItem('projects')} className="bg-cyan-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-cyan-700 transition-colors">Add Project</button>
    </div>
  );

  const renderVideosForm = () => {
    const videos = localData.videos ?? [];

    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-white">Videos Section</h3>
        {videos.map((video, index) => (
          <div key={index} className="bg-slate-800 p-4 rounded-lg space-y-3">
            <h4 className="text-lg font-semibold text-cyan-400">Video {index + 1}</h4>
            <div>
              <label className="block text-sm font-medium text-slate-400">Title</label>
              <input
                type="text"
                value={video.title}
                onChange={e => handleVideoChange(index, 'title', e.target.value)}
                className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400">Description</label>
              <textarea
                value={video.description}
                onChange={e => handleVideoChange(index, 'description', e.target.value)}
                className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400">Video URL</label>
              <input
                type="text"
                value={video.videoUrl}
                onChange={e => handleVideoChange(index, 'videoUrl', e.target.value)}
                className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400">Thumbnail URL (optional)</label>
              <input
                type="text"
                value={video.thumbnailUrl ?? ''}
                onChange={e => handleVideoChange(index, 'thumbnailUrl', e.target.value)}
                className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
            <button
              onClick={() => handleRemoveItem('videos', index)}
              className="text-red-400 hover:text-red-300 text-sm font-medium"
            >
              Remove Video
            </button>
          </div>
        ))}
        <button
          onClick={() => handleAddItem('videos')}
          className="bg-cyan-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-cyan-700 transition-colors"
        >
          Add Video
        </button>
      </div>
    );
  };

  const renderContactForm = () => (
     <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">Contact Section</h3>
      <div>
        <label className="block text-sm font-medium text-slate-400">Email</label>
        <input type="email" value={localData.contact.email} onChange={e => handleInputChange('contact', 'email', e.target.value)} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"/>
      </div>
       <div>
        <label className="block text-sm font-medium text-slate-400">GitHub URL</label>
        <input type="text" value={localData.contact.githubUrl} onChange={e => handleInputChange('contact', 'githubUrl', e.target.value)} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"/>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-400">LinkedIn URL</label>
        <input type="text" value={localData.contact.linkedinUrl} onChange={e => handleInputChange('contact', 'linkedinUrl', e.target.value)} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"/>
      </div>
    </div>
  )


  const tabs = [
    { id: 'general', label: 'General', content: renderGeneralForm },
    { id: 'hero', label: 'Hero', content: renderHeroForm },
    { id: 'projects', label: 'Projects', content: renderProjectsForm },
    { id: 'videos', label: 'Videos', content: renderVideosForm },
    { id: 'contact', label: 'Contact', content: renderContactForm },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-lg shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white">Edit Portfolio Content</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">&times;</button>
        </div>
        <div className="flex flex-grow overflow-hidden">
          <aside className="w-1/4 border-r border-slate-700 p-4">
            <nav className="flex flex-col space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-left rounded-md font-medium transition-colors ${activeTab === tab.id ? 'bg-cyan-500 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </aside>
          <main className="w-3/4 p-6 overflow-y-auto">
            {tabs.find(tab => tab.id === activeTab)?.content()}
          </main>
        </div>
        <div className="p-4 border-t border-slate-700 flex justify-end gap-4">
          <button onClick={onClose} className="bg-slate-700 text-white font-semibold py-2 px-6 rounded-md hover:bg-slate-600 transition-colors">Cancel</button>
          <button onClick={handleSave} className="bg-cyan-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-cyan-600 transition-colors">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
