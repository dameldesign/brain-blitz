import { type QuizQuestion } from '../types/quiz'
import { decodeHTML, shuffleArray } from './helpers'

const API_BASE_URL = 'https://opentdb.com/api.php'
const API_TIMEOUT = 8000 // 8 seconds timeout

/**
 * Fetches quiz questions from the Open Trivia Database API
 * @param settings Quiz settings including category, difficulty and amount
 * @returns Promise with array of quiz questions
 * @throws Error when request fails or timeout is reached
 */
export const fetchQuizQuestions = async (
  settings: { category: string; difficulty: string; amount: number }
): Promise<QuizQuestion[]> => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT)

  try {
    const params = new URLSearchParams({
      amount: settings.amount.toString(),
      encode: 'url3986'
    })

    if (settings.category !== 'any') params.append('category', settings.category)
    if (settings.difficulty !== 'any') params.append('difficulty', settings.difficulty)

    const response = await fetch(`${API_BASE_URL}?${params.toString()}`, {
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.response_code !== 0) {
      throw new Error('API returned no results')
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
  } catch (error) {
    clearTimeout(timeoutId)
    if (error instanceof Error) {
      throw new Error(`Failed to fetch questions: ${error.message}`)
    }
    throw new Error('Unknown error occurred while fetching questions')
  }
}

/**
 * Fetches available categories from the API
 * @returns Promise with array of categories
 */
export const fetchCategories = async () => {
  try {
    const response = await fetch('https://opentdb.com/api_category.php')
    const data = await response.json()
    return data.trivia_categories || []
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return []
  }
}