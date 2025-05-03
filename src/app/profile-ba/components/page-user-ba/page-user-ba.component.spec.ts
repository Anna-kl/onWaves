import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUserBAComponent } from './page-user-ba.component';

describe('PageUserBAComponent', () => {
  let component: PageUserBAComponent;
  let fixture: ComponentFixture<PageUserBAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageUserBAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageUserBAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
