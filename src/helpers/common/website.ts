/**
 * «Перейти на сайт» только для обычного веба.
 * VK / Telegram / YouTube и т.п. живут своими кнопками, не этой ссылкой.
 */
const SOCIAL_HOSTS = [
  'vk.com',
  'vk.ru',
  'vk.me',
  'vkontakte.ru',
  'instagram.com',
  'instagr.am',
  't.me',
  'telegram.me',
  'telegram.org',
  'facebook.com',
  'fb.com',
  'fb.me',
  'ok.ru',
  'odnoklassniki.ru',
  'youtube.com',
  'youtu.be',
  'tiktok.com',
  'max.ru',
  'wa.me',
  'whatsapp.com',
  'dzen.ru',
  'zen.yandex.ru',
  'twitter.com',
  'x.com',
  'linkedin.com',
  'rutube.ru',
];

function hostOf(url: string): string | null {
  const raw = url.trim();
  const withProto = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(withProto).hostname.replace(/^www\./i, '').toLowerCase();
  } catch {
    return null;
  }
}

export function isSocialNetworkUrl(url: string | null | undefined): boolean {
  if (!url?.trim()) {
    return false;
  }
  const lower = url.trim().toLowerCase();
  if (lower.includes('instagram')) {
    return true;
  }
  const host = hostOf(lower);
  if (!host) {
    return SOCIAL_HOSTS.some(item => lower.includes(item));
  }
  return SOCIAL_HOSTS.some(item => host === item || host.endsWith(`.${item}`));
}

export function isOwnWebsite(url: string | null | undefined): boolean {
  return !!url?.trim() && !isSocialNetworkUrl(url);
}
