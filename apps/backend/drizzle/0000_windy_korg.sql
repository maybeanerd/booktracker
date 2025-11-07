CREATE TABLE "books" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"author" varchar(255) NOT NULL,
	"isbn" varchar(13),
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
