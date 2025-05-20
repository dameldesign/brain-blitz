import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { QuizResult } from '../../types/quiz'

interface ResultsScreenProps {
  result: QuizResult
  onPlayAgain: () => void
  onNewQuiz: () => void
}

interface LeaderboardEntry {
  name: string
  score: number
  date: string
}

export default function ResultsScreen({
  result,
  onPlayAgain,
  onNewQuiz,
}: ResultsScreenProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [name, setName] = useState('')

  useEffect(() => {
    // Load leaderboard from localStorage
    const savedLeaderboard = localStorage.getItem('leaderboard')
    if (savedLeaderboard) {
      setLeaderboard(JSON.parse(savedLeaderboard))
    }

    // Prompt for player name if score is good enough for leaderboard
    if (
      leaderboard.length < 10 ||
      result.percentage > (leaderboard[leaderboard.length - 1]?.score || 0)
    ) {
      const playerName = prompt('Enter your name for the leaderboard:', 'Anonymous')
      if (playerName) {
        setName(playerName)
        addToLeaderboard(playerName)
      }
    }
  }, [])

  const addToLeaderboard = (playerName: string) => {
    const newEntry = {
      name: playerName || 'Anonymous',
      score: result.percentage,
      date: new Date().toLocaleDateString(),
    }

    const updatedLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)

    setLeaderboard(updatedLeaderboard)
    localStorage.setItem('leaderboard', JSON.stringify(updatedLeaderboard))
  }

  const getResultMessage = () => {
    if (result.percentage >= 80) {
      return { text: 'Excellent! You\'re a quiz master!', color: 'text-green-500' }
    } else if (result.percentage >= 50) {
      return { text: 'Good job! You know your stuff!', color: 'text-blue-500' }
    } else {
      return { text: 'Keep practicing! You\'ll get better!', color: 'text-yellow-500' }
    }
  }

  const resultMessage = getResultMessage()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <div className="bg-gray-800 rounded-xl p-8 mb-8 shadow-xl">
          <h2 className="text-2xl font-bold mb-6">Quiz Completed!</h2>
          
          <div className="flex justify-center mb-6">
            <motion.div
              className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <span className="text-4xl font-bold">
                {result.score}/{result.totalQuestions}
              </span>
            </motion.div>
          </div>
          
          <p className={`text-xl mb-6 ${resultMessage.color}`}>
            {resultMessage.text}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-blue-400 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="font-bold text-xl">{result.correctAnswers}</span>
              <p className="text-gray-400">Correct</p>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-red-400 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <span className="font-bold text-xl">{result.incorrectAnswers}</span>
              <p className="text-gray-400">Incorrect</p>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-yellow-400 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <span className="font-bold text-xl">{result.percentage}%</span>
              <p className="text-gray-400">Score</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-bold mb-3">Leaderboard</h3>
            <div
              className="bg-gray-700 rounded-lg p-4 max-h-48 overflow-y-auto"
            >
              <div className="flex justify-between items-center py-2 border-b border-gray-600">
                <span className="font-medium">Player</span>
                <span className="font-medium">Score</span>
              </div>
              
              {leaderboard.length > 0 ? (
                leaderboard.map((entry, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center py-2 ${
                      index < leaderboard.length - 1 ? 'border-b border-gray-600' : ''
                    } ${entry.name === name ? 'text-blue-400' : ''}`}
                  >
                    <span>
                      {index + 1}. {entry.name}
                    </span>
                    <span className="font-bold">
                      {entry.score}% <span className="text-gray-400 text-sm">({entry.date})</span>
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-gray-400 py-4">No scores yet. Be the first!</div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-center gap-4">
          <motion.button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all"
            onClick={onPlayAgain}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Play Again
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
          </motion.button>
          
          <motion.button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all"
            onClick={onNewQuiz}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            New Quiz
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}