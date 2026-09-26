import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LandingTemplateType } from '../../../DTO/enums/landingTemplateType';
import { PromoDraftService } from '../../services/promo-draft.service';
import { PROMO_TEMPLATES, PromoTemplateDef } from './promo-templates';

@Component({
  selector: 'app-promo-template',
  templateUrl: './promo-template.component.html',
  styleUrls: ['./promo-template.component.scss'],
})
export class PromoTemplateComponent implements OnInit {
  templates = PROMO_TEMPLATES;
  selected: LandingTemplateType | null = null;

  constructor(
    private readonly draft: PromoDraftService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.selected = this.draft.templateType;
  }

  pick(template: PromoTemplateDef): void {
    this.selected = template.type;
  }

  back(): void {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  continue(): void {
    if (this.selected == null) {
      return;
    }
    this.draft.startCreate(this.selected, this.profileId());
    this.router.navigate(['../edit'], { relativeTo: this.route });
  }

  isSelected(template: PromoTemplateDef): boolean {
    return this.selected === template.type;
  }

  shapeClass(template: PromoTemplateDef): string {
    return `promo-mock promo-mock--${template.fields.imageShape}`;
  }

  private profileId(): string | null {
    return this.route.snapshot.pathFromRoot
      .map(item => item.paramMap.get('id'))
      .find((id): id is string => !!id) ?? null;
  }
}
