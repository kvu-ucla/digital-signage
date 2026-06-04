import { Component, useEffect, type ComponentType, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LOCATIONS } from "@/locations";
import { useMenu } from "@/hooks/useMenu";
import { resolveScreen, getScreenCandidates, type ScreenProps } from "@/lib/resolveScreen";
import { isMockMode, applyMockData } from "@/lib/mockMode";

const queryClient = new QueryClient();

const normalizeParam = (value: string | null): string | null => {
  if (!value) return null;
  return value.toLowerCase().trim().replace(/\s+/g, " ");
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
  screenType: string;
  station: string | null;
  menuType: string | null;
};

type ResolvedScreenProps = ScreenProps & {
  Screen: ComponentType<ScreenProps>;
};

const ResolvedScreen = ({ Screen, ...props }: ResolvedScreenProps) => (
  <Screen {...props} />
);

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

  const Screen = resolveScreen(location, screenType, station)

  if (!Screen) {
    const candidates = getScreenCandidates(location, screenType, station)
    return (
      <ErrorMessage>
        <div>
          Could not find a screen component for{" "}
          <code>{location}</code>.
        </div>
        <div style={{ fontSize: "1rem", opacity: 0.75 }}>Tried:</div>
        <pre
          style={{
            maxWidth: "90vw",
            whiteSpace: "pre-wrap",
            textAlign: "left",
            fontSize: "0.9rem",
            opacity: 0.75,
          }}
        >
          {candidates.join("\n")}
        </pre>
      </ErrorMessage>
    )
  }

  return (
    <ResolvedScreen
      Screen={Screen}
      data={isMockMode() ? applyMockData(data) : data}
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

  const overlayId = params.get("overlay-id");
  const overlayUrl = overlayId
    ? `${window.location.origin}/signage/#/signage/${overlayId}`
    : null;

  const config = LOCATIONS[location];

  useEffect(() => {
    loadStylesheet(config?.stylesheet);
  }, [config?.stylesheet]);

  useEffect(() => {
    document.documentElement.classList.toggle("is-takeover", !!overlayId);
  }, [overlayId]);

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

  return (
    <>
      {overlayUrl && (
        <iframe
          src={overlayUrl}
          className="overlay-iframe"
          title="background overlay"
        />
      )}
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
    </>
  );
};