import { useState, useEffect } from 'react'
import { fetchQuizQuestions } from '../utils/api'
import { QuizQuestion, QuizResult } from '../types/quiz'

export const useQuiz = (settings: { category: string; difficulty: string; amount: number }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  
  const loadQuestions = async () => {
    setLoading(true)
    setError(null)
    try {
      const fetchedQuestions = await fetchQuizQuestions(settings)
      setQuestions(fetchedQuestions)
      setCurrentIndex(0)
      setScore(0)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load questions')
    } finally {
      setLoading(false)
    }
  }
  
  const nextQuestion = () => {
    setCurrentIndex(prev => prev + 1)
  }
  
  const incrementScore = () => {
    setScore(prev => prev + 1)
  }
  
  const getResult = (): QuizResult => {
    const totalQuestions = questions.length
    const correctAnswers = score
    const incorrectAnswers = totalQuestions - correctAnswers
    const percentage = Math.round((correctAnswers / totalQuestions) * 100)
    
    return {
      score,
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      percentage
    }
  }
  
  return {
    questions,
    loading,
    error,
    currentIndex,
    currentQuestion: questions[currentIndex],
    score,
    isLastQuestion: currentIndex >= questions.length - 1,
    loadQuestions,
    nextQuestion,
    incrementScore,
    getResult
  }
}