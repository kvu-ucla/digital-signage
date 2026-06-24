import { useEffect, useRef } from 'react';

type UseAutoRefreshOptions = {
  data: unknown;
  isLoading: boolean;
  maxUptime?: number;
  versionCheckInterval?: number;
}

export function useAutoRefresh({
  data,
  isLoading,
  maxUptime = 24 * 60 * 60 * 1000,
  versionCheckInterval = 10 * 60 * 1000,
}: UseAutoRefreshOptions): void {
  const isInitialLoad = useRef(true);
  const startTime = useRef(0);
  const currentVersion = useRef<string | null>(null);

  // Initialize start time on first render
  useEffect(() => {
    if (startTime.current === 0) {
      startTime.current = Date.now();
    }
  }, []);

  // Refresh when TanStack Query detects data changes
  useEffect(() => {
    if (isLoading || !data) return;

    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    console.log('[AutoRefresh] Menu data changed, refreshing...');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }, [data, isLoading]);

  // Check for new app version
  useEffect(() => {
    const checkVersion = async (): Promise<void> => {
      try {
        const res = await fetch(`/dining/version.json?${Date.now().toString()}`);
        const json = await res.json() as { version: string };
        const { version } = json;

        if (!currentVersion.current) {
          currentVersion.current = version;
          console.log('[AutoRefresh] Current version:', version);
        } else if (currentVersion.current !== version) {
          console.log('[AutoRefresh] New version detected:', version, '(was:', currentVersion.current, ')');
          window.location.reload();
        }
      } catch {
        console.warn('[AutoRefresh] Version check failed');
      }
    };

    void checkVersion();
    const interval = setInterval(() => {
      void checkVersion();
    }, versionCheckInterval);
    return (): void => {
      clearInterval(interval);
    };
  }, [versionCheckInterval]);

  // Maximum uptime check
  useEffect(() => {
    const interval = setInterval(() => {
      const uptime = Date.now() - startTime.current;
      if (uptime >= maxUptime) {
        console.log('[AutoRefresh] Max uptime reached, refreshing...');
        window.location.reload();
      }
    }, 60 * 60 * 1000);

    return (): void => {
      clearInterval(interval);
    };
  }, [maxUptime]);
}