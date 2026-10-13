import {
  isIndexableProfileLink,
  isNoindexProfileSlug,
  NOINDEX_PROFILE_SLUGS,
  profileSitemapLocs,
} from './noindex-profiles';

const RESERVED = new Set([
  'catalog', 'landing', 'masters', 'search', 'static', 'ba-edit',
  'profilebisacc', 'cabinet-ba', 'sitemap.xml', 'robots.txt',
]);

describe('noindex profiles', () => {
  it('matches the three demo slugs regardless of case', () => {
    expect(NOINDEX_PROFILE_SLUGS.has('bussiness')).toBeTrue();
    expect(isNoindexProfileSlug('Bussiness')).toBeTrue();
    expect(isNoindexProfileSlug('bussiness')).toBeTrue();
    expect(isNoindexProfileSlug('developer')).toBeTrue();
    expect(isNoindexProfileSlug('user-example')).toBeTrue();
    expect(isNoindexProfileSlug('mary')).toBeFalse();
    expect(isNoindexProfileSlug('cellings')).toBeFalse();
    expect(isNoindexProfileSlug('plumber')).toBeFalse();
  });

  it('keeps demo slugs out of a sitemap built from a fixture', () => {
    const locs = profileSitemapLocs(
      ['mary', 'Bussiness', 'developer', 'user-example', 'plumber', 'bussiness', 'cellings', 'catalog'],
      RESERVED,
      'https://onwaves.online',
    );

    expect(locs).toEqual([
      'https://onwaves.online/mary',
      'https://onwaves.online/plumber',
      'https://onwaves.online/cellings',
    ]);
    expect(locs.join('\n')).not.toContain('Bussiness');
    expect(locs.join('\n')).not.toContain('developer');
    expect(locs.join('\n')).not.toContain('user-example');
    expect(isIndexableProfileLink('Bussiness', RESERVED)).toBeFalse();
    expect(isIndexableProfileLink('mary', RESERVED)).toBeTrue();
  });
});
