# 📧 Email Client

A modern full-stack email client built with **Next.js, TypeScript, Tailwind CSS, PostgreSQL, and Drizzle ORM**.

This project was developed based on the reference email-client design and includes core email management functionality such as inbox, sent emails, drafts, trash, search, compose, reply, and forward.

---

## 🚀 Features

- 📥 Inbox
- ⭐ Star / Unstar emails
- 📤 Sent emails
- 📝 Draft emails
- 🗑️ Trash
- ♻️ Restore emails from trash
- ❌ Permanently delete emails
- 🔍 Search emails
- ✉️ Compose new emails
- 💾 Save emails as drafts
- ✏️ Edit existing drafts
- 📤 Send saved drafts
- ↩️ Reply to emails
- ↪️ Forward emails
- 👀 Email viewer
- 📱 Responsive interface
- 🗄️ PostgreSQL database
- 🔌 REST API using Next.js Route Handlers
- 💾 Persistent database storage using Drizzle ORM

---

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- Next.js API Routes / Route Handlers
- PostgreSQL
- Drizzle ORM

### Development Tools

- Node.js
- npm
- Git
- GitHub

---

## 📂 Project Structure

```text
email-client/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── emails/
│   │   │       ├── route.ts
│   │   │       └── [id]/
│   │   │           └── route.ts
│   │   ├── page.tsx
│   │   └── ...
│   │
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── EmailList.tsx
│   │   ├── EmailViewer.tsx
│   │   └── ComposeEmail.tsx
│   │
│   └── db/
│       ├── index.ts
│       └── schema.ts
│
├── drizzle/
├── public/
├── .env
├── drizzle.config.ts
├── package.json
└── README.md
