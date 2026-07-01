const SHEET_ID: string = "1lNHtNE9b7w93RNa2lvKk6DhXXTU9_pYLuzcsdWHGElE";

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
  if (SHEET_ID === "REPLACE_WITH_YOUR_GOOGLE_SHEET_ID") {
    throw new Error(
      "SHEET_ID is not configured — update fetchMenu.ts with your Google Sheet ID",
    );
  }
  const url = `https://docs.google.com/spreadsheets/d/e/2PACX-1vTNxVJcODFyEeIwg5YnfblBE8xSQbSMYkCtvyT67aUnEUnhqiuRJ5oMUCK0sT7p39z5ddkva8-Pbzog/pub?gid=${gid}&single=true&output=csv&t=${Date.now()}`;
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(
      `CSV fetch failed: ${response.status} ${response.statusText}`,
    );
  }
  return response.text();
};
