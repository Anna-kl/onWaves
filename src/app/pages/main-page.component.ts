
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {selectProfileMainClient} from "../ngrx-store/mainClient/store.select";
import {select, Store} from "@ngrx/store";
import { Subscription, take } from 'rxjs';
import { IViewBusinessProfile } from '../DTO/views/business/IViewBussinessProfile';
import { BackendService } from 'src/services/backend.service';
import { LoginService } from '../auth/login.service';

interface SubSubcategory {
  name: string;
}

interface Subcategory {
  name: string;
  subSubcategories: SubSubcategory[];
  showSubSubcategories: boolean;
}

// interface Category {
//   name: string;
//   subcategories: Subcategory[];
//   showSubcategories: boolean;
// }

@Component({
  selector: 'app-menu',
  templateUrl: './main-page.component.html',
   styleUrls: ['./main-page.component.css'],
  providers: [ProfileService, BackendService]
})


export class MainPageComponent implements OnInit, OnDestroy {
  search: string = '';
  isAuth: boolean = false;
  profile: IViewBusinessProfile|null = null;
  private unsubscribe$: Subscription|null = null;

  constructor(private elementRef: ElementRef,
              private _apiProfile: ProfileService,
              private backendService: BackendService,
              private _loginService: LoginService,
              private store: Store) {

  }
  ngOnDestroy(): void {
    this.unsubscribe$?.unsubscribe();
  }

  async ngOnInit(): Promise<any> {
    this.unsubscribe$ = this.store.pipe(select(selectProfileMainClient)).subscribe(
      result => {
        if (result){
           this.isAuth = true;
           let profile = new IViewBusinessProfile();
           profile.copyProfile(result);
           this._apiProfile.getCoordinates(result.id!)
           .pipe(take(1)).subscribe(coordinate => {
              if (coordinate.code === 404){
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(position => {
                    profile.longitude = position.coords.longitude;
                    profile.latitude = position.coords.latitude;
                    this.backendService.saveProfile(profile.id!, profile).pipe(take(1))
                    .subscribe(res => {
                      this._loginService.updateProfile(this.profile!.id!);
                    });
                  });
                }
              }
           });
        }
      }
    );
  }
  title = 'MainSiteOcpio';

toggleActive() {
  const divElement = this.elementRef.nativeElement.querySelector('.nav-container');
  divElement.classList.toggle('active');
}
tab : any = 'tab1';
tab0 : any
tab1 : any
tab2 : any
tab3 : any
tab4 : any
tab5 : any
tab6 : any
tab7 : any
tab8 : any
tab9 : any
tab10 : any
tab11 : any
tab12 : any
tab13 : any
tab14 : any
tab15 : any
Clicked : boolean | undefined

onClick(check: number){
  //    console.log(check);
      if(check==1){
        this.tab = 'tab1';
      }else if(check==2){
        this.tab = 'tab2';
      }else if(check==3){
        this.tab = 'tab3';
      }else if(check==4){
        this.tab = 'tab4';
      }else if(check==5){
        this.tab = 'tab5';
      }else if(check==6){
        this.tab = 'tab6';
      }else if(check==7){
        this.tab = 'tab7';
      }else if(check==8){
        this.tab = 'tab8';
      }else if(check==9){
        this.tab = 'tab9';
      }else if(check==10){
        this.tab = 'tab10';
      }else if(check==11){
        this.tab = 'tab11';
      }else if(check==12){
        this.tab = 'tab12';
      }else if(check==13){
        this.tab = 'tab13';
      }else if(check==14){
        this.tab = 'tab14';
      }else if(check==15){
        this.tab = 'tab15';
      }else{
        this.tab = 'tab16';
      }

  }



menuOpen = false;
selectedCategory: string = 'Авто/Мото';
selectedSubcategory: string = '';


// Анимация на меню. Пока не нужна //
isExpanded: boolean = false
state: string = 'initial'
status = false;


expand() {
   this.isExpanded = !this.isExpanded
   this.state = this.isExpanded ? 'expanded' : 'initial'
}

toggleMenu() {
  // this.isExpanded = !this.isExpanded
  // this.state = this.isExpanded ? 'expanded' : 'initial'
  this.menuOpen = !this.menuOpen;
}

toggleCategory(category: string) {
  if (this.selectedCategory === category) {
    this.selectedCategory = '';
    this.selectedSubcategory = '';
  } else {
    this.selectedCategory = category;
    this.selectedSubcategory = '';
  }
}

  toggleSubcategory(subcategory: string) {
    if (this.selectedSubcategory === subcategory) {
      this.selectedSubcategory = '';
    } else {
      this.selectedSubcategory = subcategory;
    }
  }



}



