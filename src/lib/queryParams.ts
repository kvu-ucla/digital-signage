export function normalizeParam(value: string | null): string | null {
  if (!value) return null;
  return value.toLowerCase().trim().replace(/\s+/g, " ");
}

export function getMenuType(): string | null {
  const params = new URLSearchParams(window.location.search);
  return normalizeParam(params.get("menu"));
}

export function getDisplayMode(): { isMinimal: boolean } {
  const params = new URLSearchParams(window.location.search);
  const isMinimal = params.get('minimal') === 'true';
  return { isMinimal };
}
