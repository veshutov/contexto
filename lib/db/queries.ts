import { logger } from '@/logger'
import 'dotenv/config'
import { eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Word, words } from './schema'

export const db = drizzle(process.env.DATABASE_URL!)

export async function findGuessedWords() {
  try {
    const foundWords = await db
      .select()
      .from(words)
      .where(eq(words.guessed, true))
      return foundWords
  } catch (error) {
    logger.error('Failed to get guessed words from database')
    throw error
  }
}

export async function setGuessed({
  id,
}: {
  id: string
}): Promise<Word | undefined> {
  try {
    const foundWords = await db
      .update(words)
      .set({ guessed: true })
      .where(eq(words.id, id))
      .returning()
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
