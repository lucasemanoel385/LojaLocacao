import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowSelectComponent } from './arrow-select.component';

describe('ArrowSelectComponent', () => {
  let component: ArrowSelectComponent;
  let fixture: ComponentFixture<ArrowSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrowSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrowSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
