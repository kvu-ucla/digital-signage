// Recognized menu types. A requested type outside this set is treated as
// invalid (a misconfig/typo) rather than "not served right now".
const KNOWN_MENU_TYPES = new Set(['breakfast', 'lunch', 'dinner', 'late night'])

const titleCase = (value: string): string =>
  value.replace(/\b\w/g, (c) => c.toUpperCase())

export const MenuTypeNotice = () => {
  const menuType = new URLSearchParams(window.location.search).get('menu')?.toLowerCase().trim() || null

  let message: string
  if (menuType && !KNOWN_MENU_TYPES.has(menuType)) {
    message = `Unrecognized menu type: “${menuType}”`
  } else if (menuType) {
    message = `${titleCase(menuType)} menu is not available right now.`
  } else {
    message = 'Menu is not available right now.'
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <p className="text-[64px] text-[#3c3c3c] font-bold text-center m-0 leading-tight [font-family:var(--font-display)]">
        {message}
      </p>
    </div>
  )
}
