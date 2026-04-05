import z from "zod"
import { NextResponse } from "next/server"
import { leadServerSchema } from "@/lib/schemas"
import { appendLeadToSheet, appendConversionToSheet } from "@/lib/google-sheets"
import { createHash, randomUUID } from "crypto"

export async function POST(request: Request) {
  try {
    let body: unknown
    try {
      body = await request.json()
      console.log("[POST /api/leads] Raw body:", JSON.stringify(body, null, 2))
    } catch (parseErr) {
      console.error("[POST /api/leads] Failed to parse request JSON:", parseErr)
      return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 })
    }

    const parsed = leadServerSchema.safeParse(body)
    if (!parsed.success) {
      console.error("[POST /api/leads] Validation failed:", JSON.stringify(z.flattenError(parsed.error), null, 2))
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: z.flattenError(parsed.error),
        },
        { status: 422 }
      )
    }

    const data = parsed.data
    console.log("[POST /api/leads] Parsed data:", JSON.stringify(data, null, 2))

    const transactionId = randomUUID()
    const now = new Date().toISOString()

    console.log("[POST /api/leads] Appending lead to sheet...")
    try {
      await appendLeadToSheet({ ...data, createdAt: now, transactionId })
      console.log("[POST /api/leads] Lead appended successfully")
    } catch (sheetErr) {
      console.error("[POST /api/leads] appendLeadToSheet failed:", sheetErr)
      throw sheetErr
    }

    if (data.gclid || data.gbraid || data.wbraid) {
      console.log("[POST /api/leads] Appending conversion to sheet...")
      try {
        await appendConversionToSheet({
          googleClickId: data.gclid ?? "",
          conversionName: "lead_form_submission",
          conversionTime: now,
          conversionValue: "0",
          conversionCurrency: "GBP",
          transactionId,
          hashedEmail: "",
          hashedPhone: createHash("sha256").update(data.phone).digest("hex"),
          gbraid: data.gbraid ?? "",
          wbraid: data.wbraid ?? "",
        })
        console.log("[POST /api/leads] Conversion appended successfully")
      } catch (convErr) {
        console.error("[POST /api/leads] appendConversionToSheet failed:", convErr)
        throw convErr
      }
    } else {
      console.log("[POST /api/leads] No click IDs present, skipping conversion append")
    }

    console.log("[POST /api/leads] Success, transactionId:", transactionId)
    return NextResponse.json({ success: true, transactionId }, { status: 201 })
  } catch (err) {
    console.error("[POST /api/leads] Unhandled error:", err)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
