
import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <footer className="bg-slate-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">Pawan<span className="text-theme-amber">.</span></h2>
            <p className="mt-2 text-gray-400">Computer Science Engineer & Developer</p>
          </div>
          
          <div className="flex space-x-4 mb-6 md:mb-0">
            <a 
              href="https://github.com/GitHub" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-theme-blue transition-colors p-2"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://linkedin.com/in/LinkedIn" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-theme-blue transition-colors p-2"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="mailto:choprapawan3011@gmail.com"
              className="hover:text-theme-blue transition-colors p-2"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="bg-theme-blue hover:bg-theme-green text-white p-3 rounded-full transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} />
          </button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Pawan Chopra. All rights reserved.</p>
          <p className="mt-1">Built with React & TailwindCSS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
