import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import {BusService} from "../../../../services/busService";
import {ProfileService} from "../../../../services/profile.service";
import {CookieService} from "ngx-cookie-service";
import {DomSanitizer} from "@angular/platform-browser";
import {NgbActiveModal,NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
  RegisterBusinessProfileComponent
} from "../register-business-profile/register-business-profile.component";
import {ActivatedRoute, Router} from "@angular/router";
import {UserType} from "../../../DTO/classes/profiles/profile-user.model";
import {IViewBusinessProfile} from "../../../DTO/views/business/IViewBussinessProfile";
import {Group} from "../../../DTO/views/services/IViewGroups";
import {ProfileDataEditService} from "../../../baedit/services/ba-edit-service";
import {Arenda2Component} from "../../../baedit/components/uslugi/arenda2/arenda2.component";
import {PaymentForType} from "../../../DTO/enums/paymentForType";

@Component({
  selector: 'app-formatuslugi',
  templateUrl: './formatuslugi.component.html',
  styleUrls: ['./formatuslugi.component.scss'],
  providers: [ProfileService]
})
export class FormatuslugiComponent implements OnInit {
  user: IViewBusinessProfile | undefined = undefined;
  mainProfile: IViewBusinessProfile | undefined = undefined;
  token: string = "";
  @Input() id:string|null = null;
  // @Output() setProfile = new EventEmitter<IViewBusinessProfile>();
  // @Input() baProfiles:IViewBusinessProfile[] = [];
  // @Input() groups:Group[] = [];
  // baProfilesView: IViewBusinessProfile[] = [];
  @Output() closeWindow = new EventEmitter();
  @ViewChild('toggleButton') toggleButton: ElementRef | undefined;
  @ViewChild('menu') menu: ElementRef | undefined;
  isMenuOpen: boolean = false;
  constructor(private _events: BusService,
              private _activateRoute: ActivatedRoute,
              private modalService: NgbModal,
              private _router: Router,
              private renderer: Renderer2,
              private _cookie: CookieService,
              private _editEvent: ProfileDataEditService,
              private activeModal: NgbActiveModal) {
    this.renderer.listen('window', 'click',(e:Event)=>{
      /**
       * Only run when toggleButton is not clicked
       * If we don't check this, all clicks (even on the toggle button) gets into this
       * section which in the result we might never see the menu open!
       * And the menu itself is checked here, and it's where we check just outside of
       * the menu and button the condition abbove must close the menu
       */
      let element = e.target as HTMLElement;
      if(element.className.toString().includes('menu btn1')
        || element.className.toString().includes('hamburger-icon2')
        || element.className.toString().includes('icon-left')
        || element.className.toString().includes('icon-right')){
        this.isMenuOpen = !this.isMenuOpen;
      }else {
        this.isMenuOpen = false;
      }
    });

  }

  routerCabinet(){
    this._router.navigate(['cabinet-ba']);
  }
  ngOnInit (): void {
    // if (this.mainProfile === undefined){
    //   this.baProfiles.forEach(item => {
    //     if (item.avatar) {
    //       item.avatar = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${item.avatar}`);
    //     } else {
    //       item.avatar = '/assets/img/AvatarBig.png';
    //     }
    //   });
    //   const user = this.baProfiles.find(_ => _.userType === UserType.User);
    //   this.changeUser(user!);
    // }
  }
  // chooseUser(user: IViewBusinessProfile){
  //   this.changeUser(user);
  //   if (user.userType === UserType.Business) {
  //     this.closeWindow.emit({user: user, status:false});
  //     this._router.navigate([`/profilebisacc/${user.id}`]);
  //   } else {
  //     this._router.navigate([`/page-user/${user.id}`]);
  //   }
  // }

  // changeUser(user: IViewBusinessProfile){
  //   this.baProfilesView = this.baProfiles.filter(_ => _.id !== user.id);
  //   this.mainProfile = user;
  //   this._events.chooseMainProfile(this.mainProfile);
  // }
  // createBAProfile(){
  //   this.closeWindow.emit();
  //   // this.active = !this.active;
  //   const modalRef = this.modalService.open(RegisterBusinessProfileComponent);
  // }

  // checkPermissionBA(): boolean {
  //   if (this.mainProfile?.userType === UserType.Business){
  //     return true;
  //   } else return this.baProfilesView.length >= 3;
  // }

  checkBA(): boolean {
    return this.mainProfile?.userType === UserType.Business;
  }

  exit() {
    this.mainProfile = undefined;
    this._cookie.delete('auth-token-ocpio');
    this._events.transferToken(null);
    this._router.navigate(['/']);
  }
  goToHelpPage() {
    this._router.navigate(['static/help']);
  }
  goToSettingsPage() {
    this._router.navigate(['static/settings']);
  }
  goToOServicePage() {
    this._router.navigate(['static/oservice']);
  }
  goToChas() {
    // this.closeWindow.emit();
    this.activeModal.close(PaymentForType.ForHour);
 //   this._router.navigate([`./arenda-hour`], { relativeTo: this._activateRoute } );
  }
  goToUsluga() {
    // this.closeWindow.emit();
    this.activeModal.close(PaymentForType.ForService);
    // Arenda2Component
    // this._router.navigate(['profile-ba/arenda2']);
  }
  createBAProfileFormats(){
    this.closeWindow.emit();
    // this.active = !this.active;
    const modalRef = this.modalService.open(FormatuslugiComponent);
  }
  closeModal() {
    this.activeModal.close();
  }
}
