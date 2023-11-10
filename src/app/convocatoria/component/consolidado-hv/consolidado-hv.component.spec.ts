import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidadoHvComponent } from './consolidado-hv.component';

describe('ConsolidadoHvComponent', () => {
  let component: ConsolidadoHvComponent;
  let fixture: ComponentFixture<ConsolidadoHvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsolidadoHvComponent]
    });
    fixture = TestBed.createComponent(ConsolidadoHvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
