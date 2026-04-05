import { CONVERSIONS_HEADERS, LEADS_HEADERS } from "@/data/google-sheets-headers"
import { google } from "googleapis"

const SHEET_ID = process.env.GOOGLE_SHEET_ID!

function getAuth() {
  return new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  })
}

async function ensureHeaders(
  sheets: ReturnType<typeof google.sheets>,
  sheetName: string,
  headers: string[]
) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${sheetName}!A1:A1`,
  })

  // Only write headers if row 1 is empty
  if (!res.data.values || res.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `${sheetName}!A1`,
      valueInputOption: "RAW",
      requestBody: { values: [headers] },
    })
  }
}

export async function appendLeadToSheet(data: Record<string, unknown>) {
  const sheets = google.sheets({ version: "v4", auth: getAuth() })

  await ensureHeaders(sheets, "Leads", LEADS_HEADERS)

  const row = [
    data.firstName, data.lastName, data.phone,
    data.dateOfBirth instanceof Date
      ? data.dateOfBirth.toISOString().split("T")[0]
      : data.dateOfBirth,
    Array.isArray(data.address) ? data.address.join(", ") : data.address,
    data.gclid ?? "", data.gbraid ?? "", data.wbraid ?? "",
    data.utm_source ?? "", data.utm_medium ?? "", data.utm_campaign ?? "",
    data.utm_term ?? "", data.utm_content ?? "",
    data.fbclid ?? "", data.ttclid ?? "", data.taboola_click_id ?? "",
    data.createdAt, data.transactionId,
  ]

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: "Leads!A:R",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  })
}

export async function appendConversionToSheet(data: {
  googleClickId: string
  conversionName: string
  conversionTime: string
  conversionValue: string
  conversionCurrency: string
  transactionId: string
  hashedEmail: string
  hashedPhone: string
  gbraid: string
  wbraid: string
}) {
  const sheets = google.sheets({ version: "v4", auth: getAuth() })

  await ensureHeaders(sheets, "Conversions", CONVERSIONS_HEADERS)

  const row = [
    data.googleClickId, data.conversionName, data.conversionTime,
    data.conversionValue, data.conversionCurrency, data.transactionId,
    data.hashedEmail, data.hashedPhone, data.gbraid, data.wbraid,
  ]

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: "Conversions!A:J",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  })
}
