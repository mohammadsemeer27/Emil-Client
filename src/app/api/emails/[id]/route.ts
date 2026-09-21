import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { emails } from "@/db/schema";

type RouteContext = {
  params: Promise<{ id: string }>;
};

// UPDATE EMAIL
export async function PATCH(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const emailId = Number(id);

    if (!Number.isInteger(emailId)) {
      return NextResponse.json(
        { error: "Invalid email ID" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const updatedEmail = await db
      .update(emails)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(emails.id, emailId))
      .returning();

    if (updatedEmail.length === 0) {
      return NextResponse.json(
        { error: "Email not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedEmail[0]);
  } catch (error) {
    console.error("PATCH /api/emails/[id] error:", error);

    return NextResponse.json(
      { error: "Failed to update email" },
      { status: 500 }
    );
  }
}

// DELETE EMAIL PERMANENTLY
export async function DELETE(
  _request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const emailId = Number(id);

    if (!Number.isInteger(emailId)) {
      return NextResponse.json(
        { error: "Invalid email ID" },
        { status: 400 }
      );
    }

    const deletedEmail = await db
      .delete(emails)
      .where(eq(emails.id, emailId))
      .returning();

    if (deletedEmail.length === 0) {
      return NextResponse.json(
        { error: "Email not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      email: deletedEmail[0],
    });
  } catch (error) {
    console.error("DELETE /api/emails/[id] error:", error);

    return NextResponse.json(
      { error: "Failed to permanently delete email" },
      { status: 500 }
    );
  }
}