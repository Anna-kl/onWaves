import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiceOplataModalComponent } from './create-service-oplata-modal.component';

describe('CreateServiceOplataModalComponent', () => {
  let component: CreateServiceOplataModalComponent;
  let fixture: ComponentFixture<CreateServiceOplataModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateServiceOplataModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateServiceOplataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
