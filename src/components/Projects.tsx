
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink, Github, ArrowRight, ArrowLeft } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
  features: string[];
}

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  
  const projects: Project[] = [
    {
      id: 'trafficpulse',
      title: 'TrafficPulse - Traffic Management Dashboard',
      description: 'A real-time traffic management solution that processes data from multiple intersections, reducing average wait times.',
      image: '/placeholder.svg',
      tags: ['React.js', 'Node.js', 'MongoDB', 'Google Maps API', 'Machine Learning'],
      github: 'https://github.com',
      features: [
        'Engineered a traffic management dashboard processing real-time data from 25 intersections',
        'Architected REST APIs integrating Google Maps data with ML-based vehicle detection',
        'Designed a scalable MongoDB schema to handle 1,000+ vehicle detection events per minute'
      ]
    },
    {
      id: 'swiftcart',
      title: 'SwiftCart - E-Commerce Website',
      description: 'A scalable full-stack e-commerce platform supporting user authentication, product management, and secure payments.',
      image: '/placeholder.svg',
      tags: ['React.js', 'Express.js', 'MongoDB', 'Material-UI', 'Stripe API'],
      link: 'https://example.com',
      github: 'https://github.com',
      features: [
        'Developed a scalable full-stack e-commerce platform supporting 500+ active users',
        'Implemented user authentication, catalog management, and efficient cart functionality',
        'Integrated Stripe payment gateway with custom error handling and security protocols'
      ]
    },
    {
      id: 'climatesync',
      title: 'ClimateSync - Weather App',
      description: 'A cross-device weather application that provides real-time weather data with an accessible interface.',
      image: '/placeholder.svg',
      tags: ['React.js', 'OpenWeatherMap API', 'Responsive Design', 'PWA'],
      link: 'https://example.com',
      github: 'https://github.com',
      features: [
        'Incorporated OpenWeatherMap API for precise real-time weather data',
        'Constructed a cross-device interface, improving accessibility and usability',
        'Streamlined API calls and lightweight design components, reducing load time by 40%'
      ]
    }
  ];
  
  const nextProject = () => {
    setActiveProject((prev) => (prev + 1) % projects.length);
  };
  
  const prevProject = () => {
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length);
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern grid-bg opacity-20 z-0"></div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <h2 className={cn(
          "text-3xl md:text-4xl font-bold text-center mb-16 relative inline-block",
          isVisible ? "animate-fadeIn" : "opacity-0"
        )}>
          Projects
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-theme-blue"></span>
        </h2>
        
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={prevProject}
              className="bg-white dark:bg-slate-800 p-2 rounded-full shadow-md hover:bg-theme-blue hover:text-white transition-colors z-20"
            >
              <ArrowLeft size={24} />
            </button>
            
            <div className="flex space-x-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveProject(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all",
                    activeProject === index 
                      ? "bg-theme-blue w-6" 
                      : "bg-muted hover:bg-theme-blue/50"
                  )}
                ></button>
              ))}
            </div>
            
            <button 
              onClick={nextProject}
              className="bg-white dark:bg-slate-800 p-2 rounded-full shadow-md hover:bg-theme-blue hover:text-white transition-colors z-20"
            >
              <ArrowRight size={24} />
            </button>
          </div>
          
          <div className="overflow-hidden relative">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeProject * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div 
                  key={project.id}
                  className="min-w-full p-2"
                >
                  <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-border h-full">
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <div className="text-3xl font-bold text-theme-blue">{project.title.split(' ')[0]}</div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Key Features:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          {project.features.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map(tag => (
                          <span key={tag} className="bg-theme-blue/10 text-theme-blue text-xs px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex space-x-4">
                        {project.link && (
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center space-x-1 text-theme-blue hover:text-theme-green transition-colors"
                          >
                            <ExternalLink size={16} />
                            <span>Live Demo</span>
                          </a>
                        )}
                        
                        {project.github && (
                          <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center space-x-1 text-theme-blue hover:text-theme-green transition-colors"
                          >
                            <Github size={16} />
                            <span>Source Code</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className={cn(
          "mt-16 text-center",
          isVisible ? "animate-fadeIn" : "opacity-0"
        )}>
          <p className="text-lg mb-4">Want to see more of my work?</p>
          <a 
            href="https://github.com/GitHub" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-theme-blue hover:bg-theme-green text-white px-6 py-3 rounded-md transition-colors inline-flex items-center space-x-2"
          >
            <Github size={18} />
            <span>Visit My GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
