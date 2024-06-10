import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegisterClientComponent } from './form-register-client.component';

describe('FormRegisterClientComponent', () => {
  let component: FormRegisterClientComponent;
  let fixture: ComponentFixture<FormRegisterClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRegisterClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormRegisterClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
