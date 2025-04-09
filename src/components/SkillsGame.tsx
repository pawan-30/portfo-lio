
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface GameQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

const SkillsGame = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  
  const questions: GameQuestion[] = [
    {
      id: 1,
      question: "Which of these is not a JavaScript framework?",
      options: ["React", "Vue", "Angular", "Java"],
      correctAnswer: "Java"
    },
    {
      id: 2,
      question: "What does API stand for?",
      options: ["Application Programming Interface", "Application Process Integration", "Advanced Programming Interface", "Application Protocol Interface"],
      correctAnswer: "Application Programming Interface"
    },
    {
      id: 3,
      question: "Which database is categorized as NoSQL?",
      options: ["MySQL", "PostgreSQL", "Oracle", "MongoDB"],
      correctAnswer: "MongoDB"
    },
    {
      id: 4,
      question: "What is the primary use of REST APIs?",
      options: ["Database management", "Server-side rendering", "Communication between systems", "Frontend styling"],
      correctAnswer: "Communication between systems"
    },
  ];
  
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    
    if (isPlaying && !showResult) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleNextQuestion();
            return 15;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(timer);
  }, [isPlaying, currentQuestion, showResult]);
  
  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setCurrentQuestion(0);
    setShowResult(false);
    setTimeLeft(15);
  };
  
  const handleAnswer = (answer: string) => {
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }
    handleNextQuestion();
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setTimeLeft(15);
    } else {
      setShowResult(true);
    }
  };

  if (!isPlaying) {
    return (
      <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md text-center">
        <h3 className="text-xl font-semibold mb-4">Test Your Tech Knowledge!</h3>
        <p className="mb-6">Answer questions correctly to earn points. You have 15 seconds per question.</p>
        <button 
          onClick={startGame}
          className="bg-theme-blue hover:bg-theme-green text-white px-6 py-3 rounded-md transition-colors animate-pulse"
        >
          Start Game
        </button>
      </div>
    );
  }
  
  if (showResult) {
    return (
      <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md text-center animate-scaleUp">
        <h3 className="text-xl font-semibold mb-4">Game Completed!</h3>
        <p className="text-4xl font-bold text-theme-amber mb-6">{score} / {questions.length}</p>
        <p className="mb-6">
          {score === questions.length 
            ? "Perfect score! You're a tech wizard!" 
            : score >= questions.length / 2 
              ? "Great job! You know your stuff." 
              : "Keep learning! You'll improve next time."}
        </p>
        <button 
          onClick={startGame}
          className="bg-theme-blue hover:bg-theme-green text-white px-6 py-3 rounded-md transition-colors mr-4"
        >
          Play Again
        </button>
        <button 
          onClick={() => setIsPlaying(false)}
          className="border border-theme-blue text-theme-blue hover:bg-theme-blue/10 px-6 py-3 rounded-md transition-colors"
        >
          Exit Game
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <span className="font-medium">Question {currentQuestion + 1}/{questions.length}</span>
        <span className="font-medium">Score: {score}</span>
      </div>
      
      <div className="mb-2 w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-theme-blue h-2.5 rounded-full" style={{ width: `${(timeLeft / 15) * 100}%` }}></div>
      </div>
      <p className="text-right text-sm mb-4">{timeLeft} seconds left</p>
      
      <h3 className="text-xl font-semibold mb-6">{questions[currentQuestion].question}</h3>
      
      <div className="grid grid-cols-1 gap-4">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className="bg-white hover:bg-theme-blue hover:text-white border border-theme-blue text-theme-blue p-4 rounded-md transition-colors text-left"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SkillsGame;
