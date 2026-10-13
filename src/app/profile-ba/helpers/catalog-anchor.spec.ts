import { catalogAnchorLabel } from './catalog-anchor';

describe('catalogAnchorLabel', () => {
  it('uses name, category and city when the API sends them', () => {
    expect(catalogAnchorLabel({
      link: 'mary',
      name: 'Mary',
      mainCategory: 'Шугаринг',
      city: 'Кашира',
    })).toBe('Mary — Шугаринг, Кашира');
  });

  it('skips empty category or city', () => {
    expect(catalogAnchorLabel({
      link: 'mary',
      name: 'Mary',
      mainCategory: '  ',
      city: 'Кашира',
    })).toBe('Mary — Кашира');
    expect(catalogAnchorLabel({
      link: 'mary',
      name: 'Mary',
    })).toBe('Mary');
  });

  it('falls back to the slug and does not rewrite it', () => {
    expect(catalogAnchorLabel({
      link: 'Manikure_kashira',
      name: null,
    })).toBe('Manikure_kashira');
  });
});
