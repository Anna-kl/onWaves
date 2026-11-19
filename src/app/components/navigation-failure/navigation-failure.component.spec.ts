import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, NavigationError, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { isChunkLoadError, NavigationFailureComponent } from './navigation-failure.component';

describe('Восстановление после ошибки загрузки страницы', () => {
  let events: Subject<unknown>;
  let fixture: ComponentFixture<NavigationFailureComponent>;
  let navigate: jasmine.Spy;
  const target = '/giveaways/mary-skinhale-2026-11?participate=1&entryPoint=master';
  beforeEach(() => {
    events = new Subject();
    navigate = jasmine.createSpy('navigateByUrl').and.returnValue(Promise.resolve(true));
    TestBed.configureTestingModule({ imports: [NavigationFailureComponent],
      providers: [{ provide: Router, useValue: { events, navigateByUrl: navigate } }] });
    fixture = TestBed.createComponent(NavigationFailureComponent);
  });

  it('показывает ошибку и точную ссылку без автоматической навигации', () => {
    events.next(new NavigationError(1, target, new Error('Loading chunk 480 failed')));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role=alert]').textContent).toContain('Не удалось открыть страницу');
    expect(fixture.nativeElement.querySelector('a').getAttribute('href')).toBe(target);
    expect(navigate).not.toHaveBeenCalled();
  });

  it('повторяет переход только по действию, сохраняет query и закрывается после успеха', async () => {
    events.next(new NavigationError(1, target, { name: 'ChunkLoadError' }));
    await fixture.componentInstance.retry();
    expect(navigate).toHaveBeenCalledOnceWith(target);
    events.next(new NavigationEnd(2, target, target)); fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role=alert]')).toBeNull();
  });

  it('при повторном отказе сохраняет ручное восстановление, не зацикливается', async () => {
    navigate.and.returnValue(Promise.reject(new Error('Loading chunk 480 failed')));
    events.next(new NavigationError(1, target, { name: 'ChunkLoadError' }));
    await fixture.componentInstance.retry();
    expect(fixture.componentInstance.failedUrl).toBe(target);
    expect(fixture.componentInstance.retrying).toBeFalse();
    expect(navigate).toHaveBeenCalledTimes(1);
  });

  it('не подменяет ошибки бизнес-логики сообщением о загрузке кода', () => {
    events.next(new NavigationError(1, target, new Error('Not allowed')));
    expect(fixture.componentInstance.failedUrl).toBeNull();
    expect(isChunkLoadError({ rejection: new Error('ChunkLoadError: Loading chunk 480 failed') })).toBeTrue();
  });

  it('не предлагает внешнюю ссылку из некорректного события', () => {
    events.next(new NavigationError(1, '//other.example/path', { name: 'ChunkLoadError' }));
    expect(fixture.componentInstance.failedUrl).toBe('/');
  });
});
