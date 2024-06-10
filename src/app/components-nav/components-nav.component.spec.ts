import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsNavComponent } from './components-nav.component';

describe('ComponentsNavComponent', () => {
  let component: ComponentsNavComponent;
  let fixture: ComponentFixture<ComponentsNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentsNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComponentsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
