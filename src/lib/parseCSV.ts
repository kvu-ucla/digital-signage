export const parseCsv = (csvText: string): Record<string, string> => {
  const lines = csvText.trim().split('\n')
  if (lines.length < 2) {
    return {}
  }

  const [headerLine, valueLine] = lines
  if (!headerLine || !valueLine) return {}
  const headers = headerLine.split(',').map((h) => h.trim())
  const values  = valueLine.split(',').map((v) => v.trim())

  return headers.reduce<Record<string, string>>((acc, header, index) => {
    acc[header] = values[index] ?? ''
    return acc
  }, {})
}
