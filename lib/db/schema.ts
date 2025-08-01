import { InferSelectModel } from "drizzle-orm";
import { boolean, date, integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const words = pgTable("words", {
  id: varchar("id").primaryKey(),
  rank: integer("rank").notNull(),
  date: date("date").notNull(),
  guessed: boolean("guessed").notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
});

export type Word = InferSelectModel<typeof words>