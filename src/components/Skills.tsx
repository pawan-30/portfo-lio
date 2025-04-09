
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Skill {
  name: string;
  level: number;
  category: 'programming' | 'frameworks' | 'backend' | 'tools';
  color: string;
}

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const skills: Skill[] = [
    { name: 'Python', level: 90, category: 'programming', color: 'bg-blue-500' },
    { name: 'JavaScript', level: 85, category: 'programming', color: 'bg-yellow-500' },
    { name: 'HTML', level: 90, category: 'programming', color: 'bg-orange-500' },
    { name: 'CSS', level: 85, category: 'programming', color: 'bg-blue-400' },
    { name: 'React.js', level: 85, category: 'frameworks', color: 'bg-blue-600' },
    { name: 'Express.js', level: 80, category: 'frameworks', color: 'bg-gray-700' },
    { name: 'Node.js', level: 80, category: 'frameworks', color: 'bg-green-600' },
    { name: 'Bootstrap', level: 85, category: 'frameworks', color: 'bg-purple-600' },
    { name: 'MongoDB', level: 75, category: 'backend', color: 'bg-green-700' },
    { name: 'MaterialUI', level: 80, category: 'tools', color: 'bg-blue-500' },
    { name: 'SemanticUI', level: 75, category: 'tools', color: 'bg-teal-500' },
    { name: 'GitHub', level: 85, category: 'tools', color: 'bg-gray-800' },
    { name: 'VS Code', level: 90, category: 'tools', color: 'bg-blue-600' },
    { name: 'Vercel', level: 80, category: 'tools', color: 'bg-black' },
  ];

  const categories = [
    { id: 'all', name: 'All Skills' },
    { id: 'programming', name: 'Programming' },
    { id: 'frameworks', name: 'Frameworks' },
    { id: 'backend', name: 'Backend' },
    { id: 'tools', name: 'Developer Tools' },
  ];
  
  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);
  
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
      id="skills" 
      ref={sectionRef}
      className="py-20 bg-muted/50"
    >
      <div className="container mx-auto px-4">
        <h2 className={cn(
          "text-3xl md:text-4xl font-bold text-center mb-16 relative inline-block",
          isVisible ? "animate-fadeIn" : "opacity-0"
        )}>
          Skills & Expertise
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-theme-blue"></span>
        </h2>
        
        <div className={cn(
          "flex flex-wrap justify-center gap-3 mb-12",
          isVisible ? "animate-fadeIn" : "opacity-0"
        )}>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "px-4 py-2 rounded-full transition-all",
                selectedCategory === category.id 
                  ? "bg-theme-blue text-white shadow-md" 
                  : "bg-white hover:bg-theme-blue/10 border border-border"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <div 
              key={skill.name}
              className={cn(
                "bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-border transition-all",
                isVisible ? "animate-scaleUp" : "opacity-0",
                hoveredSkill === skill.name ? "transform scale-105" : "",
                { "animation-delay-100": index % 3 === 1 },
                { "animation-delay-200": index % 3 === 2 }
              )}
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-lg">{skill.name}</h3>
                <span className="text-sm text-muted-foreground">{skill.level}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full ${skill.color} transition-all duration-1000 ease-in-out`}
                  style={{ 
                    width: isVisible ? `${skill.level}%` : '0%',
                    transitionDelay: `${index * 100}ms`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={cn(
          "mt-16 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-border text-center",
          isVisible ? "animate-fadeIn" : "opacity-0"
        )}>
          <h3 className="text-xl font-semibold mb-4">Interactive Skills Game</h3>
          <p className="mb-6">Test your programming knowledge! Click the correct answers to earn points.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <button className="bg-theme-blue/10 hover:bg-theme-blue/20 text-theme-blue p-4 rounded-lg transition-colors">
              HTML is a programming language
            </button>
            <button className="bg-theme-green/10 hover:bg-theme-green/20 text-theme-green p-4 rounded-lg transition-colors">
              React uses Virtual DOM
            </button>
            <button className="bg-theme-amber/10 hover:bg-theme-amber/20 text-theme-amber p-4 rounded-lg transition-colors">
              MongoDB is a SQL database
            </button>
            <button className="bg-purple-500/10 hover:bg-purple-500/20 text-purple-500 p-4 rounded-lg transition-colors">
              Node.js runs on the server
            </button>
          </div>
          
          <p className="text-muted-foreground text-sm">
            This interactive game is still under development. Check back soon for the full experience!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
