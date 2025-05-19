import { useState } from 'react'
import StartScreen from './components/screens/StartScreen'
import GameScreen from './components/screens/GameScreen'
import ResultsScreen from './components/screens/ResultsScreen'
import { QuizSettings, QuizResult } from './types/quiz'

export type Screen = 'start' | 'game' | 'results'

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('start')
  const [quizSettings, setQuizSettings] = useState<QuizSettings | null>(null)
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white font-sans">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {currentScreen === 'start' && (
          <StartScreen 
            onStart={(settings) => {
              setQuizSettings(settings)
              setCurrentScreen('game')
            }} 
          />
        )}
        
        {currentScreen === 'game' && quizSettings && (
          <GameScreen 
            settings={quizSettings}
            onComplete={(result) => {
              setQuizResult(result)
              setCurrentScreen('results')
            }}
          />
        )}
        
        {currentScreen === 'results' && quizResult && (
          <ResultsScreen 
            result={quizResult}
            onPlayAgain={() => setCurrentScreen('game')}
            onNewQuiz={() => setCurrentScreen('start')}
          />
        )}
      </div>
    </div>
  )
}

export default App