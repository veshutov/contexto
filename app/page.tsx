import WordsSelector from './_components/words-selector'
import { getGuessedWords } from './actions'

export default async function MainPage() {
  const date = new Date()
  const guessedWords = await getGuessedWords({ date })
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <WordsSelector initialWords={guessedWords} />
    </main>
  )
}
