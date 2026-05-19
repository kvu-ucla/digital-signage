const SHEET_ID: string = 'REPLACE_WITH_YOUR_GOOGLE_SHEET_ID'

export const fetchXml = async (url: string): Promise<string> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`XML fetch failed: ${response.status} ${response.statusText}`)
  }
  return response.text()
}

export const fetchCsv = async (gid: string): Promise<string> => {
  if (SHEET_ID === 'REPLACE_WITH_YOUR_GOOGLE_SHEET_ID') {
    throw new Error('SHEET_ID is not configured — update fetchMenu.ts with your Google Sheet ID')
  }
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${gid}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`CSV fetch failed: ${response.status} ${response.statusText}`)
  }
  return response.text()
}
