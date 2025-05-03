import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupServiceComponent } from './group-service.component';

describe('GroupServiceComponent', () => {
  let component: GroupServiceComponent;
  let fixture: ComponentFixture<GroupServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
