# Next.js Lead Generation App

Quick start guide to run, test, and deploy the Lead Generation app. Skip the background — follow the steps.

---

## Prerequisites

- Node v24 (or matching your system)
- npm (or pnpm/yarn)
- A Google Sheets spreadsheet and a Google Service Account with Sheets API access

## 📥 Installation

```bash
git clone <repo-url>
cd <repo-folder>
npm install
```

Create a `.env.local` file in the root directory with the following keys:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=<your_service_account_email>
GOOGLE_PRIVATE_KEY=<your_private_key>
GOOGLE_SHEET_ID=<your_google_sheet_id>
```

---

## ☁️ Google Cloud Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/) → **Create a Project**
2. Enable **Google Sheets API**:
   `APIs & Services → Library → Google Sheets API → Enable`
3. Create a **Service Account**:

   * Navigate: `APIs & Services → Credentials → Create Credentials → Service Account`
   * Copy the **Service Account Email** → this is your `GOOGLE_SERVICE_ACCOUNT_EMAIL`
4. Create a **Key (JSON)**:

   * Click the service account → **Keys → Add Key → Create New Key → JSON**
   * Download JSON → open it → copy `private_key` → this is your `GOOGLE_PRIVATE_KEY`

---

## 📝 Google Sheets Setup

1. Create a new Google Spreadsheet
2. Extract the Sheet ID from the URL:

```
https://docs.google.com/spreadsheets/d/<GOOGLE_SHEET_ID>/edit
```

3. Create **two sheets** named exactly:

* `Leads`
* `Conversions`

*(Case-sensitive — must match exactly.)*

4. Share the spreadsheet with your service account email (**Editor** permission)

---

## ▶️ Running the App

```bash
npm run dev
```

Open this link to capture tracking parameters:

```
http://localhost:3000/?gclid=EAIaIQobChMI1234567890&gbraid=0AAAAABcDEFGHIJKLMNOP&wbraid=0AAAAABqrstuvwxyz1234&utm_source=google&utm_medium=cpc&utm_campaign=uk_leads_spring&utm_term=lead+generation&utm_content=banner_v2&fbclid=IwAR1abcdefghijklmnop1234567890&ttclid=7eC1abcdefghijklmnop&taboola_click_id=tb-1234567890abcdef
```

* URL parameters are stored in a cookie named `tracking_params`
* If some params are missing → disable adblock, delete the cookie, refresh, and re-enter the link
* Check cookies via **DevTools → Storage → Cookies**

---

## ✍️ Testing the Form

Navigate to `/contact` and use this test data:

```json
{
  "firstName": "Mohammed",
  "lastName": "Boutarbouch",
  "phone": "+447959458548",
  "dateOfBirth": "1990-05-01",
  "address": "Aberdeen"
}
```

**Requirements:**

* Phone must be a UK number starting with `+44 7XXX XXX XXX`
* Date of birth must be 18+

Submit the form → check `Leads` and `Conversions` sheets in your Google Sheet. All form data and tracking parameters will be saved automatically.

---

## ✅ Done

Your Lead Generation app is now running, tracking URL parameters, and saving submissions to Google Sheets.
