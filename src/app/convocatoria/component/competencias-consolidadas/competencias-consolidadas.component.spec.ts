import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenciasConsolidadasComponent } from './competencias-consolidadas.component';

describe('CompetenciasConsolidadasComponent', () => {
  let component: CompetenciasConsolidadasComponent;
  let fixture: ComponentFixture<CompetenciasConsolidadasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompetenciasConsolidadasComponent]
    });
    fixture = TestBed.createComponent(CompetenciasConsolidadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
