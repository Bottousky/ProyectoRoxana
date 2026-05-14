import type { RoxanaGameEvents } from "@/game/types/events";

type EventName = keyof RoxanaGameEvents;
type EventHandler<TEvent extends EventName> = (
  payload: RoxanaGameEvents[TEvent],
) => void;

class TypedEventBus {
  private handlers = new Map<EventName, Set<(payload: unknown) => void>>();

  on<TEvent extends EventName>(
    eventName: TEvent,
    handler: EventHandler<TEvent>,
  ) {
    const handlersForEvent = this.handlers.get(eventName) ?? new Set();
    handlersForEvent.add(handler as (payload: unknown) => void);
    this.handlers.set(eventName, handlersForEvent);

    return () => this.off(eventName, handler);
  }

  off<TEvent extends EventName>(
    eventName: TEvent,
    handler: EventHandler<TEvent>,
  ) {
    this.handlers.get(eventName)?.delete(handler as (payload: unknown) => void);
  }

  emit<TEvent extends EventName>(
    eventName: TEvent,
    ...args: RoxanaGameEvents[TEvent] extends void
      ? []
      : [payload: RoxanaGameEvents[TEvent]]
  ) {
    const payload = args[0] as RoxanaGameEvents[TEvent];
    this.handlers.get(eventName)?.forEach((handler) => handler(payload));
  }
}

export const gameEvents = new TypedEventBus();
