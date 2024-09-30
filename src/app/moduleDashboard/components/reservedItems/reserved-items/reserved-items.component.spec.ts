import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedItemsComponent } from './reserved-items.component';

describe('ReservedItemsComponent', () => {
  let component: ReservedItemsComponent;
  let fixture: ComponentFixture<ReservedItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservedItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
