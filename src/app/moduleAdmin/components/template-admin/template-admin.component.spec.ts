import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateAdminComponent } from './template-admin.component';

describe('TemplateAdminComponent', () => {
  let component: TemplateAdminComponent;
  let fixture: ComponentFixture<TemplateAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplateAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
