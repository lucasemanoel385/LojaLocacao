import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterContractComponent } from './register-contract.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('RegisterContractComponent', () => {
  let component: RegisterContractComponent;
  let fixture: ComponentFixture<RegisterContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterContractComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
