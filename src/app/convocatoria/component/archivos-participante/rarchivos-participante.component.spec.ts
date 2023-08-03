import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivosParticipanteComponent } from './archivos-participante.component';

describe('ArchivosParticipanteComponent', () => {
  let component: ArchivosParticipanteComponent;
  let fixture: ComponentFixture<ArchivosParticipanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchivosParticipanteComponent]
    });
    fixture = TestBed.createComponent(ArchivosParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
