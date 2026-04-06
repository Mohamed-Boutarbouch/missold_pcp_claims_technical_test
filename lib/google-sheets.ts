import { google } from "googleapis"

const SHEET_ID = process.env.GOOGLE_SHEET_ID!

const auth = new google.auth.JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
})

const sheets = google.sheets({ version: "v4", auth })

export async function appendLeadToSheet(data: Record<string, unknown>) {
  const row = [
    data.firstName,
    data.lastName,
    data.phone,
    data.dateOfBirth instanceof Date
      ? data.dateOfBirth.toISOString().split("T")[0]
      : data.dateOfBirth,
    Array.isArray(data.address) ? data.address.join(", ") : data.address,

    data.gclid ?? "",
    data.gbraid ?? "",
    data.wbraid ?? "",

    data.utm_source ?? "",
    data.utm_medium ?? "",
    data.utm_campaign ?? "",
    data.utm_term ?? "",
    data.utm_content ?? "",

    data.fbclid ?? "",
    data.ttclid ?? "",
    data.taboola_click_id ?? "",

    data.createdAt,
    data.transactionId,
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
  const row = [
    data.googleClickId,
    data.conversionName,
    data.conversionTime,
    data.conversionValue,
    data.conversionCurrency,
    data.transactionId,
    data.hashedEmail,
    data.hashedPhone,
    data.gbraid,
    data.wbraid,
  ]

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: "Conversions!A:J",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  })
}

export async function findLeadRowByTransactionId(
  transactionId: string
): Promise<number | null> {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: "Leads!R:R",
  })

  const rows = res.data.values ?? []
  const idx = rows.findIndex((r) => r[0] === transactionId)
  if (idx === -1) return null
  return idx + 1
}

export async function updateLeadInSheet(
  rowIndex: number,
  data: Record<string, unknown>
) {
  const row = [
    data.firstName,
    data.lastName,
    data.phone,
    data.dateOfBirth instanceof Date
      ? data.dateOfBirth.toISOString().split("T")[0]
      : data.dateOfBirth,
    Array.isArray(data.address) ? data.address.join(", ") : data.address,
    data.gclid ?? "",
    data.gbraid ?? "",
    data.wbraid ?? "",
    data.utm_source ?? "",
    data.utm_medium ?? "",
    data.utm_campaign ?? "",
    data.utm_term ?? "",
    data.utm_content ?? "",
    data.fbclid ?? "",
    data.ttclid ?? "",
    data.taboola_click_id ?? "",
    data.createdAt,
    data.transactionId,
  ]

  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: `Leads!A${rowIndex}:R${rowIndex}`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  })
}

export async function getLeadRowByIndex(
  rowIndex: number
): Promise<Record<string, any>> {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `Leads!A${rowIndex}:R${rowIndex}`,
  })

  const row = res.data.values?.[0]
  if (!row) throw new Error(`No row found at index ${rowIndex}`)

  const [
    firstName,
    lastName,
    phone,
    dateOfBirth,
    address,
    gclid,
    gbraid,
    wbraid,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_term,
    utm_content,
    fbclid,
    ttclid,
    taboola_click_id,
    createdAt,
    transactionId,
  ] = row

  return {
    firstName,
    lastName,
    phone,
    dateOfBirth,
    address: address ? address.split(", ").map((s: any) => s.trim()) : [],
    gclid,
    gbraid,
    wbraid,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_term,
    utm_content,
    fbclid,
    ttclid,
    taboola_click_id,
    createdAt,
    transactionId,
  }
}
