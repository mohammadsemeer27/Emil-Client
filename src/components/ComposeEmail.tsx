"use client";

import { useState } from "react";
import type { Email } from "@/types/email";

type ComposeEmailProps = {
  onClose: () => void;
  onSend: (email: Email) => void;
  onSaveDraft: (email: Email) => void;
  editingDraft?: Email | null;
};

export default function ComposeEmail({
  onClose,
  onSend,
  onSaveDraft,
  editingDraft,
}: ComposeEmailProps) {
  /*
   * Form state
   */
  const [to, setTo] = useState(
    editingDraft?.to ?? editingDraft?.email ?? ""
  );

  const [subject, setSubject] = useState(
    editingDraft?.subject ?? ""
  );

  const [body, setBody] = useState(
    editingDraft?.body ?? ""
  );

  /*
   * Create email object
   */
  const createEmail = (): Email => {
    return {
      id: editingDraft?.id ?? 0,

      sender: "Me",

      email: to,

      to: to,

      subject: subject.trim(),

      preview: body.trim().slice(0, 80),

      body: body,

      folder: "drafts",

      starred: editingDraft?.starred ?? false,
    };
  };

  /*
   * Save Draft
   */
  const handleSaveDraft = () => {
    const draft = createEmail();

    onSaveDraft(draft);

    onClose();
  };

  /*
   * Send Email
   */
  const handleSend = () => {
    if (!to.trim()) {
      alert("Please enter a recipient.");
      return;
    }

    if (!subject.trim() && !body.trim()) {
      alert("Please enter a subject or message.");
      return;
    }

    const email = createEmail();

    onSend({
      ...email,
      folder: "sent",
    });

    onClose();
  };

  /*
   * Determine compose title
   */
  const getTitle = () => {
    if (!editingDraft) {
      return "New Message";
    }

    if (editingDraft.subject.startsWith("Re:")) {
      return "Reply";
    }

    if (editingDraft.subject.startsWith("Fwd:")) {
      return "Forward";
    }

    return "Edit Draft";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/30 p-6">

      <div className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4">

          <h2 className="text-lg font-semibold text-gray-900">
            {getTitle()}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-2 py-1 text-gray-500 hover:bg-gray-100"
            title="Close"
          >
            ✕
          </button>

        </div>

        {/* Form */}
        <div className="p-5">

          {/* To */}
          <input
            type="email"
            placeholder="To"
            value={to}
            onChange={(event) => setTo(event.target.value)}
            className="w-full border-b px-1 py-3 text-sm outline-none focus:border-purple-600"
          />

          {/* Subject */}
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            className="w-full border-b px-1 py-3 text-sm outline-none focus:border-purple-600"
          />

          {/* Message */}
          <textarea
            placeholder="Write your message..."
            value={body}
            onChange={(event) => setBody(event.target.value)}
            rows={10}
            className="mt-3 w-full resize-none px-1 py-2 text-sm outline-none"
          />

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t bg-gray-50 px-5 py-4">

          {/* Save Draft */}
          <button
            type="button"
            onClick={handleSaveDraft}
            className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            💾 Save Draft
          </button>

          {/* Send */}
          <button
            type="button"
            onClick={handleSend}
            className="rounded-lg bg-purple-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-purple-700"
          >
            ✉️ Send
          </button>

        </div>

      </div>

    </div>
  );
}