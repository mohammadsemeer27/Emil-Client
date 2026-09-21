"use client";

import type { Email } from "@/types/email";

type EmailViewerProps = {
  selectedEmail: Email | null;
  onDeleteEmail: (id: number) => void;
  onReply: (email: Email) => void;
  onForward: (email: Email) => void;
};

export default function EmailViewer({
  selectedEmail,
  onDeleteEmail,
  onReply,
  onForward,
}: EmailViewerProps) {
  /*
   * No email selected
   */
  if (!selectedEmail) {
    return (
      <section className="flex min-w-0 flex-1 items-center justify-center bg-white">
        <div className="px-6 text-center">
          <div className="text-5xl">✉️</div>

          <h2 className="mt-4 text-xl font-semibold text-gray-900">
            Select an email
          </h2>

          <p className="mt-2 text-gray-500">
            Select an email from your inbox to read it.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex min-w-0 flex-1 flex-col bg-white">

      {/* Email Header */}
      <div className="border-b p-6">

        <div className="flex items-start justify-between gap-4">

          {/* Email Information */}
          <div className="min-w-0 flex-1">

            <h2 className="break-words text-2xl font-bold text-gray-900">
              {selectedEmail.subject || "(No subject)"}
            </h2>

            <div className="mt-4">

              <p className="font-semibold text-gray-900">
                {selectedEmail.sender}
              </p>

              <p className="break-all text-sm text-gray-500">
                {selectedEmail.email}
              </p>

            </div>

          </div>

          {/* Delete */}
          <button
            type="button"
            onClick={() => onDeleteEmail(selectedEmail.id)}
            className="shrink-0 rounded-lg px-3 py-2 text-red-600 transition hover:bg-red-50"
            title="Move to Trash"
          >
            🗑️
          </button>

        </div>

      </div>

      {/* Email Body */}
      <div className="min-h-0 flex-1 overflow-y-auto p-6">

        <p className="whitespace-pre-wrap break-words leading-7 text-gray-700">
          {selectedEmail.body || "(No message)"}
        </p>

      </div>

      {/* Email Actions */}
      <div className="border-t bg-gray-50 px-6 py-4">

        <div className="flex flex-wrap gap-3">

          {/* Reply */}
          <button
            type="button"
            onClick={() => onReply(selectedEmail)}
            className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            ↩️ Reply
          </button>

          {/* Forward */}
          <button
            type="button"
            onClick={() => onForward(selectedEmail)}
            className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            ↪️ Forward
          </button>

        </div>

      </div>

    </section>
  );
}