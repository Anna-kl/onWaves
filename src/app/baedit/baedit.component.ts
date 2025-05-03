
import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ProfileDataEditService} from "./services/ba-edit-service";
import {IViewBusinessProfile} from "../DTO/views/business/IViewBussinessProfile";
import {Subject, takeUntil} from "rxjs";
import { ProfileService } from 'src/services/profile.service';
import { ProfileDataService } from '../profile-ba/services/profile-data.service';

@Component({
  selector: 'app-baedit',
  templateUrl: './baedit.component.html',
  styleUrls: ['./baedit.component.css']
})
export class BAEditComponent implements OnInit, OnDestroy {
  // id: string | null = null;
  destroy$: Subject<void> = new Subject<void>();
  id: string | any;
  profile: IViewBusinessProfile | null = null;
  isShowMenu = true;
  menu: string|null = null;
  constructor(
    private router: Router,
    private _activateRoute: ActivatedRoute,
    private _dataService: ProfileDataEditService,
    private _api: ProfileService,
    private _profileData: ProfileDataService
  )
  {
    this._dataService.sendProfile.subscribe(
      result => this.profile = result);
  }

  ngOnInit(): void {
    this._activateRoute.queryParams.pipe(takeUntil(this.destroy$)).subscribe(async result => {
        if (result) {
          if (result['menu']) {
            this.menu = result['menu'];
      }
    }});
    if (this.profile){
    }

    let link = this._activateRoute.snapshot.paramMap.get('id');
    if (link) {
      this._api.translateLink(link).subscribe(
          result => {
            this.id = result.data;
            this._profileData.transferId(result.data);
          }
      );
  }
  }


  // backToProfile() {
  //   this.router.navigate(['profilebisacc', this.id]);
  // }

  backToProfile() {
    if (this.profile) {
      this.router.navigate(['profilebisacc', this.profile?.id]);
    } else {
      window.location.href = `/`;
    }
  }
  onActivate($event: any) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
