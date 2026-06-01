import { Component, useEffect, type ComponentType, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LOCATIONS } from "./config/locations";
import { useMenu } from "./hooks/useMenu";
import type { MergedMenuData } from "./lib/types";

const queryClient = new QueryClient();

type ScreenType = "horizontal" | "vertical" | "entrance";

type DiningHallScreenProps = {
  data: MergedMenuData;
  location: string;
  screenType: ScreenType;
  station: string;
  menuType: string | null;
};

type ScreenModule = {
  default?: ComponentType<DiningHallScreenProps>;
  [key: string]: unknown;
};

const screenModules = import.meta.glob("./*/screens/*.tsx", {
  eager: true,
}) as Record<string, ScreenModule>;

const LOCATION_SCREEN_FOLDERS: Record<string, string> = {
  bruinplate: "bruin-plate",
  cafe1919: "cafe1919",
  covelepicuria: "covelepicuria",
};

const normalizeParam = (value: string | null): string | null => {
  if (!value) return null;
  return value.toLowerCase().trim().replace(/\s+/g, " ");
};

const toPascalCase = (value: string): string => {
  return value
    .split(/[\s-_]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
};

const isScreenType = (value: string): value is ScreenType => {
  return value === "horizontal" || value === "vertical" || value === "entrance";
};

const loadStylesheet = (stylesheet?: string): void => {
  const existing = document.getElementById("location-theme");
  if (existing) existing.remove();

  if (!stylesheet) return;

  const link = document.createElement("link");
  link.id = "location-theme";
  link.rel = "stylesheet";
  link.href = `./themes/${stylesheet}`;
  document.head.appendChild(link);
};

const getDiningHallFolder = (location: string): string => {
  return LOCATION_SCREEN_FOLDERS[location] ?? location;
};

const getScreenPathCandidates = ({
  location,
  screenType,
  station,
}: {
  location: string;
  screenType: ScreenType;
  station: string | null;
}): string[] => {
  const folder = getDiningHallFolder(location);
  const screenName = toPascalCase(screenType);

  if (!station) {
    return [`./${folder}/screens/${screenName}.tsx`];
  }

  const stationName = toPascalCase(station);

  return [
    `./${folder}/screens/${stationName}.tsx`,
    `./${folder}/screens/${screenName}.tsx`,
  ];
};

const getScreenComponent = (
  candidates: string[],
): ComponentType<DiningHallScreenProps> | null => {
  for (const path of candidates) {
    const module = screenModules[path];

    if (!module) continue;

    if (module.default) {
      return module.default;
    }

    const namedExport = Object.values(module).find(
      (value) => typeof value === "function",
    );

    if (namedExport) {
      return namedExport as ComponentType<DiningHallScreenProps>;
    }
  }

  return null;
};

type ErrorMessageProps = {
  children: ReactNode;
};

const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "0.75rem",
        width: "100vw",
        height: "100vh",
        background: "var(--color-bg, #000)",
        color: "var(--color-text-primary, #fff)",
        fontFamily: "var(--font-display, sans-serif)",
        fontSize: "1.25rem",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      {children}
    </div>
  );
};

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <ErrorMessage>
          Display unavailable — please contact your administrator.
        </ErrorMessage>
      );
    }

    return this.props.children;
  }
}

type ScreenLoaderProps = {
  location: string;
  screenType: ScreenType;
  station: string | null;
  menuType: string | null;
};

const ScreenLoader = ({
  location,
  screenType,
  station,
  menuType,
}: ScreenLoaderProps) => {
  const { data, isLoading, error } = useMenu({
    location,
    menuType: menuType ?? undefined,
  });

  if (isLoading) {
    return <ErrorMessage>Loading menu…</ErrorMessage>;
  }

  if (error || !data) {
    return <ErrorMessage>Menu data unavailable.</ErrorMessage>;
  }

  const pathCandidates = getScreenPathCandidates({
    location,
    screenType,
    station,
  });

  const DiningHallScreen = getScreenComponent(pathCandidates);

  if (!DiningHallScreen) {
    return (
      <ErrorMessage>
        <div>
          Could not find a screen component for{" "}
          <code>{location}</code>.
        </div>

        <div style={{ fontSize: "1rem", opacity: 0.75 }}>
          Tried:
        </div>

        <pre
          style={{
            maxWidth: "90vw",
            whiteSpace: "pre-wrap",
            textAlign: "left",
            fontSize: "0.9rem",
            opacity: 0.75,
          }}
        >
          {pathCandidates.join("\n")}
        </pre>
      </ErrorMessage>
    );
  }

  return (
    <DiningHallScreen
      data={data}
      location={location}
      screenType={screenType}
      station={station ?? ""}
      menuType={menuType}
    />
  );
};

export const App = () => {
  const params = new URLSearchParams(window.location.search);

  const location = normalizeParam(params.get("location")) ?? "";
  const screen = normalizeParam(params.get("screen")) ?? "";
  const station = normalizeParam(params.get("station"));
  const menuType = normalizeParam(params.get("menu"));

  const config = LOCATIONS[location];

  useEffect(() => {
    loadStylesheet(config?.stylesheet);
  }, [config?.stylesheet]);

  if (!config) {
    return (
      <ErrorMessage>
        <div>
          Unknown location:{" "}
          <code style={{ marginLeft: "0.5rem" }}>
            {location || "(none)"}
          </code>
        </div>
      </ErrorMessage>
    );
  }

  if (!isScreenType(screen)) {
    return (
      <ErrorMessage>
        <div>
          Unknown screen type:{" "}
          <code>{screen || "(none)"}</code>
        </div>

        <div style={{ fontSize: "1rem", opacity: 0.75 }}>
          Valid screen types: horizontal, vertical, entrance
        </div>
      </ErrorMessage>
    );
  }

  if (screen !== "entrance" && !station) {
    return (
      <ErrorMessage>
        <div>
          Missing station for{" "}
          <code>{location}</code>{" "}
          <code>{screen}</code> screen.
        </div>

        <div style={{ fontSize: "1rem", opacity: 0.75 }}>
          Example:{" "}
          <code>
            ?location={location}&screen={screen}&station=simply+grilled&menu=lunch
          </code>
        </div>
      </ErrorMessage>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <ScreenLoader
          location={location}
          screenType={screen}
          station={station}
          menuType={menuType}
        />
      </ErrorBoundary>
    </QueryClientProvider>
  );
};