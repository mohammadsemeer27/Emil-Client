"use client";

import type { Email } from "@/types/email";

/* =========================================================
   Props
========================================================= */

type EmailListProps = {
  emails?: Email[];

  onSelectEmail: (email: Email) => void;

  onToggleStar: (id: number) => void;

  title: string;

  onRestore?: (id: number) => void;

  onDeletePermanently?: (id: number) => void;

  onEditDraft?: (email: Email) => void;
};

/* =========================================================
   EmailList Component
========================================================= */

export default function EmailList({
  emails = [],
  onSelectEmail,
  onToggleStar,
  title,
  onRestore,
  onDeletePermanently,
  onEditDraft,
}: EmailListProps) {

  return (
    <section className="w-96 shrink-0 border-r bg-white">

      {/* =================================================
          Header
      ================================================= */}

      <div className="border-b p-5">

        <h2 className="text-xl font-bold text-gray-900">
          {title}
        </h2>

        <p className="text-sm text-gray-500">
          {emails.length}{" "}
          {emails.length === 1 ? "email" : "emails"}
        </p>

      </div>

      {/* =================================================
          Email List
      ================================================= */}

      <div>

        {/* =================================================
            Empty State
        ================================================= */}

        {emails.length === 0 ? (

          <div className="flex h-64 items-center justify-center px-6 text-center">

            <div>

              <div className="text-4xl">
                📭
              </div>

              <p className="mt-3 font-medium text-gray-700">
                No emails
              </p>

              <p className="mt-1 text-sm text-gray-500">
                There are no emails in this folder.
              </p>

            </div>

          </div>

        ) : (

          /* =================================================
             Emails
          ================================================= */

          emails.map((email) => (

            <div
              key={email.id}
              className="border-b"
            >

              {/* =================================================
                  Email Row

                  IMPORTANT:
                  This is a div, NOT a button.
                  Therefore the Star button below is valid HTML.
              ================================================= */}

              <div
                onClick={() => {

                  /*
                   * Drafts open in ComposeEmail
                   */

                  if (email.folder === "drafts") {

                    onEditDraft?.(email);

                    return;
                  }

                  /*
                   * Normal emails open in EmailViewer
                   */

                  onSelectEmail(email);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {

                  /*
                   * Keyboard accessibility
                   */

                  if (
                    event.key === "Enter" ||
                    event.key === " "
                  ) {

                    event.preventDefault();

                    if (email.folder === "drafts") {

                      onEditDraft?.(email);

                    } else {

                      onSelectEmail(email);

                    }
                  }
                }}
                className="w-full cursor-pointer p-5 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
              >

                <div className="flex items-start justify-between gap-3">

                  {/* =================================================
                      Email Information
                  ================================================= */}

                  <div className="min-w-0 flex-1">

                    {/* Sender */}

                    <h3 className="font-semibold text-gray-900">
                      {email.sender}
                    </h3>

                    {/* Subject */}

                    <p className="font-medium text-gray-900">
                      {email.subject || "(No subject)"}
                    </p>

                    {/* Preview */}

                    <p className="mt-1 truncate text-sm text-gray-500">
                      {email.preview || "(No message)"}
                    </p>

                  </div>

                  {/* =================================================
                      Star Button

                      This is NOT inside another button.
                  ================================================= */}

                  <button
                    type="button"
                    onClick={(event) => {

                      /*
                       * Prevent opening the email
                       * when clicking the star.
                       */

                      event.stopPropagation();

                      onToggleStar(email.id);
                    }}
                    className="shrink-0 rounded-full p-1 text-lg transition hover:bg-gray-100"
                    title={
                      email.starred
                        ? "Unstar"
                        : "Star"
                    }
                    aria-label={
                      email.starred
                        ? "Unstar email"
                        : "Star email"
                    }
                  >

                    {email.starred ? "⭐" : "☆"}

                  </button>

                </div>

              </div>

              {/* =================================================
                  Trash Actions
              ================================================= */}

              {title === "Trash" && (

                <div className="flex gap-2 px-5 pb-4">

                  {/* =================================================
                      Restore
                  ================================================= */}

                  <button
                    type="button"
                    onClick={() => {
                      onRestore?.(email.id);
                    }}
                    className="rounded-lg bg-gray-100 px-3 py-2 text-sm transition hover:bg-gray-200"
                  >
                    ↩️ Restore
                  </button>

                  {/* =================================================
                      Permanent Delete
                  ================================================= */}

                  <button
                    type="button"
                    onClick={() => {
                      onDeletePermanently?.(
                        email.id
                      );
                    }}
                    className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 transition hover:bg-red-100"
                  >
                    🗑️ Delete permanently
                  </button>

                </div>

              )}

            </div>

          ))

        )}

      </div>

    </section>
  );
}