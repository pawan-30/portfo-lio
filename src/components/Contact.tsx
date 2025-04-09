
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Github, Linkedin, Mail, Send, AlertCircle } from 'lucide-react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
        
        // Reset form after a few seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }, 1500);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
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
      id="contact" 
      ref={sectionRef}
      className="py-20 bg-muted/50"
    >
      <div className="container mx-auto px-4">
        <h2 className={cn(
          "text-3xl md:text-4xl font-bold text-center mb-16 relative inline-block",
          isVisible ? "animate-fadeIn" : "opacity-0"
        )}>
          Get In Touch
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-theme-blue"></span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-10">
          <div 
            className={cn(
              "space-y-8",
              isVisible ? "animate-slideRight" : "opacity-0"
            )}
          >
            <h3 className="text-2xl font-semibold">Let's Connect</h3>
            <p className="text-lg">
              Feel free to reach out for collaborations, opportunities, or just to say hello!
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="bg-theme-blue/10 p-3 rounded-full">
                  <Mail className="text-theme-blue" size={24} />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <a 
                    href="mailto:choprapawan3011@gmail.com" 
                    className="text-theme-blue hover:underline"
                  >
                    choprapawan3011@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-theme-blue/10 p-3 rounded-full">
                  <Linkedin className="text-theme-blue" size={24} />
                </div>
                <div>
                  <h4 className="font-medium">LinkedIn</h4>
                  <a 
                    href="https://linkedin.com/in/LinkedIn" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-theme-blue hover:underline"
                  >
                    linkedin.com/in/LinkedIn
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-theme-blue/10 p-3 rounded-full">
                  <Github className="text-theme-blue" size={24} />
                </div>
                <div>
                  <h4 className="font-medium">GitHub</h4>
                  <a 
                    href="https://github.com/GitHub" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-theme-blue hover:underline"
                  >
                    github.com/GitHub
                  </a>
                </div>
              </div>
            </div>
            
            <div className="pt-8">
              <h4 className="font-medium mb-4">Connect With Me</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/GitHub" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 hover:bg-slate-900 text-white p-3 rounded-full transition-colors"
                >
                  <Github size={24} />
                </a>
                <a 
                  href="https://linkedin.com/in/LinkedIn" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors"
                >
                  <Linkedin size={24} />
                </a>
                <a 
                  href="mailto:choprapawan3011@gmail.com"
                  className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-colors"
                >
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </div>
          
          <div 
            className={cn(
              "bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md border border-border",
              isVisible ? "animate-slideLeft" : "opacity-0"
            )}
          >
            <h3 className="text-2xl font-semibold mb-6">Send Me a Message</h3>
            
            {isSubmitted ? (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md text-green-600 dark:text-green-400 animate-fadeIn">
                <p className="flex items-center">
                  <span className="mr-2">✓</span>
                  Message sent successfully! I'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-1 font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className={cn(
                      "w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-theme-blue transition-colors",
                      errors.name ? "border-red-500 focus:ring-red-500" : "border-border"
                    )}
                  />
                  {errors.name && (
                    <p className="mt-1 text-red-500 text-sm flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.name}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-1 font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={cn(
                      "w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-theme-blue transition-colors",
                      errors.email ? "border-red-500 focus:ring-red-500" : "border-border"
                    )}
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-500 text-sm flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-1 font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    className={cn(
                      "w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-theme-blue transition-colors",
                      errors.message ? "border-red-500 focus:ring-red-500" : "border-border"
                    )}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-red-500 text-sm flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.message}
                    </p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full bg-theme-blue hover:bg-theme-green text-white py-3 px-6 rounded-md transition-colors flex items-center justify-center space-x-2",
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
