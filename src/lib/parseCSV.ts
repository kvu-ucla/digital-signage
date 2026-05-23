// function parseCSV(text: string): SheetData {
//   const rows = text.split(/\r?\n/).filter((row) => row.trim() !== "");
//   return rows.slice(1).map((row) => row.split(",").map((cell) => cell.trim()));
// }

export const parseCsv = (csvText: string): Array<Record<string, string>> => {
  const lines = csvText.trim().split("\n");
  if (lines.length < 2) return [];
  if (lines[0] === undefined) return [];

  const headers = parseLine(lines[0] ?? "");

  const rows: Array<Record<string, string>> = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line === undefined) continue;
    const values = parseLine(line);
    const row: Record<string, string> = {};
    for (let j = 0; j < headers.length; j++) {
      const header = headers[j];
      if (header === undefined) continue;
      row[header] = values[j] ?? "";
    }
    rows.push(row);
  }

  return rows;
};

const parseLine = (line: string): Array<string> => {
  const fields: Array<string> = [];
  let current = "";
  let isInQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i] as string;

    if (isInQuotes) {
      if (char === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          isInQuotes = false;
        }
      } else {
        current += char;
      }
    } else {
      if (char === '"') {
        isInQuotes = true;
      } else if (char === ",") {
        fields.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
  }

  fields.push(current.trim());
  return fields;
};
