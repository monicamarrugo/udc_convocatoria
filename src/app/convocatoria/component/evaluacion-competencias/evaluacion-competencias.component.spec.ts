import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionCompetenciasComponent } from './evaluacion-competencias.component';

describe('EvaluacionCompetenciasComponent', () => {
  let component: EvaluacionCompetenciasComponent;
  let fixture: ComponentFixture<EvaluacionCompetenciasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluacionCompetenciasComponent]
    });
    fixture = TestBed.createComponent(EvaluacionCompetenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
