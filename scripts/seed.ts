import "dotenv/config";
import { db } from "../src/db";
import { emails } from "../src/db/schema";

async function seed() {
  console.log("🌱 Seeding emails...");

  await db.insert(emails).values([
    {
      sender: "John Smith",
      email: "john@example.com",
      to: "mohammad@example.com",
      subject: "Meeting tomorrow",
      preview: "Hi, just wanted to confirm our meeting tomorrow.",
      body: "Hi,\n\nJust wanted to confirm our meeting tomorrow at 10 AM.\n\nThanks,\nJohn",
      folder: "inbox",
      starred: true,
    },
    {
      sender: "Sarah Johnson",
      email: "sarah@example.com",
      to: "mohammad@example.com",
      subject: "Project update",
      preview: "Here is the latest update on our project.",
      body: "Hi,\n\nHere is the latest update on our project. Everything is going according to plan.\n\nRegards,\nSarah",
      folder: "inbox",
      starred: false,
    },
    {
      sender: "Alex Brown",
      email: "alex@example.com",
      to: "john@example.com",
      subject: "Welcome to the team",
      preview: "Welcome! We are happy to have you on the team.",
      body: "Hi,\n\nWelcome to the team! We are happy to have you with us.\n\nBest,\nAlex",
      folder: "sent",
      starred: false,
    },
  ]);

  console.log("✅ Emails seeded successfully!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Seed failed:", error);
  process.exit(1);
});
