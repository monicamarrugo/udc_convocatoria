import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenciasResultadosComponent } from './competencias-resultados.component';

describe('CompetenciasResultadosComponent', () => {
  let component: CompetenciasResultadosComponent;
  let fixture: ComponentFixture<CompetenciasResultadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompetenciasResultadosComponent]
    });
    fixture = TestBed.createComponent(CompetenciasResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
