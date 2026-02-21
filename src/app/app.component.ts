import {AfterViewInit, Component, computed, ElementRef, HostListener, Inject, OnInit, signal, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterState} from "@angular/router";
import {IViewBusinessProfile} from "./DTO/views/business/IViewBussinessProfile";
import {AuthService} from "../services/auth.service";
import {ProfileService} from "../services/profile.service";

import {BehaviorSubject, filter, map, Observable, tap} from "rxjs";
import {LoginService} from "./auth/login.service";
import {IResponse} from "./DTO/classes/IResponse";
import {Title} from "@angular/platform-browser";
import { AnalyticsService } from 'src/services/analytics.service';
import { PushService } from 'src/services/pwPush';
import {  PushDebugService } from 'src/services/push-notification.service';

import { NewsletterService } from 'src/services/newsLetter';
import { HttpClient } from '@angular/common/http';
import { AIService } from 'src/services/ai.services';
import { Store } from '@ngrx/store';
import { getProfileMainClient } from './ngrx-store/mainClient/store.select';
import { UserType } from './DTO/classes/profiles/profile-user.model';
import { requestAIAction } from './ngrx-store/aiStore/ai.action';
import { aiCurrentState } from './ngrx-store/aiStore/ai.selectors';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';



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
              private titleService: Title,
               public push: PushDebugService,
               public _aiService: AIService,
               public store$: Store,
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

  

  getTitle(state: RouterState, parent: ActivatedRoute): string[] {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data['title']) {
      data.push(parent.snapshot.data['title']);
    }
    if (state && parent && parent.firstChild) {
      data.push(...this.getTitle(state, parent.firstChild));
    }
    return data;
  }

  handleRouteEvents() {
    this._route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const title = this.getTitle(this._route.routerState, this._route.routerState.root).join('-');
        this.titleService.setTitle(title);
        // gtag('event', 'page_view', {
        //   page_title: title,
        //   page_path: event.urlAfterRedirects,
        //   page_location: this.document.location.href
        // });
      }
    });
  }
  baProfiles: IViewBusinessProfile[] = [];



  @ViewChild('wavePath', { static: false }) wavePathRef: ElementRef<SVGPathElement>|undefined;

  ngAfterViewInit(): void {
    if(this.wavePathRef){
      const pathEl = this.wavePathRef.nativeElement;
    let t = 0;

    const animate = () => {
      const waveLength = 20;
      const baseAmp = 5;
      const crestAmp = 13;
      const crestSpeed = 0.3;
      const points: string[] = [];
    

      const crestCenter = (Math.sin(t * crestSpeed) + 1) * 30; // 0..100

      for (let x = 0; x <= 100; x += 2) {
        // Вычислим дополнительную амплитуду для гребня (локально)
        const crestInfluence = Math.exp(-Math.pow((x - crestCenter) / 5, 2)); // Гауссов пик
        const amp = baseAmp + crestAmp * crestInfluence;

        let y = 5 + Math.sin((x / waveLength + t) * Math.PI) * amp;
        // console.log(y);
        // y = y > 0 ? (-1)*y : 0;
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
    }
  }
  async ngOnInit() {
    
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

        const introSeen = localStorage.getItem('aiVoiceIntroSeen') === '1';

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


              this._route.events.pipe(
              filter((evt): evt is NavigationEnd => evt instanceof NavigationEnd)
            ).subscribe(evt => {
              this.analytics.trackPage(evt.urlAfterRedirects);
            });
    // this.notification.receiveMessage();
    // this.message = this.notification.currentMessage;
    this._login.checkCookie()?.subscribe(
        response => {
          console.log(response);
        }
    )

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

  onActivate($event: any) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

    closeIntroOverlay(): void {
    this.showIntroOverlay = false;
    localStorage.setItem('aiVoiceIntroSeen', '1');

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
