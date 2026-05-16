export interface DeviceCompat {
  isIOS: boolean;
  iosVersion: [number, number, number] | null;
  supportsServiceWorker: boolean;
  supportsPushNotifications: boolean;
}

export function getDeviceCompat(): DeviceCompat {
  const ua = navigator.userAgent;

  const isIOS = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
  let iosVersion: [number, number, number] | null = null;

  if (isIOS) {
    const match = ua.match(/OS (\d+)_(\d+)(?:_(\d+))?/);
    if (match) {
      iosVersion = [
        parseInt(match[1], 10),
        parseInt(match[2], 10),
        parseInt(match[3] ?? '0', 10),
      ];
    }
  }

  // iOS < 16.4: service worker causes blank screen + no push support
  // iOS 16.4+: push notifications added, SW works correctly
  const iosMajor = iosVersion?.[0] ?? 0;
  const iosMinor = iosVersion?.[1] ?? 0;
  const isProblematicIOS = isIOS && (iosMajor < 16 || (iosMajor === 16 && iosMinor < 4));

  const supportsServiceWorker = !isProblematicIOS && 'serviceWorker' in navigator;
  const supportsPushNotifications =
    supportsServiceWorker && 'PushManager' in window && 'Notification' in window;

  return { isIOS, iosVersion, supportsServiceWorker, supportsPushNotifications };
}
