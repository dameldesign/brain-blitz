import { motion } from 'framer-motion'
import { formatCategory, formatDifficulty, getDifficultyColor } from '../../utils/helpers'
import type { QuizQuestion } from '../../types/quiz'

interface QuestionCardProps {
  question: QuizQuestion
  flipped: boolean
  onFlip: () => void
  className?: string
}

const QuestionCard = ({ question, flipped, onFlip, className = '' }: QuestionCardProps) => {
  const difficultyColor = getDifficultyColor(question.difficulty)

  return (
    <motion.div
      className={`question-card relative w-full h-64 cursor-pointer ${className}`}
      onClick={onFlip}
      whileHover={!flipped ? { scale: 1.02 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      {/* Front of the card */}
      <motion.div
        className="question-front absolute w-full h-full bg-gray-800 rounded-xl p-6 flex flex-col justify-between backface-hidden shadow-lg"
        initial={false}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="flex justify-between items-start">
          <span className="px-3 py-1 bg-blue-600 rounded-full text-sm font-medium">
            {formatCategory(question.category)}
          </span>
          <span className={`px-3 py-1 ${difficultyColor} rounded-full text-sm font-medium`}>
            {formatDifficulty(question.difficulty)}
          </span>
        </div>
        
        <motion.p 
          className="text-xl md:text-2xl font-medium text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {question.question}
        </motion.p>
        
        <div className="flex justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ 
              repeat: Infinity,
              duration: 2,
              ease: 'linear'
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Back of the card */}
      <motion.div
        className="question-back absolute w-full h-full bg-gray-800 rounded-xl p-6 flex flex-col justify-center items-center backface-hidden shadow-lg"
        initial={{ rotateY: 180 }}
        animate={{ rotateY: flipped ? 0 : 180 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: 'spring',
              stiffness: 500,
              damping: 15
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mb-4 text-green-500 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </motion.div>
          
          <motion.h3 
            className="text-xl font-bold mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Correct Answer
          </motion.h3>
          
          <motion.p 
            className="text-gray-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            The correct answer is:{' '}
            <span className="font-bold text-white">{question.correct_answer}</span>
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default QuestionCard