import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckRequisitosComponent } from './check-requisitos.component';

describe('CheckRequisitosComponent', () => {
  let component: CheckRequisitosComponent;
  let fixture: ComponentFixture<CheckRequisitosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckRequisitosComponent]
    });
    fixture = TestBed.createComponent(CheckRequisitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
