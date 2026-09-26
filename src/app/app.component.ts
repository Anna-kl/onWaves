import {AfterViewInit, Component, computed, ElementRef, HostListener, Inject, NgZone, OnInit, PLATFORM_ID, signal, ViewChild} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from "@angular/router";
import {IViewBusinessProfile} from "./DTO/views/business/IViewBussinessProfile";
import {AuthService} from "../services/auth.service";
import {ProfileService} from "../services/profile.service";

import {BehaviorSubject, filter, map, Observable, tap} from "rxjs";
import {LoginService} from "./auth/login.service";
import {IResponse} from "./DTO/classes/IResponse";
import { AnalyticsService } from 'src/services/analytics.service';
import { SeoService, SeoPageData } from 'src/services/seo.service';
import {  PushDebugService } from 'src/services/push-notification.service';
import { getDeviceCompat } from 'src/utils/device-compat';
import { environment } from 'src/enviroments/environment';

import { NewsletterService } from 'src/services/newsLetter';
import { HttpClient } from '@angular/common/http';
import { AIService } from 'src/services/ai.services';
import { Store } from '@ngrx/store';
import { getProfileMainClient } from './ngrx-store/mainClient/store.select';
import { UserType } from './DTO/classes/profiles/profile-user.model';
import { requestAIAction } from './ngrx-store/aiStore/ai.action';
import { aiCurrentState } from './ngrx-store/aiStore/ai.selectors';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { VideoPlaybackCoordinatorService } from './common/video-player/video-playback-coordinator.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService, ProfileService, NewsletterService],
   animations: [
    trigger('toast', [
      // появление (0–12% — fade in, 12–80% — пауза, 80–100% — fade out)
      transition(':enter', [
        animate('3000ms ease-in-out', keyframes([
          style({ opacity: 0, transform: 'translateY(8px) scale(.98)', offset: 0 }),
          style({ opacity: 1, transform: 'translateY(0) scale(1)',    offset: .12 }),
          style({ opacity: 1, transform: 'translateY(0) scale(1)',    offset: .80 }),
          style({ opacity: 0, transform: 'translateY(-6px) scale(.98)',offset: 1 })
        ]))
      ])
    ])
  ]

})
export class AppComponent implements OnInit, AfterViewInit  {

 onRelease(_ev: PointerEvent) {
    this.isRecording.set(false);
    this.stop();
  }

  onKeyDown(ev: KeyboardEvent|Event) {
    if (this.isRecording()) return;
    ev.preventDefault();
     this.isRecording.set(true);
    this.start();
  }

  onKeyUp(ev: KeyboardEvent|Event) {
    ev.preventDefault();
    this.isRecording.set(false);
    this.stop();
  }

    onToastDone() {
    this.isShowMessageAI = false;       // скрываем после завершения
  }

  // isRecording = false;
  showHint = true; // подсказка видна при старте
  showIntroOverlay = false;
  isRecording = signal(false);
  isPaused = signal(false);
  error = signal<string | null>(null);

  private stream?: MediaStream;
  private rec?: MediaRecorder;
  private chunks: Blob[] = [];

    
  isAuth = false;
  isLoad = false;
  message: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  a: Observable<IResponse> | undefined;
  user: IViewBusinessProfile|null = null;
  constructor(private _route: Router,
              private analytics: AnalyticsService,
              public _login: LoginService,
              private seo: SeoService,
               public push: PushDebugService,
               public _aiService: AIService,
               public store$: Store,
               private ngZone: NgZone,
               private videoCoordinator: VideoPlaybackCoordinatorService,
               @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.handleRouteEvents();
  }
 readonly VAPID_PUBLIC_KEY = "BLBx-hf2WrL2qEa0qKb-aCJbcxEvyn62GDTyyP9KTS5K7ZL0K7TfmOKSPqp8vQF0DaG8hpSBknz_x3qf5F4iEFo";

  mimeType = 'audio/webm;codecs=opus'; // fallback ниже
  blob = signal<Blob | null>(null);
  url = computed(() => this.blob() ? URL.createObjectURL(this.blob()!) : null);
  protected UserType = UserType;

  /** Текст, который хотим показать по центру экрана */
  infoTitle = '';
  infoMessage = '';
  isShowMessageAI = false;

  closeHint(): void {
    this.showHint = false;
  }

  closeAI() {
      this.isShowMessageAI = false;
  }

  private winUpHandler = (ev: Event) => this.stop();

   async onPress(ev: PointerEvent) {
      ev.preventDefault();
      (ev.target as HTMLElement).setPointerCapture?.(ev.pointerId);

      // подписка на pointerup на window (отпустили за пределами кнопки)
      window.addEventListener('pointerup', this.winUpHandler, { once: true });
      this.isRecording.set(true);
      await this.start();
  }

  // автоматическое скрытие после 3с — по окончанию keyframes
  onOverlayAnimEnd(ev: AnimationEvent) {
    if (ev.animationName === 'toastLife') {
      this.isShowMessageAI = false;
    }
  }

  async start() {
    this.error.set(null);
    this.blob.set(null);

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const supported = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/ogg;codecs=opus',
        'audio/mp4',
      ].find(t => MediaRecorder.isTypeSupported(t));
      this.mimeType = supported ?? '';
      this.rec = new MediaRecorder(this.stream, this.mimeType ? { mimeType: this.mimeType } : undefined);

      this.chunks = [];
      this.rec.ondataavailable = (e) => {
         if (e.data.size) this.chunks.push(e.data); };
      this.rec.onstop = () => {
        const blob = new Blob(this.chunks, { type: this.mimeType || 'audio/webm' });
        this.blob.set(blob);
         if (blob) {
          this.infoTitle = 'Думаю над запросом))';
          // this.infoMessage = `${(blob.size/1024).toFixed(0)} КБ • ${this.rec?.mimeType }`;
        } else {
          this.infoTitle = 'Запись не получилась';
          this.infoMessage = 'Микрофон молчит или запись была слишком короткой';
        }
        this.isShowMessageAI = true;
        this.upload();
        this.cleanupStream();
      };

      this.rec.start();        // можно передать timeslice (мс), если нужно получать куски
      // this.isRecording.set(true);
      this.isPaused.set(false);
    } catch (e: any) {
      this.error.set(e?.message ?? 'Не удалось получить доступ к микрофону');
      this.cleanupStream();
    }
  }

  async toggleRecording() {
    let temp = this.isRecording();
    temp = !temp;
    this.isRecording.set(temp);
    if (this.isRecording()){
      this.start();
    }
    else {
      this.stop();
      // this.download();
      // this.upload();
    }

  }

    pause() {
      if (this.rec && this.rec.state === 'recording') {
        this.rec.pause(); this.isPaused.set(true);
      }
    }
    resume() {
      if (this.rec && this.rec.state === 'paused') {
        this.rec.resume(); this.isPaused.set(false);
      }
    }
    stop() {
      if (this.rec && (this.rec.state === 'recording' || this.rec.state === 'paused')) {
        this.rec.stop();
      }

    }

    download() {
      if (!this.blob()) return;
      const a = document.createElement('a');
      a.href = this.url()!;
      a.download = `recording_${Date.now()}.webm`; // или .ogg / .mp4 по mimeType
      a.click();
      URL.revokeObjectURL(a.href);
    }

    upload() {
      if (!this.blob()) return;
      const form = new FormData();
      form.append('file', this.blob()!, 'recording.webm');
      form.append('data', this.user?.id!);
      this.store$.dispatch(requestAIAction({request: form}));
      // this._aiService.upload_mpeg(form).subscribe(
      //   result => {
      //     if (result.operation === 'open calendar'){
      //       this._route.navigate(['/notes/', this.user?.id], {  queryParams: { date: result.data },  });
      //     }
      //     if (result.operation === 'create record'){

      //     }
      //   }
      // );
      // this.http.post('/api/upload-audio', form).subscribe({
      //   next: () => console.log('uploaded'),
      //   error: err => this.error.set('Ошибка загрузки: ' + err?.message),
      // });
    }

    private cleanupStream() {
      this.stream?.getTracks().forEach(t => t.stop());
      this.stream = undefined;
    }

  

  /**
   * Собирает SEO-данные самого глубокого активного маршрута, наследуя поля от
   * родителей: раздел задаёт noindex один раз, дочерние экраны его не повторяют.
   */
  private collectRouteSeo(): SeoPageData & { dynamicSeo?: boolean } {
    let route: ActivatedRoute | null = this._route.routerState.root;
    const collected: SeoPageData & { dynamicSeo?: boolean } = {};
    while (route) {
      const data = route.snapshot.data ?? {};
      if (data['title']) collected.title = data['title'];
      if (data['description']) collected.description = data['description'];
      if (data['shareTitle']) collected.shareTitle = data['shareTitle'];
      if (data['ogType']) collected.ogType = data['ogType'];
      if (data['noindex'] !== undefined) collected.noindex = data['noindex'];
      if (data['dynamicSeo'] !== undefined) collected.dynamicSeo = data['dynamicSeo'];
      route = route.firstChild;
    }
    return collected;
  }

  /** Переносит SEO-данные активного маршрута в теги документа. */
  private applySeoForUrl(url: string): void {
    const { dynamicSeo, ...seoData } = this.collectRouteSeo();
    if (dynamicSeo) {
      // Заголовок и описание такой страницы ставит сам компонент из данных
      // бэка — здесь только каноникал и robots, они выводятся из URL.
      this.seo.updateNavigationOnly(url, seoData.noindex === true);
    } else {
      this.seo.update(url, seoData);
    }
  }

  /** «Назад» в браузере — не сбрасываем скролл, чтобы вернуться к списку. */
  private lastNavWasPopstate = false;

  handleRouteEvents() {
    this._route.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.lastNavWasPopstate = event.navigationTrigger === 'popstate';
      }
      if (event instanceof NavigationEnd) {
        this.applySeoForUrl(event.urlAfterRedirects || event.url);
        this.scrollPageToTop();
      }
    });

    // Первичную навигацию одной подпиской не поймать: роутер настроен на
    // initialNavigation: 'enabledBlocking', она завершается ещё до создания
    // AppComponent — её NavigationEnd происходит раньше, чем подписка выше.
    // Именно этот случай и есть SSR-ответ, который читает робот, поэтому
    // применяем данные текущего маршрута сразу. Повторный вызов безвреден:
    // сервис не добавляет теги, а перезаписывает их.
    if (this._route.navigated) {
      this.applySeoForUrl(this._route.url);
    }
  }

  /**
   * Динамические страницы (data.dynamicHit) сами отправляют хит в Метрику после
   * того, как выставят настоящий title. Для них app.component хит НЕ шлёт, иначе
   * просмотр запишется со стухшим document.title.
   */
  private isDynamicHitRoute(): boolean {
    let route: ActivatedRoute | null = this._route.routerState.root;
    while (route) {
      if (route.snapshot.data?.['dynamicHit']) return true;
      route = route.firstChild;
    }
    return false;
  }

  /** Хит для статических страниц; для динамических — пропускаем (шлёт компонент). */
  private sendPageHit(url: string): void {
    if (this.isDynamicHitRoute()) return;
    this.analytics.trackPage(url, document.title);
  }
  baProfiles: IViewBusinessProfile[] = [];



  @ViewChild('wavePath', { static: false }) wavePathRef: ElementRef<SVGPathElement>|undefined;
  /** Оболочка роутера с overflow-y — window.scroll её не двигает. */
  @ViewChild('pageScroll') private pageScroll?: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    // requestAnimationFrame отсутствует на сервере (SSR) — анимацию волны запускаем только в браузере.
    if (!isPlatformBrowser(this.platformId)) return;
    if(this.wavePathRef){
      const pathEl = this.wavePathRef.nativeElement;
    let t = 0;

    this.ngZone.runOutsideAngular(() => {
      const animate = () => {
        const waveLength = 20;
        const baseAmp = 5;
        const crestAmp = 13;
        const crestSpeed = 0.3;
        const points: string[] = [];

        const crestCenter = (Math.sin(t * crestSpeed) + 1) * 30; // 0..100

        for (let x = 0; x <= 100; x += 2) {
          const crestInfluence = Math.exp(-Math.pow((x - crestCenter) / 5, 2));
          const amp = baseAmp + crestAmp * crestInfluence;
          const y = 5 + Math.sin((x / waveLength + t) * Math.PI) * amp;
          points.push(`${x},${y}`);
        }

        let d = `M${points[0]}`;
        for (let i = 1; i < points.length; i++) {
          d += ` L${points[i]}`;
        }

        pathEl.setAttribute('d', d);
        t += 0.02;
        requestAnimationFrame(animate);
      };

      animate();
    });
    }
  }

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Единый плеер на всю страницу: старт одного видео ставит остальные на паузу.
      this.videoCoordinator.install();

      if (environment.production && getDeviceCompat().supportsServiceWorker) {
        navigator.serviceWorker.register('/sw.js').then(reg => {
          setInterval(() => reg.update(), 60 * 60 * 1000);
        });
      } else {
        if ('serviceWorker' in navigator) {
          const registrations = await navigator.serviceWorker.getRegistrations();
          await Promise.all(registrations.map(registration => registration.unregister()));
        }

        if ('caches' in window) {
          const cacheNames = await caches.keys();
          await Promise.all(
            cacheNames
              .filter(cacheName => cacheName.startsWith('onwaves-cache-'))
              .map(cacheName => caches.delete(cacheName))
          );
        }
      }
    }

        // this.store$.select(aiCurrentState).subscribe(result => {
        //     if (result.operation === 'open calendar'){
        //             this._route.navigate(['/notes/', this.user?.id], {  queryParams: result,  });
        //       }
        //     if (result.operation === 'create record'){
        //       this._route.navigate(
        //               ['notes', this.user?.id, 'add-record-ba'],
        //               { queryParams: result['data'] }  // result: { [key]: string | number | boolean | (массив) }
        //             );
        //     }
        //     if (result.operation === 'not found'){
        //         this.infoTitle = 'Команда не распознана';
        //         this.infoMessage = result.message!;
        //         this.isShowMessageAI = true;
        //     }
        // });

        const introSeen = isPlatformBrowser(this.platformId) && localStorage.getItem('aiVoiceIntroSeen') === '1';

            if (!introSeen) {
              // первый заход — показываем большое инфо-окно
              this.showIntroOverlay = true;
              this.showHint = false;
            } else {
              // не первый заход — можно включить маленькую подсказку (если нужно)
              this.showIntroOverlay = false;
              this.showHint = true;

              // например, убрать её через пару секунд
              setTimeout(() => {
                this.showHint = false;
              }, 4000);
            }


            // Аналитика (Яндекс.Метрика) и document.title доступны только в браузере —
            // на сервере (SSR) хиты не шлём.
            if (isPlatformBrowser(this.platformId)) {
              this._route.events.pipe(
                filter((evt): evt is NavigationEnd => evt instanceof NavigationEnd)
              ).subscribe(evt => {
                this.sendPageHit(evt.urlAfterRedirects);
              });
              // initialNavigation:'enabledBlocking' завершает первый переход ДО создания
              // AppComponent, поэтому подписка выше его не ловит — шлём initial-хит вручную.
              this.sendPageHit(this._route.url);
            }
    // this.notification.receiveMessage();
    // this.message = this.notification.currentMessage;
    // checkCookie() теперь запускается в APP_INITIALIZER (initializeAuth) до старта роутера —
    // см. login.service.ts. Повторный вызов здесь приводил бы к дублированию запроса.

    this.store$.select(getProfileMainClient).subscribe(result => {
        if (result){
          if  (result.profileMainClient){
            this.user = result.profileMainClient;
                    this.store$.select(aiCurrentState).subscribe(result => {
            if (result.operation === 'open calendar'){
                    this._route.navigate(['/notes/', this.user?.id], {  queryParams: result.data,  });
              }
            if (result.operation === 'create record'){
              this._route.navigate(
                      ['notes', this.user?.id, 'add-record-ba'],
                      { queryParams: result['data'] }  // result: { [key]: string | number | boolean | (массив) }
                    );
            }
            if (result.operation === 'not found'){
                this.isShowMessageAI = true;
                this.infoTitle = result.message!;
           
                
            }
        });
          }
        }
    });
    // this._login.mainCategoriesProfile$.subscribe(
    //     result => {
    //       if (result) {
    //         this._login.
    //       }
    //     })

  //   if (this.isAuthenticated()){
  //     let token  = this.cookieService.get('auth-token-ocpio');
  //     let id = '';
  //     if (this.isUuid()){
  //       id = this.cookieService.get('uuid-ocpio');
  //     } else{
  //       const md5 = new Md5();
  //       id = md5.appendStr(`${new Date().toLocaleDateString()}${token}`).end()!.toString().substring(20);
  //       this.cookieService.set('uuid-ocpio', id);
  //     }
  //     const send = {
  //       token,
  //       'uuid': id,
  //     };
  //     this.authService.getProfiles(send).subscribe(
  //       result => {
  //         if (result.code === 200){
  //           let temp = result.data as IViewProfileMenu;
  //           this.notification.requestPermission(result.message);
  //           this.notification.receiveMessage();
  //           this.baProfiles.push(temp.profile as IViewBusinessProfile);
  //           this._apiProfiles.getAllBusinessProfile(temp.profile?.id!, token ).subscribe(
  //             profilesResponse => {
  //               if (profilesResponse.code === 200) {
  //                 this.baProfiles.push(...profilesResponse.data as IViewBusinessProfile[]);
  //                 // записываем в store ngrx  профили нашего BA
  //                 this.store$.dispatch(getActionStateBAProfileClient({profileBaClient: this.baProfiles[1]}))
  //               }
  //     // // записываем в store ngrx  профили ProfileBA
  //     // this.store$.dispatch(getActionStateBAProfileClient({profileBaClient: this.baProfiles }))
  //    //записываем в store ngrx MainProfile
  //      this.store$.dispatch(getActionStateMainProfileClient({ tokenMainClient: result.data.token, profileMainClient: result.data.profile }));
  //
  //               this.isAuth = true;
  //                // this._event.transferToken(result.data); // это заменяем на токен сторе
  //               this.isLoad = true;
  //            //   this._route.navigate(['/main/after']);
  //             });
  //         }
  //       });
  //   }
  //   else {
  //     this.isAuth = false;
  // //    this._route.navigate(['/main']);
  //     this.isLoad = true;
  //   }

  }

  redirectMainPage() {
    this._route.navigate(['/']);
  }

  onActivate(_event: unknown) {
    this.scrollPageToTop();
  }

  /**
   * SPA не сбрасывает scrollY: с главной (карточки ниже первого экрана)
   * профиль мастера открывался с середины. На SSR window нет.
   * Instant, не smooth — иначе анимация пересекается с подгрузкой контента.
   */
  private scrollPageToTop(): void {
    if (!isPlatformBrowser(this.platformId) || this.lastNavWasPopstate) {
      return;
    }
    const reset = () => {
      window.scrollTo(0, 0);
      this.pageScroll?.nativeElement.scrollTo(0, 0);
    };
    reset();
    requestAnimationFrame(reset);
  }

    closeIntroOverlay(): void {
    this.showIntroOverlay = false;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('aiVoiceIntroSeen', '1');
    }

    // при желании — показать маленькую подсказку на несколько секунд
    this.showHint = true;
    setTimeout(() => {
      this.showHint = false;
    }, 4000);
  }

  // Дополнительно: закрыть оверлей по Esc
  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.showIntroOverlay) {
      this.closeIntroOverlay();
    }
  }
}
