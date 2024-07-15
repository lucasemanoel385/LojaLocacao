import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackHistoryButtonComponent } from './back-history-button.component';

describe('BackHistoryButtonComponent', () => {
  let component: BackHistoryButtonComponent;
  let fixture: ComponentFixture<BackHistoryButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackHistoryButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackHistoryButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
