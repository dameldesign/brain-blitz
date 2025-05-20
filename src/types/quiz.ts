export interface QuizSettings {
    category: string
    difficulty: 'easy' | 'medium' | 'hard' | 'any'
    amount: number
  }
  
  export interface QuizQuestion {
    category: string
    type: 'multiple' | 'boolean'
    difficulty: 'easy' | 'medium' | 'hard'
    question: string
    correct_answer: string
    incorrect_answers: string[]
    shuffled_answers: string[]
  }
  
  export interface QuizResult {
    score: number
    totalQuestions: number
    correctAnswers: number
    incorrectAnswers: number
    percentage: number
    timeTaken: number // in seconds
    date: string // ISO date string
  }
  
  export interface LeaderboardEntry {
    id: string
    name: string
    score: number
    date: string
    category: string
    difficulty: string
  }
  
  export interface Category {
    id: number
    name: string
  }
  
  export interface ApiError {
    message: string
    code?: number
    isTimeout?: boolean
  }