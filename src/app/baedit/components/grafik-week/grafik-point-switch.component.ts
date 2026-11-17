import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { WorkLocationType } from '../../../DTO/enums/workLocationType';
import { fixedPointLine, fixedPointsOf, workLocationTypesOf } from '../../../../helpers/common/address';
import { ProfileService } from '../../../../services/profile.service';

/** `profile` в query — график выезда и онлайна, без pointId. */
export function schedulePointId(raw: string | null | undefined): string | null {
  const value = `${raw ?? ''}`.trim();
  if (!value || value === 'profile') return null;
  return value;
}

interface PointTarget {
  id: string;
  label: string;
}

/**
 * Переключатель графика по точке. Одна точка подставляется сама.
 * «Выезд и онлайн» появляется, только если эти форматы есть рядом с точкой.
 */
@Component({
  selector: 'app-grafik-point-switch',
  templateUrl: './grafik-point-switch.component.html',
  styleUrls: ['./grafik-schedule.scss'],
})
export class GrafikPointSwitchComponent implements OnChanges {
  @Input() profileId = '';
  @Input() disabled = false;
  targets: PointTarget[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profiles: ProfileService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.profileId) return;
    if (!changes['profileId']) {
      if (!this.disabled) this.selectDefault();
      return;
    }
    const profileId = this.profileId;
    this.profiles.getWorkLocation(this.profileId).pipe(take(1)).subscribe({
      next: result => {
        if (profileId !== this.profileId) return;
        const data = result?.code === 200 ? result.data : null;
        const points = fixedPointsOf(data).filter(point => !!point.id);
        const types = workLocationTypesOf(data);
        const roaming = types.includes(WorkLocationType.Mobile) || types.includes(WorkLocationType.Online);
        this.targets = points.map(point => ({
          id: point.id as string,
          label: fixedPointLine(point) || 'Точка',
        }));
        if (roaming && this.targets.length) {
          this.targets.push({ id: '', label: 'Выезд и онлайн' });
        }
        this.selectDefault();
      },
      error: () => {
        this.targets = [];
      },
    });
  }

  private selectDefault(): void {
    if (!this.route.snapshot.queryParamMap.get('point') && this.targets[0]?.id) {
      this.pick(this.targets[0].id);
    }
  }

  on(target: PointTarget): boolean {
    const current = this.route.snapshot.queryParamMap.get('point') ?? '';
    if (!target.id) return current === 'profile';
    return current === target.id;
  }

  pick(id: string): void {
    if (this.disabled) return;
    const point = id || 'profile';
    if ((this.route.snapshot.queryParamMap.get('point') ?? '') === point) return;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { point },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
