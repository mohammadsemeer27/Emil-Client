import { NextResponse } from "next/server";
import { db } from "@/db";
import { emails } from "@/db/schema";

export async function GET() {
  try {
    const allEmails = await db
      .select()
      .from(emails)
      .orderBy(emails.createdAt);

    return NextResponse.json(allEmails);
  } catch (error) {
    console.error("GET /api/emails error:", error);

    return NextResponse.json(
      { error: "Failed to fetch emails" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      sender,
      email,
      to,
      subject,
      preview,
      body: emailBody,
      folder,
      starred,
    } = body;

    const newEmail = await db
      .insert(emails)
      .values({
        sender: sender ?? "Me",
        email: email ?? to ?? "",
        to: to ?? "",
        subject: subject ?? "",
        preview: preview ?? emailBody?.slice(0, 100) ?? "",
        body: emailBody ?? "",
        folder: folder ?? "drafts",
        starred: starred ?? false,
      })
      .returning();

    return NextResponse.json(newEmail[0], { status: 201 });
  } catch (error) {
    console.error("POST /api/emails error:", error);

    return NextResponse.json(
      { error: "Failed to create email" },
      { status: 500 }
    );
  }
}