import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderContractComponent } from './header-contract.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

describe('HeaderContractComponent', () => {
  let component: HeaderContractComponent;
  let fixture: ComponentFixture<HeaderContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderContractComponent, ReactiveFormsModule, FormsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
