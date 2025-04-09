
import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const updateCursorStyle = () => {
      const hoveredElement = document.elementFromPoint(position.x, position.y);
      
      if (hoveredElement) {
        const computedStyle = window.getComputedStyle(hoveredElement);
        setIsPointer(computedStyle.cursor === 'pointer');
        
        // Check if we're hovering over a link or button
        const isClickable = 
          hoveredElement.tagName === 'A' || 
          hoveredElement.tagName === 'BUTTON' ||
          hoveredElement.closest('a') || 
          hoveredElement.closest('button');
        
        setIsPointer(isClickable);
      } else {
        setIsPointer(false);
      }
    };
    
    const handleMouseLeave = () => {
      setIsHidden(true);
    };
    
    const handleMouseEnter = () => {
      setIsHidden(false);
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousemove', updateCursorStyle);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousemove', updateCursorStyle);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [position]);
  
  // Check if we're on a touch device
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <div className="hidden md:block">
      <div 
        className={`fixed pointer-events-none z-50 transition-transform duration-100 ${isHidden ? 'opacity-0' : 'opacity-100'}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div 
          className={`rounded-full mix-blend-difference transition-all duration-200 ${
            isPointer ? 'bg-white w-5 h-5 scale-150' : 'bg-theme-blue w-4 h-4'
          }`}
        ></div>
      </div>
      <div 
        className={`fixed rounded-full pointer-events-none z-40 ${isHidden ? 'opacity-0' : 'opacity-60'}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isPointer ? '40px' : '20px',
          height: isPointer ? '40px' : '20px',
          backgroundColor: isPointer ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s, height 0.3s, background-color 0.3s, transform 0.1s'
        }}
      ></div>
    </div>
  );
};

export default CustomCursor;
