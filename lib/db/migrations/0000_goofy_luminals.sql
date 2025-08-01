CREATE TABLE "words" (
	"id" varchar PRIMARY KEY NOT NULL,
	"rank" integer NOT NULL,
	"date" date NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
