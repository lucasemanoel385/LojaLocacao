import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTableLayoutComponent } from './list-table-layout.component';

describe('ListTableLayoutComponent', () => {
  let component: ListTableLayoutComponent;
  let fixture: ComponentFixture<ListTableLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTableLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListTableLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
