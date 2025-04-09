
import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Timer, Code, Check, X, Brain, Zap, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface GameQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const ImprovedSkillsGame = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  const questions: GameQuestion[] = [
    {
      id: 1,
      question: "Which of these is not a JavaScript framework?",
      options: ["React", "Vue", "Angular", "Java"],
      correctAnswer: "Java",
      explanation: "Java is a programming language, not a JavaScript framework. React, Vue, and Angular are all JavaScript frameworks."
    },
    {
      id: 2,
      question: "What does API stand for?",
      options: ["Application Programming Interface", "Application Process Integration", "Advanced Programming Interface", "Application Protocol Interface"],
      correctAnswer: "Application Programming Interface",
      explanation: "API stands for Application Programming Interface. It allows different software applications to communicate with each other."
    },
    {
      id: 3,
      question: "Which database is categorized as NoSQL?",
      options: ["MySQL", "PostgreSQL", "Oracle", "MongoDB"],
      correctAnswer: "MongoDB",
      explanation: "MongoDB is a NoSQL database that stores data in flexible, JSON-like documents. MySQL, PostgreSQL, and Oracle are relational databases."
    },
    {
      id: 4,
      question: "What does CSS stand for?",
      options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style System", "Colorful Style Sheets"],
      correctAnswer: "Cascading Style Sheets",
      explanation: "CSS stands for Cascading Style Sheets. It's used to style web pages and control the visual presentation of HTML elements."
    },
    {
      id: 5,
      question: "Which of these is a version control system?",
      options: ["Docker", "Git", "Kubernetes", "Jenkins"],
      correctAnswer: "Git",
      explanation: "Git is a distributed version control system for tracking changes in source code. Docker is a containerization platform, Kubernetes is a container orchestration system, and Jenkins is an automation server."
    },
    {
      id: 6,
      question: "What language is primarily used for iOS development?",
      options: ["Java", "Kotlin", "Swift", "C#"],
      correctAnswer: "Swift",
      explanation: "Swift is Apple's programming language for iOS, macOS, watchOS, and tvOS development. Java and Kotlin are used primarily for Android, while C# is used for .NET applications."
    },
  ];
  
  useEffect(() => {
    if (isPlaying && !showResult && !showExplanation) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimerEnd();
            return getTimeForDifficulty();
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentQuestion, showResult, showExplanation, difficulty]);
  
  const getTimeForDifficulty = () => {
    switch (difficulty) {
      case 'easy': return 20;
      case 'medium': return 15;
      case 'hard': return 10;
      default: return 20;
    }
  };
  
  const startGame = (selectedDifficulty: 'easy' | 'medium' | 'hard' = 'easy') => {
    setDifficulty(selectedDifficulty);
    setIsPlaying(true);
    setScore(0);
    setCurrentQuestion(0);
    setShowResult(false);
    setTimeLeft(getTimeForDifficulty());
    setSelectedAnswer(null);
    setShowExplanation(false);
    setStreak(0);
    
    // Notify the user that the game has started
    toast("Game started! Good luck!", {
      icon: <Zap className="text-theme-amber h-5 w-5" />,
    });
  };
  
  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    
    if (timerRef.current) clearInterval(timerRef.current);
    
    const isCorrect = answer === questions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setBestStreak(prev => Math.max(prev, newStreak));
      
      // Add bonus points for quick answers and streaks
      const timeBonus = Math.round((timeLeft / getTimeForDifficulty()) * 5);
      const streakBonus = Math.min(newStreak, 5);
      const difficultyMultiplier = 
        difficulty === 'easy' ? 1 : 
        difficulty === 'medium' ? 1.5 : 2;
      
      const pointsGained = Math.round((10 + timeBonus + streakBonus) * difficultyMultiplier);
      
      setScore(prev => prev + pointsGained);
      
      toast(`+${pointsGained} points! ${newStreak > 1 ? `${newStreak}x streak!` : ''}`, {
        icon: <Check className="text-green-500 h-5 w-5" />,
      });
    } else {
      setStreak(0);
      toast("Incorrect answer!", {
        icon: <X className="text-red-500 h-5 w-5" />,
      });
    }
    
    // Show explanation after answer
    setShowExplanation(true);
  };
  
  const handleTimerEnd = () => {
    setSelectedAnswer(null);
    setStreak(0);
    
    toast("Time's up!", {
      icon: <Timer className="text-red-500 h-5 w-5" />,
    });
    
    setShowExplanation(true);
  };
  
  const handleNextQuestion = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setTimeLeft(getTimeForDifficulty());
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setShowResult(true);
    }
  };

  if (!isPlaying) {
    return (
      <Card className="w-full max-w-md mx-auto overflow-hidden animate-scaleUp border-2 border-theme-blue/30">
        <CardHeader className="bg-gradient-to-r from-theme-blue to-theme-green text-white">
          <CardTitle className="flex items-center justify-center gap-2">
            <Brain className="h-6 w-6" /> Tech Skills Challenge
          </CardTitle>
          <CardDescription className="text-white/80">Test your knowledge and earn points!</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold">Ready to test your tech knowledge?</h3>
            <p className="text-muted-foreground">Answer questions correctly to earn points. The faster you answer, the more points you get!</p>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <Button 
              variant="outline" 
              onClick={() => startGame('easy')}
              className={cn(
                "flex flex-col h-auto py-4 transition-all",
                "hover:border-theme-green hover:bg-theme-green/10"
              )}
            >
              <span className="text-sm">Easy</span>
              <span className="text-xs text-muted-foreground">20 seconds</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => startGame('medium')}
              className={cn(
                "flex flex-col h-auto py-4 transition-all",
                "hover:border-theme-blue hover:bg-theme-blue/10"
              )}
            >
              <span className="text-sm">Medium</span>
              <span className="text-xs text-muted-foreground">15 seconds</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => startGame('hard')}
              className={cn(
                "flex flex-col h-auto py-4 transition-all",
                "hover:border-theme-amber hover:bg-theme-amber/10"
              )}
            >
              <span className="text-sm">Hard</span>
              <span className="text-xs text-muted-foreground">10 seconds</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (showResult) {
    const maxScore = questions.length * (difficulty === 'easy' ? 20 : difficulty === 'medium' ? 30 : 40);
    const percentage = Math.round((score / maxScore) * 100);
    
    let message = "";
    let icon = null;
    
    if (percentage >= 80) {
      message = "Outstanding! You're a tech wizard!";
      icon = <Trophy className="h-12 w-12 text-yellow-500" />;
    } else if (percentage >= 60) {
      message = "Great job! You know your stuff.";
      icon = <Award className="h-12 w-12 text-theme-blue" />;
    } else if (percentage >= 40) {
      message = "Good effort! Keep learning.";
      icon = <Code className="h-12 w-12 text-theme-green" />;
    } else {
      message = "Keep practicing! You'll improve next time.";
      icon = <Brain className="h-12 w-12 text-theme-amber" />;
    }
    
    return (
      <Card className="w-full max-w-md mx-auto overflow-hidden animate-scaleUp">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">{icon}</div>
          <CardTitle>Game Completed!</CardTitle>
          <CardDescription>
            Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="space-y-2">
            <p className="text-4xl font-bold text-theme-blue">{score} points</p>
            <p className="text-sm text-muted-foreground">({percentage}% of maximum possible)</p>
          </div>
          
          <div className="space-y-1">
            <p className="font-medium">{message}</p>
            <p className="text-sm text-muted-foreground">Best streak: {bestStreak} correct in a row</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4 p-6">
          <Button 
            onClick={() => startGame(difficulty)}
            className="bg-theme-blue hover:bg-theme-green text-white"
          >
            Play Again
          </Button>
          <Button 
            variant="outline"
            onClick={() => setIsPlaying(false)}
            className="border-theme-blue text-theme-blue hover:bg-theme-blue/10"
          >
            Change Difficulty
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden">
      <CardHeader className={cn(
        "relative py-3 border-b",
        difficulty === 'easy' ? "bg-green-50 dark:bg-green-900/20" : 
        difficulty === 'medium' ? "bg-blue-50 dark:bg-blue-900/20" : 
        "bg-amber-50 dark:bg-amber-900/20"
      )}>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm font-medium">Question {currentQuestion + 1}/{questions.length}</span>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Difficulty: {difficulty}</span>
              {streak > 1 && (
                <span className="flex items-center gap-1 text-theme-amber font-medium">
                  <Zap className="h-3 w-3" /> {streak}x streak!
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <span className="font-medium">Score: {score}</span>
            <div className="text-xs text-muted-foreground">Best streak: {bestStreak}</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">Time remaining</span>
            <span className="text-sm">{timeLeft}s</span>
          </div>
          <Progress 
            value={(timeLeft / getTimeForDifficulty()) * 100} 
            className={cn(
              "h-2 transition-all",
              timeLeft < getTimeForDifficulty() * 0.3 ? "bg-red-200" : 
              timeLeft < getTimeForDifficulty() * 0.6 ? "bg-amber-200" : 
              "bg-green-200"
            )}
          />
        </div>
        
        <h3 className="text-xl font-semibold">{questions[currentQuestion].question}</h3>
        
        <div className="grid grid-cols-1 gap-3">
          {questions[currentQuestion].options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === questions[currentQuestion].correctAnswer;
            const isIncorrect = isSelected && !isCorrect;
            
            return (
              <Button
                key={index}
                disabled={selectedAnswer !== null}
                onClick={() => handleAnswer(option)}
                variant="outline"
                className={cn(
                  "justify-start h-auto py-3 px-4 text-left transition-all border-2",
                  isSelected && isCorrect && "border-green-500 bg-green-50 dark:bg-green-900/20",
                  isIncorrect && "border-red-500 bg-red-50 dark:bg-red-900/20",
                  !selectedAnswer && "hover:border-theme-blue hover:bg-theme-blue/5"
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <span>{option}</span>
                  {isSelected && isCorrect && <Check className="h-5 w-5 text-green-500" />}
                  {isIncorrect && <X className="h-5 w-5 text-red-500" />}
                </div>
              </Button>
            );
          })}
        </div>
        
        {showExplanation && (
          <div className={cn(
            "p-4 rounded-md animate-fadeIn",
            selectedAnswer === questions[currentQuestion].correctAnswer 
              ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800" 
              : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
          )}>
            <p className="text-sm">
              <span className="font-semibold">Explanation: </span>
              {questions[currentQuestion].explanation}
            </p>
          </div>
        )}
      </CardContent>
      
      {showExplanation && (
        <CardFooter className="p-4 pt-0 flex justify-end">
          <Button 
            onClick={handleNextQuestion}
            className="bg-theme-blue hover:bg-theme-green text-white"
          >
            {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ImprovedSkillsGame;
