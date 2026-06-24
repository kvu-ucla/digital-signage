import { useEffect, useRef } from 'react';

type UseAutoRefreshOptions = {
  maxUptime?: number;
  versionCheckInterval?: number;
}

export function useAutoRefresh({
  maxUptime = 24 * 60 * 60 * 1000,
  versionCheckInterval = 10 * 60 * 1000,
}: UseAutoRefreshOptions = {}): void {
  const startTime = useRef(0);
  const currentVersion = useRef<string | null>(null);

  // Initialize start time on first render
  useEffect(() => {
    if (startTime.current === 0) {
      startTime.current = Date.now();
    }
  }, []);

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
          console.log('[AutoRefresh] New version detected:', version, '- reloading');
          window.location.reload();
        }
      } catch {
        // Silently fail on version check errors
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
        window.location.reload();
      }
    }, 60 * 60 * 1000);

    return (): void => {
      clearInterval(interval);
    };
  }, [maxUptime]);
}