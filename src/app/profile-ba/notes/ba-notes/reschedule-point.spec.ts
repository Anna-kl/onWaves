import { BANotesComponent } from './ba-notes.component';

describe('Точка календаря переноса записи', () => {
  const component = Object.create(BANotesComponent.prototype) as BANotesComponent;
  it('новый API задаёт график исходного дня независимо от снимка адреса', () => {
    component.rescheduleRecord = { schedulePointId: 'point-b', location: { workLocationId: 'point-a' } } as any;
    expect(component.reschedulePointId).toBe('point-b');
  });
  it('null от нового API сохраняет отдельный график выезда и онлайна', () => {
    component.rescheduleRecord = { schedulePointId: null, location: { workLocationId: 'old-point' } } as any;
    expect(component.reschedulePointId).toBeNull();
  });
  it('со старым API используется снимок точки записи', () => {
    component.rescheduleRecord = { location: { workLocationId: 'point-a' } } as any;
    expect(component.reschedulePointId).toBe('point-a');
  });
});
