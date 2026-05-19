export const parseCsv = (csvText: string): Record<string, string> => {
  const lines = csvText.trim().split('\n')
  if (lines.length < 2) return {}

  const headers = lines[0].split(',').map((h) => h.trim())
  const values = lines[1].split(',').map((v) => v.trim())

  return headers.reduce<Record<string, string>>((acc, header, index) => {
    acc[header] = values[index] ?? ''
    return acc
  }, {})
}
