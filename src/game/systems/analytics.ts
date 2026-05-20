import {
  MVP_ANALYTICS_EVENTS,
  type AnalyticsEventPayload,
  type AnalyticsEventRecord,
  type MvpAnalyticsEventName,
} from "@/game/types/analytics";

const STORAGE_KEY = "roxana:mvp-analytics";

const canUseStorage = () => typeof window !== "undefined" && window.localStorage;

declare global {
  interface Window {
    __roxanaAnalytics?: {
      list: () => AnalyticsEventRecord[];
      clear: () => void;
      summary: () => Record<string, number>;
    };
  }
}

export function isMvpAnalyticsEvent(
  eventName: string,
): eventName is MvpAnalyticsEventName {
  return MVP_ANALYTICS_EVENTS.includes(eventName as MvpAnalyticsEventName);
}

export function loadAnalyticsEvents(): AnalyticsEventRecord[] {
  if (!canUseStorage()) {
    return [];
  }

  const rawEvents = window.localStorage.getItem(STORAGE_KEY);
  if (!rawEvents) {
    return [];
  }

  try {
    return JSON.parse(rawEvents) as AnalyticsEventRecord[];
  } catch {
    return [];
  }
}

export function trackAnalyticsEvent(payload: AnalyticsEventPayload) {
  const eventRecord: AnalyticsEventRecord = {
    ...payload,
    timestamp: new Date().toISOString(),
  };

  if (!canUseStorage()) {
    return eventRecord;
  }

  const events = [...loadAnalyticsEvents(), eventRecord];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events));

  if (process.env.NODE_ENV !== "production") {
    console.debug("[roxana:analytics]", eventRecord);
    installAnalyticsInspector();
  }

  return eventRecord;
}

export function clearAnalyticsEvents() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}

export function summarizeAnalyticsEvents() {
  return loadAnalyticsEvents().reduce<Record<string, number>>((summary, event) => {
    summary[event.eventName] = (summary[event.eventName] ?? 0) + 1;
    return summary;
  }, {});
}

export function installAnalyticsInspector() {
  if (typeof window === "undefined" || process.env.NODE_ENV === "production") {
    return;
  }

  window.__roxanaAnalytics = {
    list: loadAnalyticsEvents,
    clear: clearAnalyticsEvents,
    summary: summarizeAnalyticsEvents,
  };
}
