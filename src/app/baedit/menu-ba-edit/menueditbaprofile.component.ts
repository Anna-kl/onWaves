import {Component, Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../../../services/backend.service';
import {IViewBusinessProfile} from "../../DTO/views/business/IViewBussinessProfile";
@Component({
  selector: 'app-menueditbaprofile',
  templateUrl: './menueditbaprofile.component.html',
  styleUrls: ['./menueditbaprofile.component.css']
})
export class MenueditbaprofileComponent {
  id: string | null = null;
  profile!: IViewBusinessProfile;
  // responsiveOptions: ({ numScroll: number; numVisible: number; breakpoint: string } | { numScroll: number; numVisible: number; breakpoint: string } | { numScroll: number; numVisible: number; breakpoint: string })[];
  constructor(
    private router: Router,
    private _activateRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private backendService: BackendService
  ) {

  }
  // 'Рубрики',
  menus: string[] = ['Профиль','Контакты','График работы','Оплата', 'Услуги', 'Галерея'];
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

  const menuMap: { [key: string]: string } = {
    'contacts': 'Контакты',
    'schedule': 'График работы',
    'oplata': 'Оплата',
    'uslugi': 'Услуги',
    'galereya': 'Галерея'
  };

  const currentUrl = this.router.url;
  this.chooseMainMenu = 'Профиль'; 
  for (const key in menuMap) {
    if (currentUrl.includes(key)) {
      this.chooseMainMenu = menuMap[key];
      break;  
    }
  }

    if (this.id) {
      this.loadProfile();
    }
  }

  loadProfile(): void {
    if (this.id) {
      this.backendService.getFullProfile(this.id).subscribe(
        (profile: IViewBusinessProfile) => {
          this.profile = profile;
        },
        (error: any) => {
        }
      );
    }
  }

  saveChanges(): void {
    if (this.id) {
      this.backendService.saveProfile(this.id, this.profile! ).subscribe(
        () => {
          console.log('Profile saved successfully.');
        },
        (error: any) => {
          console.error('Failed to save profile:', error);
        }
      );
    }
  }

  backToProfile() {
    this.router.navigate(['profilebisacc', this.id]);
  }

  ToProfile() {
    this.router.navigate([`ba-edit/${this.id}`]);
  }

  // ToRubric() {
  //   this.router.navigate([`ba-edit/${this.id}/rubric`]);
  // }
  @Input() chooseMainMenu: string|null = null;

  ToContacts() {
    this.router.navigate([`ba-edit/${this.id}/contacts`]);
  }

  ToGrafik() {
    this.router.navigate([`ba-edit/${this.id}/schedule`]);
  }

  ToOplata() {
    this.router.navigate([`ba-edit/${this.id}/oplata`]);
  }
  ToUslugi() {
    this.router.navigate([`./uslugi`], { relativeTo: this._activateRoute });
  }
  ToGalereya() {
    this.router.navigate([`ba-edit/${this.id}/galereya`]);
  }

  toMenu(menu: string) {
    this.chooseMainMenu = menu;
    switch (menu){
      case 'Профиль': {
        this.ToProfile();
        break;
      }
      // case 'Рубрики': {
      //   this.ToRubric();
      //   break;
      // }
      case 'Контакты':{
        this.ToContacts();
        break;
      }
      case 'График работы': {
        this.ToGrafik();
        break;
      }
      case 'Оплата': {
        this.ToOplata();
        break;
      }
      case 'Услуги': {
        this.ToUslugi();
        break;
      }
      case 'Галерея': {
        this.ToGalereya();
        break;
      }
    }
  }
}
