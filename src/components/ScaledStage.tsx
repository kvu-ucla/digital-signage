import { useLayoutEffect, useState, type ReactNode } from "react";
import "./ScaledStage.css";

/** Resolutions the screens are authored at. Boards are pixel-designed at
 *  1080p, so we render into a fixed canvas of the matching orientation and
 *  scale it to fill the panel — keeping proportions identical at any res
 *  (e.g. a 3840×2160 panel scales the 1920×1080 canvas by exactly 2×). */
const LANDSCAPE = { width: 1920, height: 1080 };
const PORTRAIT = { width: 1080, height: 1920 };

type Stage = {
  width: number;
  height: number;
  scale: number;
};

const computeStage = (): Stage => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  // Pick the design canvas whose orientation matches the panel. On real
  // hardware the panel is rotated to match the board it displays, so the
  // viewport aspect ratio is a reliable signal of the intended orientation.
  const design = vw >= vh ? LANDSCAPE : PORTRAIT;
  // Uniform scale-to-fit: fill the panel without distorting. When the panel
  // aspect ratio differs from the canvas, the shorter axis leaves bars
  // (letterboxing) rather than stretching the design.
  const scale = Math.min(vw / design.width, vh / design.height);
  return { width: design.width, height: design.height, scale };
};

type ScaledStageProps = {
  children: ReactNode;
};

export const ScaledStage = ({ children }: ScaledStageProps) => {
  const [stage, setStage] = useState<Stage>(computeStage);

  useLayoutEffect(() => {
    const update = (): void => {
      setStage(computeStage());
    };
    update();
    window.addEventListener("resize", update);
    return (): void => {
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="scaled-stage">
      <div
        className="scaled-stage__canvas"
        style={{
          width: `${stage.width}px`,
          height: `${stage.height}px`,
          transform: `scale(${stage.scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
};