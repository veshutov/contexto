import { InferSelectModel } from 'drizzle-orm'
import {
  date,
  integer,
  pgTable,
  primaryKey,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

export const words = pgTable(
  'word',
  {
    word: varchar('word').notNull(),
    rank: integer('rank').notNull(),
    date: date('date', { mode: 'date' }).notNull(),
  },
  (word) => [primaryKey({ columns: [word.word, word.date] })],
)

export type Word = InferSelectModel<typeof words>

export const guess = pgTable(
  'guess',
  {
    userId: varchar('user_id').notNull(),
    word: varchar('word').notNull(),
    date: date('date', { mode: 'date' }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (guess) => [primaryKey({ columns: [guess.userId, guess.date, guess.word] })],
)

export type Guess = InferSelectModel<typeof guess>
