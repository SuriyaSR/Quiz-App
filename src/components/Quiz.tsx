import { useState } from "react";
import { questions as allQuestions} from "../data/questions";

function shuffleAndPickFive (arr: typeof allQuestions) {
    const shuffled = [...arr].sort(() => 0.5 -  Math.random());
    return shuffled.slice(0, 5);
}

export default function Quiz() {
    const [showResults, setShowResults] = useState(false);
    const [quizQuestions, setQuizQuestions] = useState(() => shuffleAndPickFive(allQuestions));
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

    const handleAnswerClick = (selectedOption: string) => {
        setSelectedAnswer(selectedOption);
        if (selectedOption === currentQuestion.answer) {
            
            setScore(score + 1);
        }
    };

    const handleNextClick = () => {
        if(!selectedAnswer) return; // Prevent moving to next question if no answer is selected
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
        } else {
            setShowResults(true);
        }
    };

    const handleRestartQuiz = () => {
        setShowResults(false);        
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setQuizQuestions(shuffleAndPickFive(allQuestions));
    };

    if( showResults ) {
        return (
            <div className="h-screen bg-[#001e4d] flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg text-center">
                    <h1 className="text-2xl font-semibold text-[#001e4d] mb-6">Quiz Completed</h1>  
                    <p className="text-lg mb-6">Your Score: <strong>{score}</strong> out of {quizQuestions.length}</p> 
                    <button className="bg-green-600 px-4 py-2 text-white cursor-pointer hover:bg-green-700 rounded-md" onClick={handleRestartQuiz}>Restart Quiz</button>                  
                </div>
            </div>            
        )
    }
  return (
    <div className="h-screen bg-[#001e4d] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-[#001e4d] mb-6">Simple Quiz</h1>
        <h2 className="text-xl font-semibold mb-4">
            {currentQuestion.question}
        </h2>
        <div className="grid gap-6 mb-6">
            {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === option;
                return (
                <button 
                    disabled = {!!selectedAnswer}
                    key={index}
                    className={`text-left bg-gray-200 px-4 py-3 rounded-lg cursor-pointer text-xl hover:bg-blue-200 ${isSelected ? 'bg-green-300' : ''}`}
                    onClick={() => handleAnswerClick(option)}
                >
                    {option}
                </button>
            )})}
            
        </div>
        <div className="flex flex-col items-center justify-center gap-6">
            <button className="bg-[#001e4d] text-white px-8 py-2 rounded-sm text-xl cursor-pointer" onClick={handleNextClick}>Next</button>
            <div className="text-gray-600 text-sm text-center">
                Question {currentQuestionIndex + 1} of {quizQuestions.length}
            </div>
        </div>
      </div>
    </div>
  )
}
