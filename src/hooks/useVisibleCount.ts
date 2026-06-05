import { useState, useRef, useCallback, useEffect } from 'react'
import type { RefObject } from 'react'

export function useVisibleCount(): { containerRef: RefObject<HTMLDivElement | null>; visibleCount: number | null; measure: () => void } {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState<number | null>(null)

  const measure = useCallback(() => {
    const container = containerRef.current
    if (!container) return
    requestAnimationFrame(() => {
      const paddingBottom = parseFloat(getComputedStyle(container).paddingBottom)
      const containerBottom = container.getBoundingClientRect().bottom - paddingBottom
      let count = 0
      for (const child of Array.from(container.children)) {
        if (child.getBoundingClientRect().bottom <= containerBottom) count++
        else break
      }
      setVisibleCount(count)
    })
  }, [])

  useEffect((): (() => void) | undefined => {
    const container = containerRef.current
    if (!container) return
    const ro = new ResizeObserver(measure)
    ro.observe(container)
    return () => { ro.disconnect() }
  }, [measure])

  return { containerRef, visibleCount, measure }
}
