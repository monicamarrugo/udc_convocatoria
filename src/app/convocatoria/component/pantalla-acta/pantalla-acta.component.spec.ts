import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaActaComponent } from './pantalla-acta.component';

describe('PantallaActaComponent', () => {
  let component: PantallaActaComponent;
  let fixture: ComponentFixture<PantallaActaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PantallaActaComponent]
    });
    fixture = TestBed.createComponent(PantallaActaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
