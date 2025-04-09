
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a 
          href="#hero" 
          className="text-2xl font-bold text-theme-blue hover:text-theme-green transition-colors cursor-beam"
        >
          Pawan<span className="text-theme-amber">.</span>
        </a>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#about" className="text-foreground hover:text-theme-blue transition-colors">About</a>
          <a href="#skills" className="text-foreground hover:text-theme-blue transition-colors">Skills</a>
          <a href="#projects" className="text-foreground hover:text-theme-blue transition-colors">Projects</a>
          <a href="#contact" className="bg-theme-blue hover:bg-theme-green text-white px-4 py-2 rounded-md transition-colors">Contact</a>
        </div>
        
        <button 
          className="md:hidden text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background shadow-md animate-fadeIn">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a 
              href="#about" 
              className="text-foreground hover:text-theme-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#skills" 
              className="text-foreground hover:text-theme-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Skills
            </a>
            <a 
              href="#projects" 
              className="text-foreground hover:text-theme-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </a>
            <a 
              href="#contact" 
              className="bg-theme-blue hover:bg-theme-green text-white px-4 py-2 rounded-md transition-colors inline-block"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <div className="flex space-x-4 pt-2">
              <a href="https://github.com/GitHub" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-theme-blue transition-colors">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/LinkedIn" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-theme-blue transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:choprapawan3011@gmail.com" className="text-foreground hover:text-theme-blue transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
