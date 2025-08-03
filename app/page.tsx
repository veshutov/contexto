import ContextGame from './_components/context-game'
import { getGuessedWords } from './actions'

export default async function MainPage() {
  const date = new Date()
  const guessedWords = await getGuessedWords({ date })
  const gameDate = new Date().toISOString().split('T')[0]
  const gameWon = guessedWords.find((w) => w.rank == 1) != null
  return (
    <main className="flex flex-1 flex-col items-center">
      <ContextGame gameDate={gameDate} gameWon={gameWon} initialWords={guessedWords} />
    </main>
  )
}
