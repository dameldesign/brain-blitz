import { useState, useCallback } from 'react'
import { type QuizQuestion, type QuizResult, type ApiError, type QuizSettings } from '../types/quiz'
import { fetchQuizQuestions } from '../utils/api'

export const useQuiz = (settings: QuizSettings) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [startTime, setStartTime] = useState<number | null>(null)
  
  const loadQuestions = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const fetchedQuestions = await fetchQuizQuestions(settings)
      setQuestions(fetchedQuestions)
      setCurrentIndex(0)
      setScore(0)
      setStartTime(Date.now())
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : 'Failed to load questions',
        isTimeout: err instanceof Error && err.message.includes('timeout')
      })
    } finally {
      setLoading(false)
    }
  }, [settings])
  
  const nextQuestion = useCallback(() => {
    setCurrentIndex(prev => prev + 1)
  }, [])
  
  const incrementScore = useCallback(() => {
    setScore(prev => prev + 1)
  }, [])
  
  const getResult = useCallback((): QuizResult => {
    const totalQuestions = questions.length
    const correctAnswers = score
    const incorrectAnswers = totalQuestions - correctAnswers
    const percentage = Math.round((correctAnswers / totalQuestions) * 100)
    const endTime = Date.now()
    const timeTaken = startTime ? Math.round((endTime - startTime) / 1000) : 0
    
    return {
      score,
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      percentage,
      timeTaken,
      date: new Date().toISOString()
    }
  }, [questions.length, score, startTime])
  
  const resetQuiz = useCallback(() => {
    setQuestions([])
    setCurrentIndex(0)
    setScore(0)
    setError(null)
    setStartTime(null)
  }, [])
  
  return {
    questions,
    loading,
    error,
    currentIndex,
    currentQuestion: questions[currentIndex],
    score,
    isLastQuestion: currentIndex >= questions.length - 1,
    isQuizStarted: questions.length > 0,
    loadQuestions,
    nextQuestion,
    incrementScore,
    getResult,
    resetQuiz
  }
}