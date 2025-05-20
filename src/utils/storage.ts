import type { LeaderboardEntry } from "../types/quiz"

const LEADERBOARD_KEY = 'brainBlitz_leaderboard'

interface StoredLeaderboard {
  version: number
  data: LeaderboardEntry[]
}

const CURRENT_VERSION = 1

/**
 * Saves leaderboard data to localStorage
 * @param entries Leaderboard entries to save
 */
export const saveLeaderboard = (entries: LeaderboardEntry[]): void => {
  try {
    const data: StoredLeaderboard = {
      version: CURRENT_VERSION,
      data: entries
    }
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Failed to save leaderboard:', error)
  }
}

/**
 * Loads leaderboard data from localStorage
 * @returns Array of leaderboard entries
 */
export const loadLeaderboard = (): LeaderboardEntry[] => {
  try {
    const storedData = localStorage.getItem(LEADERBOARD_KEY)
    if (!storedData) return []

    const parsedData: StoredLeaderboard = JSON.parse(storedData)
    
    // Handle potential future migrations if version changes
    if (parsedData.version !== CURRENT_VERSION) {
      // Here you could add migration logic if needed
      return parsedData.data
    }

    return parsedData.data
  } catch (error) {
    console.error('Failed to load leaderboard:', error)
    return []
  }
}

/**
 * Adds a new entry to the leaderboard
 * @param entry New leaderboard entry
 * @returns Updated leaderboard
 */
export const addToLeaderboard = (entry: Omit<LeaderboardEntry, 'id'>): LeaderboardEntry[] => {
  const currentLeaderboard = loadLeaderboard()
  const newEntry = {
    ...entry,
    id: Date.now().toString()
  }

  const updatedLeaderboard = [...currentLeaderboard, newEntry]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10) // Keep only top 10

  saveLeaderboard(updatedLeaderboard)
  return updatedLeaderboard
}