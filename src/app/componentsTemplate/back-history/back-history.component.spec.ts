import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackHistoryComponent } from './back-history.component';

describe('BackHistoryComponent', () => {
  let component: BackHistoryComponent;
  let fixture: ComponentFixture<BackHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
