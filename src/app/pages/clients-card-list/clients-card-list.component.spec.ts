import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsCardListComponent } from './clients-card-list.component';

describe('ClientsCardListComponent', () => {
  let component: ClientsCardListComponent;
  let fixture: ComponentFixture<ClientsCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsCardListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
