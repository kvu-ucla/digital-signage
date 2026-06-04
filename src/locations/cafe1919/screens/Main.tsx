import type { ScreenProps } from "@/lib/resolveScreen";
import { Cafe1919Template } from "../template";

export default function MainScreen({ data }: ScreenProps) {
  return <Cafe1919Template data={data} />;
}