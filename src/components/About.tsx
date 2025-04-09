
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
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
      id="about" 
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <h2 className={cn(
          "text-3xl md:text-4xl font-bold text-center mb-16 relative inline-block",
          isVisible ? "animate-fadeIn" : "opacity-0"
        )}>
          About Me
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-theme-blue"></span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div 
            className={cn(
              "space-y-6",
              isVisible ? "animate-slideRight" : "opacity-0"
            )}
          >
            <div>
              <h3 className="text-2xl font-semibold text-theme-blue mb-3">Education</h3>
              <div className="bg-white/50 dark:bg-slate-800/50 p-6 rounded-lg shadow-sm border border-border">
                <h4 className="font-medium text-lg">B.Tech in Computer Science and Engineering</h4>
                <p className="text-muted-foreground">Maharaja Surajmal Institute of Technology</p>
                <p className="text-muted-foreground text-sm">Dec 2021 - Jun 2025</p>
                <p className="mt-2">CGPA: 8.5 (up to VI semester)</p>
              </div>
            </div>
            
            <div className="code-text p-4 rounded-md bg-slate-800 text-white text-sm overflow-hidden relative">
              <div className="flex space-x-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <p className="mb-1"><span className="text-blue-400">const</span> <span className="text-green-400">pawan</span> = {`{`}</p>
              <p className="ml-4 mb-1"><span className="text-yellow-400">name</span>: <span className="text-orange-400">'Pawan Chopra'</span>,</p>
              <p className="ml-4 mb-1"><span className="text-yellow-400">email</span>: <span className="text-orange-400">'choprapawan3011@gmail.com'</span>,</p>
              <p className="ml-4 mb-1"><span className="text-yellow-400">location</span>: <span className="text-orange-400">'Janakpuri, Delhi'</span>,</p>
              <p className="ml-4 mb-1"><span className="text-yellow-400">passion</span>: <span className="text-orange-400">'Building innovative tech solutions'</span></p>
              <p>{`}`};</p>
            </div>
          </div>
          
          <div 
            className={cn(
              "space-y-6",
              isVisible ? "animate-slideLeft" : "opacity-0"
            )}
          >
            <p className="text-lg">
              I am a passionate Computer Science student with a focus on web development and real-time data processing. My journey in tech started with a fascination for solving real-world problems through code.
            </p>
            
            <p>
              With experience in building scalable applications, I've developed expertise in the MERN stack, RESTful APIs, and database optimization. I enjoy creating efficient solutions that make a tangible impact.
            </p>
            
            <p>
              My recent work in traffic management systems demonstrated my ability to handle complex data integration, while my e-commerce project showcased my full-stack development capabilities.
            </p>
            
            <div className="pt-4 flex flex-wrap gap-4">
              <div className="bg-theme-blue/10 hover:bg-theme-blue/20 px-4 py-2 rounded-full transition-colors">
                <span className="text-theme-blue font-medium">Problem Solver</span>
              </div>
              <div className="bg-theme-green/10 hover:bg-theme-green/20 px-4 py-2 rounded-full transition-colors">
                <span className="text-theme-green font-medium">Team Player</span>
              </div>
              <div className="bg-theme-amber/10 hover:bg-theme-amber/20 px-4 py-2 rounded-full transition-colors">
                <span className="text-theme-amber font-medium">Innovative Thinker</span>
              </div>
              <div className="bg-purple-500/10 hover:bg-purple-500/20 px-4 py-2 rounded-full transition-colors">
                <span className="text-purple-500 font-medium">Continuous Learner</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
