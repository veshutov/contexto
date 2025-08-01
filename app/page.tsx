import WordsSelector from './_components/words-selector'
import { getGuessedWords } from './actions'

export default async function MainPage() {
  const guessedWords = (await getGuessedWords()).map((w) => {
    return { word: w.id, rank: w.rank }
  })
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <WordsSelector initialWords={guessedWords} />
    </main>
  )
}
