import { logger } from '@/logger'
import 'dotenv/config'
import { and, eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/node-postgres'
import { guess, words } from './schema'

export const db = drizzle(process.env.DATABASE_URL!)

export async function findGuessedWords({
  date,
  userId,
}: {
  date: Date
  userId: string
}) {
  try {
    const guessedWords = await db
      .select({ word: words.word, rank: words.rank })
      .from(guess)
      .innerJoin(words, eq(words.word, guess.word))
      .where(and(eq(guess.userId, userId), eq(guess.date, date), eq(words.date, date)))
    return guessedWords
  } catch (error) {
    logger.error('Failed to get guessed words from database')
    throw error
  }
}

export async function tryGuess({
  date,
  userId,
  word,
}: {
  date: Date
  userId: string
  word: string
}) {
  try {
    const foundWord = await findWord({ word, date })
    if (foundWord == null) {
      // слова нет в нашем словаре
      return undefined
    }
    await db
      .insert(guess)
      .values({
        date,
        userId,
        word,
      })
      // если такая попытка уже была, просто возвращаем ее
      .onConflictDoNothing()
    return foundWord
  } catch (error) {
    logger.error('Failed to insert guess in database')
    throw error
  }
}

export async function findWord({ word, date }: { word: string; date: Date }) {
  try {
    const foundWords = await db
      .select()
      .from(words)
      .where(and(eq(words.word, word), eq(words.date, date)))
    if (foundWords.length == 0) {
      return undefined
    } else {
      return foundWords[0]
    }
  } catch (error) {
    logger.error('Failed to get word from database')
    throw error
  }
}
