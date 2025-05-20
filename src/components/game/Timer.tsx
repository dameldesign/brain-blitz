import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

interface TimerProps {
  initialTime: number
  onComplete: () => void
  isPaused: boolean
  key: number
  size?: number
  strokeWidth?: number
  className?: string
}

const Timer = ({
  initialTime,
  onComplete,
  isPaused,
  key,
  size = 48,
  strokeWidth = 8,
  className = ''
}: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [offset, setOffset] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  
  // Calculate circle circumference based on size
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI

  useEffect(() => {
    // Reset timer when question changes
    setTimeLeft(initialTime)
    setOffset(0)
    
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }, [key, initialTime])

  useEffect(() => {
    if (isPaused || timeLeft <= 0) return

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current as NodeJS.Timeout)
          onComplete()
          return 0
        }
        return prev - 1
      })

      // Update the stroke offset for the progress ring
      setOffset(circumference - ((initialTime - timeLeft + 1) / initialTime) * circumference)
    }, 1000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [timeLeft, isPaused, onComplete, initialTime, circumference])

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1e293b"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#3b82f6"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'linear' }}
        />
      </svg>
      
      {/* Timer text */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 20 }}
        key={timeLeft}
      >
        <span className="font-bold" style={{ fontSize: size * 0.4 }}>
          {timeLeft}
        </span>
      </motion.div>
    </div>
  )
}

export default Timer