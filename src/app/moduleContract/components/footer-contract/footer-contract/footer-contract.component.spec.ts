import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterContractComponent } from './footer-contract.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('FooterContractComponent', () => {
  let component: FooterContractComponent;
  let fixture: ComponentFixture<FooterContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterContractComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
