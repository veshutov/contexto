'use server'

import { findGuessedWords, setGuessed } from '@/lib/db/queries'
import { z } from 'zod'

export async function getGuessedWords() {
  const guessedWords = await findGuessedWords()
  return guessedWords
}

const submitWordSchema = z.object({
  word: z.string().min(1).max(20),
})

export type SubmitWordState = {
  word?: string
  foundWord?: string
  foundWordRank?: number
  message?: string
}

export async function submitWord(
  initialState: SubmitWordState,
  formData: FormData,
): Promise<SubmitWordState> {
  const validatedFields = submitWordSchema.safeParse({
    word: formData.get('word'),
  })
  const word = validatedFields.data?.word
  if (!word) {
    return { message: 'Слово не найдено' }
  }

  const foundWord = await setGuessed({ id: word })

  if (!foundWord) {
    return { message: 'Слово не найдено' }
  }

  return { foundWord: foundWord.id, foundWordRank: foundWord.rank }
}
