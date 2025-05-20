/**
 * Decodes HTML entities in a string
 * @param html HTML string to decode
 * @returns Decoded string
 */
export const decodeHTML = (html: string): string => {
    const txt = document.createElement('textarea')
    txt.innerHTML = html
    return txt.value
  }
  
  /**
   * Shuffles an array in place using Fisher-Yates algorithm
   * @param array Array to shuffle
   * @returns Shuffled array
   */
  export const shuffleArray = <T>(array: T[]): T[] => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }
  
  /**
   * Formats a category name for display
   * @param category Raw category string from API
   * @returns Formatted category name
   */
  export const formatCategory = (category: string): string => {
    return category
      .replace(/Science:/g, '')
      .replace(/Entertainment:/g, '')
      .replace(/_/g, ' ')
  }
  
  /**
   * Formats difficulty for display
   * @param difficulty Raw difficulty string
   * @returns Capitalized difficulty
   */
  export const formatDifficulty = (difficulty: string): string => {
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1)
  }
  
  /**
   * Gets the color for a difficulty level
   * @param difficulty Difficulty level
   * @returns Tailwind color class
   */
  export const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'hard':
        return 'bg-red-500'
      default:
        return 'bg-blue-500'
    }
  }