import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterState} from "@angular/router";
import {IViewBusinessProfile} from "./DTO/views/business/IViewBussinessProfile";
import {AuthService} from "../services/auth.service";
import {ProfileService} from "../services/profile.service";

import {BehaviorSubject, filter, map, Observable, tap} from "rxjs";
import {LoginService} from "./auth/login.service";
import {IResponse} from "./DTO/classes/IResponse";
import {DOCUMENT} from "@angular/common";
import {Title} from "@angular/platform-browser";
import { OrderSignalrService } from 'src/services/notification.signal';
import { AnalyticsService } from 'src/services/analytics.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService, ProfileService],

})
export class AppComponent implements OnInit, AfterViewInit  {

  
  isAuth = false;
  isLoad = false;
  message: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  a: Observable<IResponse> | undefined;
  constructor(private _route: Router,
              private analytics: AnalyticsService,
              public _login: LoginService,
              private titleService: Title,
              @Inject(DOCUMENT) private document: Document
  ) {
    this.handleRouteEvents();
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

  // closeWindow($event: {user: IViewBusinessProfile; status: boolean}){
  //   this.setProfile.emit($event.user);
  //   this.isMenuOpen = $event.status;
  // }

  @ViewChild('wavePath', { static: true }) wavePathRef!: ElementRef<SVGPathElement>;

  ngAfterViewInit(): void {
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
  ngOnInit() {
  this._route.events.pipe(
  filter((evt): evt is NavigationEnd => evt instanceof NavigationEnd)
).subscribe(evt => {
  this.analytics.trackPage(evt.urlAfterRedirects);
});
    // this.notification.receiveMessage();
    // this.message = this.notification.currentMessage;
    this._login.checkCookie()?.subscribe(
        response => {
        }
    )
    // this._login.mainCategoriesProfile$.subscribe(
    //     result => {
    //       if (result) {
    //         this._apiProfiles.getAllBusinessProfile(result?.profile?.id!, result?.token!).subscribe(
    //             view => {
    //              this._login.allProfiles$.next(view.data);
    //             }
    //         );
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
}
