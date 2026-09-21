import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const emails = pgTable("emails", {
  id: serial("id").primaryKey(),

  sender: varchar("sender", { length: 255 }).notNull(),

  email: varchar("email", { length: 255 }).notNull(),

  to: varchar("to", { length: 255 }),

  subject: text("subject").notNull().default(""),

  preview: text("preview").notNull().default(""),

  body: text("body").notNull().default(""),

  folder: varchar("folder", { length: 20 })
    .notNull()
    .default("inbox"),

  starred: boolean("starred").notNull().default(false),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});