"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import EmailList from "@/components/EmailList";
import EmailViewer from "@/components/EmailViewer";
import ComposeEmail from "@/components/ComposeEmail";

import type { Email } from "@/types/email";

// const initialEmails: Email[] = [
//   {
//     id: 1,
//     sender: "John Smith",
//     email: "john@example.com",
//     subject: "Meeting tomorrow",
//     preview: "Hi, are we still meeting tomorrow at 10 AM?",
//     body: "Hi, are we still meeting tomorrow at 10 AM? Please let me know if the time works for you.",
//     folder: "inbox",
//     starred: true,
//   },
//   {
//     id: 2,
//     sender: "Sarah Johnson",
//     email: "sarah@example.com",
//     subject: "Project update",
//     preview: "Here is the latest update regarding our project.",
//     body: "Here is the latest update regarding our project. We have completed most of the work and should be ready for the next phase soon.",
//     folder: "inbox",
//     starred: false,
//   },
//   {
//     id: 3,
//     sender: "Alex Brown",
//     email: "alex@example.com",
//     subject: "Welcome to the team",
//     preview: "We are happy to have you on the team!",
//     body: "Welcome to the team! We are happy to have you with us. Feel free to reach out if you have any questions.",
//     folder: "sent",
//     starred: false,
//   },
// ];




export default function Home() {
  const [emails, setEmails] = useState<Email[]>([]);

  const [selectedEmail, setSelectedEmail] =
    useState<Email | null>(null);

  const [isComposeOpen, setIsComposeOpen] =
    useState(false);

  const [editingDraft, setEditingDraft] =
    useState<Email | null>(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [activeFolder, setActiveFolder] =
    useState("inbox");

  /*
   * Filter emails
   */
  const filteredEmails = emails.filter((email) => {
    const search = searchTerm.toLowerCase();

    const matchesFolder =
      activeFolder === "starred"
        ? email.starred
        : email.folder === activeFolder;

    const matchesSearch =
      email.sender.toLowerCase().includes(search) ||
      email.subject.toLowerCase().includes(search) ||
      email.preview.toLowerCase().includes(search) ||
      email.body.toLowerCase().includes(search);

    return matchesFolder && matchesSearch;
  });

  /*
   * Folder titles
   */
  const folderTitles: Record<string, string> = {
    inbox: "Inbox",
    starred: "Starred",
    sent: "Sent",
    drafts: "Drafts",
    trash: "Trash",
  };

  /*
   * Star / Unstar
   */
  const handleToggleStar = async (id: number) => {
  const email = emails.find((email) => email.id === id);

  if (!email) return;

  const oldStarred = email.starred;
  const newStarred = !oldStarred;

  // Update UI immediately
  setEmails((currentEmails) =>
    currentEmails.map((email) =>
      email.id === id
        ? { ...email, starred: newStarred }
        : email
    )
  );

  try {
    const response = await fetch(`/api/emails/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        starred: newStarred,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update star");
    }
  } catch (error) {
    console.error("Failed to update star:", error);

    // Restore previous state
    setEmails((currentEmails) =>
      currentEmails.map((email) =>
        email.id === id
          ? { ...email, starred: oldStarred }
          : email
      )
    );
  }
};

  /*
   * Move email to Trash
   */
const handleDeleteEmail = async (id: number) => {
  const email = emails.find((email) => email.id === id);

  if (!email) return;

  const oldFolder = email.folder;

  setEmails((currentEmails) =>
    currentEmails.map((email) =>
      email.id === id
        ? { ...email, folder: "trash" }
        : email
    )
  );

  try {
    const response = await fetch(`/api/emails/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        folder: "trash",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to move email to trash");
    }

    setSelectedEmail(null);
  } catch (error) {
    console.error("Failed to move email to trash:", error);

    setEmails((currentEmails) =>
      currentEmails.map((email) =>
        email.id === id
          ? { ...email, folder: oldFolder }
          : email
      )
    );
  }
};

  /*
   * Restore email
   */
 const handleRestoreEmail = async (id: number) => {
  const email = emails.find((email) => email.id === id);

  if (!email) return;

  const oldFolder = email.folder;

  setEmails((currentEmails) =>
    currentEmails.map((email) =>
      email.id === id
        ? { ...email, folder: "inbox" }
        : email
    )
  );

  try {
    const response = await fetch(`/api/emails/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        folder: "inbox",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to restore email");
    }
  } catch (error) {
    console.error("Failed to restore email:", error);

    setEmails((currentEmails) =>
      currentEmails.map((email) =>
        email.id === id
          ? { ...email, folder: oldFolder }
          : email
      )
    );
  }
};

  /*
   * Permanently delete
   */
 const handleDeletePermanently = async (id: number) => {
  try {
    const response = await fetch(`/api/emails/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to permanently delete email");
    }

    setEmails((currentEmails) =>
      currentEmails.filter((email) => email.id !== id)
    );

    if (selectedEmail?.id === id) {
      setSelectedEmail(null);
    }
  } catch (error) {
    console.error(
      "Failed to permanently delete email:",
      error
    );
  }
};

  /*
   * Save draft
   */
const handleSaveDraft = async (draft: Email) => {
  try {
    // Existing draft → update it
    if (draft.id && draft.id > 0) {
      const response = await fetch(`/api/emails/${draft.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: draft.sender,
          email: draft.email,
          to: draft.to,
          subject: draft.subject,
          preview: draft.preview,
          body: draft.body,
          folder: "drafts",
          starred: draft.starred,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update draft");
      }

      const updatedDraft = await response.json();

      setEmails((currentEmails) =>
        currentEmails.map((email) =>
          email.id === draft.id ? updatedDraft : email
        )
      );

      return;
    }

    // New draft
    const response = await fetch("/api/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...draft,
        folder: "drafts",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create draft");
    }

    const newDraft = await response.json();

    setEmails((currentEmails) => [...currentEmails, newDraft]);
  } catch (error) {
    console.error("Failed to save draft:", error);
  }
};

  /*
   * Open draft
   */
  const handleEditDraft = (draft: Email) => {
    setEditingDraft(draft);
    setIsComposeOpen(true);
  };

  /*
   * Send email
   */
 const handleSendEmail = async (email: Email) => {
  try {
    // Existing draft → move it to Sent
    if (email.id > 0) {
      const response = await fetch(`/api/emails/${email.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: "Me",
          email: email.email,
          to: email.to ?? email.email,
          subject: email.subject,
          preview: email.body.slice(0, 100),
          body: email.body,
          folder: "sent",
          starred: email.starred,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      const sentEmail = await response.json();

      setEmails((currentEmails) =>
        currentEmails.map((item) =>
          item.id === email.id ? sentEmail : item
        )
      );

      setEditingDraft(null);
      setIsComposeOpen(false);

      return;
    }

    // New email → create directly in Sent
    const response = await fetch("/api/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...email,
        sender: "Me",
        folder: "sent",
        preview: email.body.slice(0, 100),
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send email");
    }

    const sentEmail = await response.json();

    setEmails((currentEmails) => [
      ...currentEmails,
      sentEmail,
    ]);

    setEditingDraft(null);
    setIsComposeOpen(false);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};

  /*
   * Reply
   */
 const handleReply = async (email: Email) => {
  const replyDraft: Email = {
    id: 0,
    sender: "Me",
    email: email.email,
    to: email.email,
    subject: email.subject.startsWith("Re:")
      ? email.subject
      : `Re: ${email.subject}`,
    preview: "",
    body: "",
    folder: "drafts",
    starred: false,
  };

  try {
    const response = await fetch("/api/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(replyDraft),
    });

    if (!response.ok) {
      throw new Error("Failed to create reply draft");
    }

    const savedDraft = await response.json();

    setEmails((currentEmails) => [
      ...currentEmails,
      savedDraft,
    ]);

    setEditingDraft(savedDraft);
    setIsComposeOpen(true);
  } catch (error) {
    console.error("Failed to create reply draft:", error);
  }
};

  /*
   * Forward
   */
  const handleForward = async (email: Email) => {
  const forwardDraft: Email = {
    id: 0,
    sender: "Me",
    email: "",
    to: "",
    subject: email.subject.startsWith("Fwd:")
      ? email.subject
      : `Fwd: ${email.subject}`,
    preview: "",
    body: `\n\n---------- Forwarded message ----------\nFrom: ${email.sender} <${email.email}>\nSubject: ${email.subject}\n\n${email.body}`,
    folder: "drafts",
    starred: false,
  };

  try {
    const response = await fetch("/api/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(forwardDraft),
    });

    if (!response.ok) {
      throw new Error("Failed to create forward draft");
    }

    const savedDraft = await response.json();

    setEmails((currentEmails) => [
      ...currentEmails,
      savedDraft,
    ]);

    setEditingDraft(savedDraft);
    setIsComposeOpen(true);
  } catch (error) {
    console.error("Failed to create forward draft:", error);
  }
};

  useEffect(() => {
  async function loadEmails() {
    try {
      const response = await fetch("/api/emails");

      if (!response.ok) {
        throw new Error("Failed to fetch emails");
      }

      const data = await response.json();

      setEmails(data);
    } catch (error) {
      console.error("Failed to load emails:", error);
    }
  }

  loadEmails();
}, []);

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <Sidebar
          activeFolder={activeFolder}
          onFolderChange={(folder) => {
            setActiveFolder(folder);
            setSelectedEmail(null);
          }}
        />

        {/* Main Application */}
        <div className="flex flex-1 flex-col">

          {/* Header */}
          <Header
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onCompose={() => {
              setEditingDraft(null);
              setIsComposeOpen(true);
            }}
          />

          {/* Email Area */}
          <div className="flex min-w-0 flex-1">

            {/* Email List */}
            <EmailList
              emails={filteredEmails}
              onSelectEmail={setSelectedEmail}
              onToggleStar={handleToggleStar}
              title={folderTitles[activeFolder]}
              onRestore={handleRestoreEmail}
              onDeletePermanently={handleDeletePermanently}
              onEditDraft={handleEditDraft}
            />

            {/* Email Viewer */}
            <EmailViewer
              selectedEmail={selectedEmail}
              onDeleteEmail={handleDeleteEmail}
              onReply={handleReply}
              onForward={handleForward}
            />

          </div>
        </div>
      </div>

      {/* Compose Modal */}
      {isComposeOpen && (
        <ComposeEmail
          editingDraft={editingDraft}
          onClose={() => {
            setIsComposeOpen(false);
            setEditingDraft(null);
          }}
          onSaveDraft={handleSaveDraft}
          onSend={handleSendEmail}
        />
      )}

    </main>
  );
}




// emailclient123