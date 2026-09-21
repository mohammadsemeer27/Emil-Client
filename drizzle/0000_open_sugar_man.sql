CREATE TABLE "emails" (
	"id" serial PRIMARY KEY NOT NULL,
	"sender" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"to" varchar(255),
	"subject" text DEFAULT '' NOT NULL,
	"preview" text DEFAULT '' NOT NULL,
	"body" text DEFAULT '' NOT NULL,
	"folder" varchar(20) DEFAULT 'inbox' NOT NULL,
	"starred" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
