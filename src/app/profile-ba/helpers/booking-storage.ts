/** Две точки не должны восстанавливать одну выбранную дату и dayId. Старый ключ сохраняется для выезда/онлайна. */
export function bookingSelectionKey(profileId: string, serviceId: string, pointId?: string | null): string {
  const base = `choose-date-selection:${profileId}:${serviceId}`;
  return pointId ? `${base}:point:${pointId}` : base;
}
