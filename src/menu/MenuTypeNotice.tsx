// DISABLED: Menu type logic (menuType query param is disabled)
// import { getMenuType } from '@/lib/queryParams'

export const MenuTypeNotice = () => {
  const message = "We're Closed"

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <p className="text-[64px] text-[#3c3c3c] font-bold text-center m-0 leading-tight [font-family:var(--font-display)]">
        {message}
      </p>
    </div>
  )
}
