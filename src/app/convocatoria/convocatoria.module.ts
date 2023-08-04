import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroParticipanteComponent } from './component/registro-participante/registro-participante.component';
import { ArchivosParticipanteComponent } from './component/archivos-participante/archivos-participante.component';
import { ConvocatoriaRoutingModule } from './convocatoria.routing';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../modules/material.module';


@NgModule({
  declarations: [
    RegistroParticipanteComponent,
    ArchivosParticipanteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ConvocatoriaRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    
  ]
})
export class ConvocatoriaModule { }
