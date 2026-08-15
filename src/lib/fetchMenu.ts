/** "Publish to the web" token for the menu spreadsheet (File → Share →
 *  Publish to web, entire document, CSV). Public by design — this is display
 *  data; the token dies with the document, so replace it if the sheet is
 *  ever deleted and recreated. Tab gids live in the location configs. */
const SHEET_PUB_TOKEN: string =
  "2PACX-1vSDZt77626_J3RuHqjUemPi_1UKTvPLIeY-YUqp07s50HjkDwSlSFQ1lvZOsDa6BYID8MzdwTfif7RD";

export const fetchXml = async (url: string): Promise<string> => {
  const cacheBustedUrl = `${url}?t=${Date.now()}`;
  const response = await fetch(cacheBustedUrl, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(
      `XML fetch failed: ${response.status} ${response.statusText}`,
    );
  }
  return response.text();
};

export const fetchCsv = async (gid: string): Promise<string> => {
  const url = `https://docs.google.com/spreadsheets/d/e/${SHEET_PUB_TOKEN}/pub?gid=${gid}&single=true&output=csv&t=${Date.now()}`;
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(
      `CSV fetch failed: ${response.status} ${response.statusText}`,
    );
  }
  return response.text();
};
