import { findLeadRowByTransactionId, getLeadRowByIndex, updateLeadInSheet } from "@/lib/google-sheets"
import { updateLeadServerSchema } from "@/lib/schemas"
import { NextResponse } from "next/server"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: transactionId } = await params

  if (!transactionId) {
    return NextResponse.json({ message: "Missing lead ID" }, { status: 400 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 })
  }

  const parsed = updateLeadServerSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Validation failed", errors: parsed.error.issues },
      { status: 422 }
    )
  }

  // PATCH handler
  const rowIndex = await findLeadRowByTransactionId(transactionId)
  if (rowIndex === null) {
    return NextResponse.json({ message: "Lead not found" }, { status: 404 })
  }

  // 1️⃣ Fetch existing row
  const existingLead = await getLeadRowByIndex(rowIndex) // implement this in google-sheets.ts

  // 2️⃣ Merge incoming fields (parsed.data) over existing row
  const updatedLead = {
    ...existingLead,   // preserves tracking and other existing data
    ...parsed.data,    // overwrite only edited fields
    transactionId,
  }

  // 3️⃣ Update sheet
  await updateLeadInSheet(rowIndex, updatedLead)

  return NextResponse.json({ success: true, transactionId })
}
