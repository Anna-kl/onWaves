import {
  VISIT_SOURCE_KEY,
  captureVisitSource,
  clearVisitSource,
  readVisitSource,
  visitSourceComment,
} from './visit-source';

function params(query: string): { get(name: string): string | null } {
  const search = new URLSearchParams(query);
  return { get: (name: string) => search.get(name) };
}

describe('visit source', () => {
  afterEach(() => sessionStorage.removeItem(VISIT_SOURCE_KEY));

  it('keeps the first ref and utm until the record is created', () => {
    captureVisitSource(params('ref=m01&utm_source=vk&utm_medium=ambassador&utm_campaign=mary_amb_oct'));
    captureVisitSource(params('ref=M02&utm_source=other'));

    const stored = readVisitSource();
    expect(stored?.ref).toBe('M01');
    expect(stored?.utm['utm_source']).toBe('vk');
    expect(visitSourceComment(stored)).toBe(
      '[ref:M01] utm_source=vk utm_medium=ambassador utm_campaign=mary_amb_oct'
    );

    clearVisitSource();
    expect(readVisitSource()).toBeNull();
  });

  it('drops a ref that is not a short code', () => {
    captureVisitSource(params('ref=mary-sugar&utm_source=vk'));

    expect(readVisitSource()?.ref).toBeNull();
    expect(visitSourceComment(readVisitSource())).toBe('utm_source=vk');
  });
});
