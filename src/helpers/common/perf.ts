import { defer, Observable, tap } from 'rxjs';
import { environment } from '../../enviroments/environment';

/**
 * Лёгкая инструментация замеров загрузки. Логирует время до ПЕРВОГО ответа
 * (time-to-first-response) для потока — этого достаточно, чтобы отдельно видеть
 * профиль / услуги / расписание и находить последовательные цепочки запросов.
 *
 * По умолчанию активна только в dev (environment.production === false). В проде
 * можно включить точечно из консоли: `window.__perf = true` — тогда логи появятся
 * и на боевом стенде без пересборки.
 */
function perfEnabled(): boolean {
  if (!environment.production) return true;
  return typeof window !== 'undefined' && (window as any).__perf === true;
}

function now(): number {
  return typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now();
}

/**
 * Оборачивает Observable и логирует, сколько миллисекунд прошло от подписки до
 * первого значения. Таймер стартует в `defer` — на момент реальной подписки,
 * а не создания потока, поэтому замер не «уезжает» при отложенной подписке.
 */
export function measure<T>(label: string, source: Observable<T>): Observable<T> {
  if (!perfEnabled()) return source;
  return defer(() => {
    const start = now();
    let logged = false;
    return source.pipe(
      tap({
        next: () => {
          if (logged) return;
          logged = true;
          // eslint-disable-next-line no-console
          console.info(`[perf] ${label}: ${Math.round(now() - start)}ms`);
        },
        error: () => {
          if (logged) return;
          logged = true;
          // eslint-disable-next-line no-console
          console.warn(`[perf] ${label}: FAILED after ${Math.round(now() - start)}ms`);
        },
      })
    );
  });
}
