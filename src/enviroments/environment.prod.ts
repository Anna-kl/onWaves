export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyBiOQ4X8q8Kf5UHwTq_TaRSTb9j0xClRJs",
    authDomain: "ocpio-311510.firebaseapp.com",
    projectId: "ocpio-311510",
    storageBucket: "ocpio-311510.appspot.com",
    messagingSenderId: "625145012665",
    appId: "1:625145012665:web:b19feea8ea4bd2679fd668",
    measurementId: "G-T8F0R2G5YN"
  },
  domain: 'onwaves.online',
  /**
   * Канонический origin сайта. НЕ берётся из запроса намеренно: SSR-инстанс
   * отвечает и на ssr.onwaves.online, и если canonical подставлять из Host,
   * стейджинг начнёт самоканонизироваться и уведёт в индекс дубль всего
   * каталога профилей. Единственный индексируемый хост — этот.
   */
  siteUrl: 'https://onwaves.online',
  TEXT_LENGTH: 1000,
  telegramChannelUrl: 'https://t.me/onwaves',
  publicKey: "BLBx-hf2WrL2qEa0qKb-aCJbcxEvyn62GDTyyP9KTS5K7ZL0K7TfmOKSPqp8vQF0DaG8hpSBknz_x3qf5F4iEFo",
  /** Боевой API. Localhost здесь оставлять нельзя: browser и server production
   *  подставляют этот файл через fileReplacements — иначе Universal ходит в
   *  127.0.0.1 и сериализует пустую карточку с каталожным title. */
  Uri: 'https://onwaves-server.online/v1/api/',
  UriFoto: 'https://onwaves-server.online/v1/api/',
  hubUri: 'https://onwaves-server.online/',
  UriAI: 'https://onwaves-server.online/flask-api/api/',
};
