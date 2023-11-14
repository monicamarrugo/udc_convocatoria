import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatoCompetenciasComponent } from './formato-competencias.component';

describe('FormatoCompetenciasComponent', () => {
  let component: FormatoCompetenciasComponent;
  let fixture: ComponentFixture<FormatoCompetenciasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormatoCompetenciasComponent]
    });
    fixture = TestBed.createComponent(FormatoCompetenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
