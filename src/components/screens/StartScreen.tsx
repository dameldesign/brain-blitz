import { useState } from 'react'
import { motion } from 'framer-motion'
import type { QuizSettings } from '../../types/quiz'

interface StartScreenProps {
  onStart: (settings: QuizSettings) => void
}

export default function StartScreen({ onStart }: StartScreenProps) {
  const [category, setCategory] = useState('any')
  const [difficulty, setDifficulty] = useState('any')
  const [questionCount, setQuestionCount] = useState(10)
  const [isLoading, setIsLoading] = useState(false)

  const handleStart = () => {
    if (questionCount < 5 || questionCount > 20) {
      alert('Please select between 5 and 20 questions')
      return
    }
    
    setIsLoading(true)
    onStart({
      category,

      difficulty: difficulty as "any" | "easy" | "medium" | "hard",
      amount: questionCount,
    })
  }

  return (
    <div className="text-center">
      <motion.div
        className="bg-gray-800 rounded-xl p-8 mb-8 shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6">Welcome to Brain Blitz!</h2>
        
        <div className="mb-6">
          <label htmlFor="category-select" className="block mb-2 font-medium">
            Select Category:
          </label>
          <select
            id="category-select"
            className="bg-gray-700 text-white rounded-lg px-4 py-2 w-full md:w-64"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="any">Any Category</option>
            <option value="9">General Knowledge</option>
            <option value="17">Science & Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
          </select>
        </div>
        
        <div className="mb-6">
          <label htmlFor="difficulty-select" className="block mb-2 font-medium">
            Select Difficulty:
          </label>
          <select
            id="difficulty-select"
            className="bg-gray-700 text-white rounded-lg px-4 py-2 w-full md:w-64"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        
        <div className="mb-6">
          <label htmlFor="question-count" className="block mb-2 font-medium">
            Number of Questions (5-20):
          </label>
          <input
            type="number"
            id="question-count"
            min="5"
            max="20"
            value={questionCount}
            onChange={(e) => setQuestionCount(parseInt(e.target.value) || 10)}
            className="bg-gray-700 text-white rounded-lg px-4 py-2 w-full md:w-64"
          />
        </div>
      </motion.div>
      
      <motion.button
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all"
        onClick={handleStart}
        disabled={isLoading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </>
        ) : (
          <>
            Start Quiz
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          </>
        )}
      </motion.button>
    </div>
  )
}