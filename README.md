# Next.js Lead Generation App

Quick start guide to run, test, and deploy the Lead Generation app. Skip the background — follow the steps.

---

## Prerequisites

- Node v24 (or matching your system)
- npm (or pnpm/yarn)
- A Google Sheets spreadsheet and a Google Service Account with Sheets API access

---

## Environment Variables (Required)

Set locally or in Vercel (exact names used in code):

```env
GOOGLE_SHEET_ID=<your spreadsheet ID>
GOOGLE_SERVICE_ACCOUNT_EMAIL=<your service account email>
GOOGLE_PRIVATE_KEY=<your service account private key, replace newlines with \n>
```


npm install

go to google cloud console create a project go to api & services

choose Google Sheets API and then enable it

go to credentials tab and then create service account

enter service account name and generate it to have your GOOGLE_SERVICE_ACCOUNT_EMAIL key.

After creating the service account, click on it.
Go to the Keys tab.
Click Add Key → Create New Key → JSON.
Download the JSON file. This is your credentials file.
