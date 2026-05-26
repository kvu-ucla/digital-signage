import { useRef, useEffect, useCallback } from "react";

const CYCLE_INTERVAL_MS = 5_000;

type CyclingColumnProps = {
  children: Array<React.ReactNode>;
  viewportHeight: number;
};

export const CyclingColumn = ({ children, viewportHeight }: CyclingColumnProps) => {
  const listRef = useRef<HTMLDivElement>(null);

  const cycleDown = useCallback(() => {
    const list = listRef.current;
    if (!list || list.children.length === 0) return;
    const last = list.lastElementChild;
    if (!last) return;
    list.insertBefore(last, list.firstChild);
  }, []);

  useEffect(() => {
    const id = setInterval(cycleDown, CYCLE_INTERVAL_MS);
    return () => { clearInterval(id); };
  }, [cycleDown]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ height: viewportHeight, overflow: "hidden", position: "relative" }}>
        <div ref={listRef}>
          {children}
        </div>
      </div>
    </div>
  );
};