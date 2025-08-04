CREATE TABLE "guess" (
	"user_id" varchar NOT NULL,
	"word" varchar NOT NULL,
	"date" date NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "guess_user_id_date_word_pk" PRIMARY KEY("user_id","date","word")
);
--> statement-breakpoint
CREATE TABLE "word" (
	"word" varchar NOT NULL,
	"rank" integer NOT NULL,
	"date" date NOT NULL,
	CONSTRAINT "word_word_date_pk" PRIMARY KEY("word","date")
);
--> statement-breakpoint
ALTER TABLE "guess" ADD CONSTRAINT "guess_date_word_word_date_word_fk" FOREIGN KEY ("date","word") REFERENCES "public"."word"("date","word") ON DELETE no action ON UPDATE no action;