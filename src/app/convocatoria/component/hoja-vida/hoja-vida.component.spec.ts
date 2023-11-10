import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HojaVidaComponent } from './hoja-vida.component';

describe('HojaVidaComponent', () => {
  let component: HojaVidaComponent;
  let fixture: ComponentFixture<HojaVidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HojaVidaComponent]
    });
    fixture = TestBed.createComponent(HojaVidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
