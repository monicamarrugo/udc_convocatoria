import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitosMinimosComponent } from './requisitos-minimos.component';

describe('RequisitosMinimosComponent', () => {
  let component: RequisitosMinimosComponent;
  let fixture: ComponentFixture<RequisitosMinimosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequisitosMinimosComponent]
    });
    fixture = TestBed.createComponent(RequisitosMinimosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
