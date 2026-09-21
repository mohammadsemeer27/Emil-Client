export type Email = {
  id: number;

  sender: string;

  email: string;

  to?: string;

  subject: string;

  preview: string;

  body: string;

  folder:
    | "inbox"
    | "starred"
    | "sent"
    | "drafts"
    | "trash";

  starred: boolean;
};