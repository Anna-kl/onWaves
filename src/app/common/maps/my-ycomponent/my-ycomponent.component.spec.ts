import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyYComponentComponent } from './my-ycomponent.component';

describe('MyYComponentComponent', () => {
  let component: MyYComponentComponent;
  let fixture: ComponentFixture<MyYComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyYComponentComponent]
    });
    fixture = TestBed.createComponent(MyYComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
