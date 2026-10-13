import { buildHomeJsonLd } from './home-jsonld';

describe('buildHomeJsonLd', () => {
  it('puts Organization and WebSite in one graph and skips SearchAction', () => {
    const data = buildHomeJsonLd('https://onwaves.online');
    const json = JSON.stringify(data);
    expect(json).toContain('"@type":"Organization"');
    expect(json).toContain('"@type":"WebSite"');
    expect(json).toContain('https://vk.com/club238581537');
    expect(json).toContain('https://t.me/onwaves');
    expect(json).not.toContain('SearchAction');
    expect(json).not.toContain('potentialAction');
  });
});
