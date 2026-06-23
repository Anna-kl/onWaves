import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { getDeviceCompat } from './utils/device-compat';

window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    window.location.reload();
  }
});

async function bootstrap(): Promise<void> {
  const compat = getDeviceCompat();

  if (!compat.supportsServiceWorker && 'serviceWorker' in navigator) {
    // Incompatible device (iOS < 16.4): clean up any stale SW from previous installs
    let hadSW = false;
    try {
      for (const reg of await navigator.serviceWorker.getRegistrations()) {
        await reg.unregister();
        hadSW = true;
      }
      if ('caches' in window) {
        for (const key of await caches.keys()) {
          await caches.delete(key);
        }
      }
    } catch { /* non-critical */ }

    // Защита от бесконечного цикла перезагрузок в Safari
    const alreadyReloaded = sessionStorage.getItem('sw_cleared_reload');

    if (hadSW && !alreadyReloaded) {
      sessionStorage.setItem('sw_cleared_reload', 'true');
      window.location.reload();
      return;
    }
  }

  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
}

bootstrap();