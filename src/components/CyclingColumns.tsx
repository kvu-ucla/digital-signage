import { useRef, useEffect, useCallback, useState } from "react";

const CYCLE_INTERVAL_MS = 15_000;

type CyclingColumnProps = {
  children: Array<React.ReactNode>;
};

export const CyclingColumn = ({ children }: CyclingColumnProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [availableHeight, setAvailableHeight] = useState(0);
  const [pages, setPages] = useState<Array<Array<number>>>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setAvailableHeight(el.clientHeight);
    });
    ro.observe(el);
    setAvailableHeight(el.clientHeight);
    return () => {
      ro.disconnect();
    };
  }, []);

  const computePages = useCallback(() => {
    const measure = measureRef.current;
    if (!measure || availableHeight === 0) return;

    const items = Array.from(measure.children) as Array<HTMLElement>;
    const GAP = 8;
    const groups: Array<Array<number>> = [];
    let currentGroup: Array<number> = [];
    let usedHeight = 0;

    items.forEach((el, i) => {
      const itemHeight = el.getBoundingClientRect().height;
      const needed = currentGroup.length === 0 ? itemHeight : itemHeight + GAP;

      if (usedHeight + needed <= availableHeight) {
        currentGroup.push(i);
        usedHeight += needed;
      } else {
        if (currentGroup.length > 0) groups.push(currentGroup);
        currentGroup = [i];
        usedHeight = itemHeight;
      }
    });

    if (currentGroup.length > 0) groups.push(currentGroup);
    setPages(groups);
    setCurrentPage(0);
  }, [availableHeight]);

  useEffect(() => {
    const timeout = setTimeout(computePages, 80);
    const observer = new ResizeObserver(computePages);
    if (measureRef.current) observer.observe(measureRef.current);
    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [computePages, children]);

  useEffect(() => {
    if (pages.length <= 1) return;
    const id = setInterval(() => {
      setCurrentPage((p) => (p + 1) % pages.length);
    }, CYCLE_INTERVAL_MS);
    return () => {
      clearInterval(id);
    };
  }, [pages]);

  const visibleIndices = pages[currentPage] ?? [];

  return (
    <div
      ref={containerRef}
      style={{ height: "100%", overflow: "hidden", position: "relative" }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          visibility: "hidden",
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          ref={measureRef}
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          {children}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {visibleIndices.map((i) => (
          <div key={i}>{children[i]}</div>
        ))}
      </div>
    </div>
  );
};
