import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSPAComponent } from './page-spa.component';

describe('PageSPAComponent', () => {
  let component: PageSPAComponent;
  let fixture: ComponentFixture<PageSPAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageSPAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageSPAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
