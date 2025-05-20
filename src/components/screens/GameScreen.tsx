import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useQuiz } from '../../hooks/useQuiz'
import QuestionCard from '../game/QuestionCard'
import Timer from '../game/Timer'
import Option from '../game/Option'
import type { QuizResult, QuizSettings } from '../../types/quiz'

interface GameScreenProps {
  settings: QuizSettings
  onComplete: (result: QuizResult) => void
}

export default function GameScreen({ settings, onComplete }: GameScreenProps) {
    const {
      questions,
      loading,
      error,
      currentIndex,
      currentQuestion,
      score,
      isLastQuestion,
      loadQuestions,
      nextQuestion,
      incrementScore,
      getResult,
    } = useQuiz(settings)
  
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const [showFeedback, setShowFeedback] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
  
    useEffect(() => {
      loadQuestions()
    }, [loadQuestions])
  
    useEffect(() => {
      // Reset states when question changes
      setSelectedOption(null)
      setShowFeedback(false)
      setIsPaused(false)
    }, [currentIndex])
  
    const handleOptionSelect = (option: string) => {
      if (selectedOption !== null) return
      
      setSelectedOption(option)
      setIsPaused(true)
      
      if (option === currentQuestion?.correct_answer) {
        incrementScore()
      }
      
      setTimeout(() => setShowFeedback(true), 500)
    }
  
    const handleNextQuestion = () => {
      if (isLastQuestion) {
        onComplete(getResult())
      } else {
        nextQuestion()
      }
    }
  
    const handleTimeUp = () => {
      setIsPaused(true)
      setShowFeedback(true)
    }
  
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )
    }
  
    if (error) {
      return (
        <div className="text-center p-8 bg-red-900/30 rounded-xl">
          <h3 className="text-xl font-bold mb-2">Error loading questions</h3>
          <p className="mb-4">{error.message}</p>
          <button
            onClick={loadQuestions}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Try Again
          </button>
        </div>
      )
    }
  
    if (!currentQuestion) return null
  
    return (
      <>
        {/* Progress and Timer */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-3">
              <span className="font-bold">{currentIndex + 1}</span>
            </div>
            <span className="text-gray-300">of</span>
            <span className="ml-1 font-bold">{questions.length}</span>
          </div>
  
          <Timer
            key={currentIndex}
            initialTime={15}
            onComplete={handleTimeUp}
            isPaused={isPaused}
          />
        </div>
  
        {/* Progress Bar */}
        <div className="w-full bg-gray-800 rounded-full h-2.5 mb-8">
          <motion.div
            className="bg-blue-600 h-2.5 rounded-full"
            initial={{ width: '0%' }}
            animate={{
              width: `${((currentIndex) / questions.length) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
  
        {/* Question Card */}
        <QuestionCard
          question={currentQuestion}
          flipped={showFeedback}
          onFlip={() => selectedOption && setShowFeedback(!showFeedback)}
        />
  
        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {currentQuestion.shuffled_answers.map((option, index) => (
            <Option
              key={index}
              letter={String.fromCharCode(65 + index)}
              text={option}
              onClick={() => handleOptionSelect(option)}
              isSelected={selectedOption === option}
              isCorrect={option === currentQuestion.correct_answer}
              showResult={showFeedback} 
              disabled={selectedOption !== null}
            />
          ))}
        </div>
  
        {/* Next Button */}
        {showFeedback && (
          <div className="text-center">
            <motion.button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all"
              onClick={handleNextQuestion}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLastQuestion ? 'See Results' : 'Next Question'}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 inline ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
          </div>
        )}
      </>
    )
  }