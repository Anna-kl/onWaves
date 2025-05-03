import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpQuestionsAnswerComponent } from './help-questions-answer.component';

describe('HelpQuestionsAnswerComponent', () => {
  let component: HelpQuestionsAnswerComponent;
  let fixture: ComponentFixture<HelpQuestionsAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpQuestionsAnswerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpQuestionsAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
