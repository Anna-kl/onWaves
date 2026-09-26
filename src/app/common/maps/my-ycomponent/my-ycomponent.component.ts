import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IViewCoordinates } from 'src/app/DTO/views/profile/IViewCoordinates';
import { resolveAvatarUrl } from 'src/helpers/common/avatar1';

@Component({
  selector: 'app-my-ycomponent',
  templateUrl: './my-ycomponent.component.html',
  styleUrls: ['./my-ycomponent.component.css']
})
export class MyYComponentComponent implements OnInit {
  ngOnInit(): void {}

  @Input() geo: IViewCoordinates | null = null;
  @Input() geoList: IViewCoordinates[] | null = null;
  @Input() avatar: string | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  get avatarUrl(): SafeUrl | null {
    if (!this.avatar) return null;
    return this.sanitizer.bypassSecurityTrustUrl(resolveAvatarUrl(this.avatar));
  }

  get points(): IViewCoordinates[] {
    if (this.geoList?.length) return this.geoList;
    return this.geo ? [this.geo] : [];
  }

  get mapLocation(): any {
    const pts = this.points;
    if (!pts.length) return null;

    if (pts.length === 1) {
      return { center: [pts[0].lng, pts[0].lat], zoom: 14 };
    }

    const lngs = pts.map(p => p.lng);
    const lats = pts.map(p => p.lat);
    const spread = Math.max(
      Math.max(...lngs) - Math.min(...lngs),
      Math.max(...lats) - Math.min(...lats)
    );
    const pad = Math.max(0.15, spread * 0.15);
    return {
      bounds: [
        [Math.min(...lngs) - pad, Math.min(...lats) - pad],
        [Math.max(...lngs) + pad, Math.max(...lats) + pad],
      ]
    };
  }
}
