import { motion } from 'framer-motion'

interface OptionProps {
  letter: string
  text: string
  onClick: () => void
  isSelected: boolean
  isCorrect: boolean
  showResult: boolean // Changed from isFeedbackVisible to showResult
  disabled: boolean
}

export default function Option({
  letter,
  text,
  onClick,
  isSelected,
  isCorrect,
  showResult, // Updated prop name
  disabled,
}: OptionProps) {
  const getBackground = () => {
    if (!showResult) {
      return isSelected 
        ? 'bg-blue-600' 
        : 'bg-gray-700 hover:bg-gray-600'
    }
    
    if (isCorrect) return 'bg-gradient-to-br from-green-400 to-green-600'
    if (isSelected && !isCorrect) return 'bg-gradient-to-br from-red-400 to-red-600'
    return 'bg-gray-700'
  }

  return (
    <motion.button
      className={`option ${getBackground()} text-left p-4 rounded-lg transition-all ${
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      }`}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { y: -3, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' } : {}}
      animate={
        showResult && isCorrect
          ? { scale: [1, 1.05, 1], transition: { duration: 0.5 } }
          : {}
      }
    >
      <div className="flex items-center">
        <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mr-3 font-medium">
          {letter}
        </span>
        <span>{text}</span>
      </div>
    </motion.button>
  )
}