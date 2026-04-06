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
