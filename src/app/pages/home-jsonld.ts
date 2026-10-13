/** Разметка главной: один блок, без SearchAction — выдача поиска закрыта в robots.txt. */
export function buildHomeJsonLd(siteUrl: string): object {
  const origin = siteUrl.replace(/\/$/, '');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'OnWaves',
        url: origin,
        logo: `${origin}/assets/img/jpg/logo.jpg`,
        sameAs: [
          'https://vk.com/club238581537',
          'https://t.me/onwaves',
        ],
      },
      {
        '@type': 'WebSite',
        name: 'OnWaves',
        url: origin,
        inLanguage: 'ru-RU',
      },
    ],
  };
}
