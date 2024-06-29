import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractPdfComponent } from './contract-pdf.component';

describe('ContractPdfComponent', () => {
  let component: ContractPdfComponent;
  let fixture: ComponentFixture<ContractPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractPdfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
