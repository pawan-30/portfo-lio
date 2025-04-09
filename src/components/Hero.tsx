
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const [activeLight, setActiveLight] = useState<'red' | 'yellow' | 'green'>('red');
  const [isVisible, setIsVisible] = useState(false);
  
  // Cycle through traffic light colors
  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setActiveLight(prev => {
        if (prev === 'red') return 'yellow';
        if (prev === 'yellow') return 'green';
        return 'red';
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center pt-16 overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-pattern grid-bg opacity-20 z-0"></div>
      
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center z-10">
        <div className={`space-y-6 ${isVisible ? 'animate-slideRight' : 'opacity-0'}`}>
          <h1 className="text-4xl md:text-6xl font-bold">
            <span className="block">Hi, I'm</span> 
            <span className="text-theme-blue">Pawan Chopra</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground">
            Computer Science Engineer & Full-Stack Developer
          </h2>
          <p className="text-lg">
            Specializing in real-time data processing, REST APIs, and interactive web experiences.
          </p>
          <div className="flex space-x-4">
            <a 
              href="#projects" 
              className="bg-theme-blue hover:bg-theme-green text-white px-6 py-3 rounded-md transition-all flex items-center space-x-2 hover:translate-x-1"
            >
              <span>View Projects</span>
              <ArrowRight size={18} />
            </a>
            <a 
              href="#contact" 
              className="border border-theme-blue hover:border-theme-green text-theme-blue hover:text-theme-green px-6 py-3 rounded-md transition-colors"
            >
              Contact Me
            </a>
          </div>
        </div>
        
        <div className={`flex justify-center ${isVisible ? 'animate-slideLeft' : 'opacity-0'}`}>
          <div className="traffic-light-container" onClick={() => {
            setActiveLight(prev => {
              if (prev === 'red') return 'yellow';
              if (prev === 'yellow') return 'green';
              return 'red';
            });
          }}>
            <div className="traffic-light animate-float">
              <div className={`light red ${activeLight === 'red' ? 'shadow-lg shadow-red-500/50' : 'opacity-30'}`}></div>
              <div className={`light yellow ${activeLight === 'yellow' ? 'shadow-lg shadow-yellow-500/50' : 'opacity-30'}`}></div>
              <div className={`light green ${activeLight === 'green' ? 'shadow-lg shadow-green-500/50' : 'opacity-30'}`}></div>
            </div>
            <p className="text-center mt-4 text-sm text-muted-foreground">Click to control traffic</p>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="flex flex-col items-center text-muted-foreground hover:text-theme-blue transition-colors">
          <span className="mb-2">Scroll Down</span>
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;
