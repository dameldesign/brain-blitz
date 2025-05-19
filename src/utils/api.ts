import { QuizQuestion } from '../types/quiz'
import { decodeHTML, shuffleArray } from './helpers'

const API_URL = 'https://opentdb.com/api.php'

export const fetchQuizQuestions = async (
  settings: { category: string; difficulty: string; amount: number }
): Promise<QuizQuestion[]> => {
  let url = `${API_URL}?amount=${settings.amount}&encode=url3986`
  
  if (settings.category !== 'any') {
    url += `&category=${settings.category}`
  }
  
  if (settings.difficulty !== 'any') {
    url += `&difficulty=${settings.difficulty}`
  }
  
  const response = await fetch(url)
  const data = await response.json()
  
  if (data.response_code !== 0) {
    throw new Error('Could not load questions. Please try again.')
  }
  
  return data.results.map((question: any) => ({
    ...question,
    question: decodeHTML(question.question),
    correct_answer: decodeHTML(question.correct_answer),
    incorrect_answers: question.incorrect_answers.map((a: string) => decodeHTML(a)),
    shuffled_answers: shuffleArray([
      ...question.incorrect_answers.map((a: string) => decodeHTML(a)),
      decodeHTML(question.correct_answer)
    ])
  }))
}