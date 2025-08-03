'use server'

import { findGuessedWords, tryGuess } from '@/lib/db/queries'
import { USER_ID_COOKIE } from '@/lib/utils'
import { cookies } from 'next/headers'
import { z } from 'zod'

export async function getGuessedWords({ date }: { date: Date }) {
  const cookieStore = await cookies()
  const userIdCookie = cookieStore.get(USER_ID_COOKIE)
  if (userIdCookie == null) {
    return []
  }

  return await findGuessedWords({ date, userId: userIdCookie.value })
}

const submitWordSchema = z.object({
  word: z.string().min(1).max(50),
  date: z.string().transform((str) => new Date(str)),
})

export type SubmitWordState = {
  word?: {
    word: string
    rank: number
  }
  message?: string
}

export async function submitWord(
  initialState: SubmitWordState,
  formData: FormData,
): Promise<SubmitWordState> {
  const cookieStore = await cookies()
  const userIdCookie = cookieStore.get(USER_ID_COOKIE)
  if (userIdCookie == null) {
    return { message: 'Ошибка авторизации' }
  }

  const validatedFields = submitWordSchema.parse({
    word: formData.get('word'),
    date: formData.get('date'),
  })
  const word = validatedFields.word.toLocaleLowerCase()
  const date = validatedFields.date
  const userId = userIdCookie.value

  const foundWord = await tryGuess({
    date,
    word,
    userId,
  })

  if (!foundWord) {
    return { message: 'Слово не найдено' }
  }

  return { word: { word: foundWord.word, rank: foundWord.rank } }
}
