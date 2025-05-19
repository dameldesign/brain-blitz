export interface QuizSettings {
    category: string
    difficulty: string
    amount: number
  }
  
  export interface QuizQuestion {
    category: string
    type: string
    difficulty: string
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
  }