'use server'

import { auth } from '@/lib/auth'
import { findGuessedWords, tryGuess } from '@/lib/db/queries'
import { headers } from 'next/headers'
import { z } from 'zod'

export async function getGuessedWords({ date }: { date: Date }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (session?.user.id == null) {
    return []
  }

  return await findGuessedWords({ date, userId: session.user.id })
}

const submitWordSchema = z.object({
  word: z.string().min(1).max(20),
  date: z.string().transform((str) => new Date(str)),
})

export type SubmitWordState = {
  foundWord?: string
  foundWordRank?: number
  message?: string
}

export async function submitWord(
  initialState: SubmitWordState,
  formData: FormData,
): Promise<SubmitWordState> {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (session?.user.id == null) {
    return { message: 'Ошибка авторизации' }
  }

  const validatedFields = submitWordSchema.parse({
    word: formData.get('word'),
    date: formData.get('date'),
  })
  const word = validatedFields.word
  const date = validatedFields.date
  const userId = session.user.id

  const foundWord = await tryGuess({
    date,
    word,
    userId,
  })

  if (!foundWord) {
    return { message: 'Слово не найдено' }
  }

  return { foundWord: foundWord.word, foundWordRank: foundWord.rank }
}
