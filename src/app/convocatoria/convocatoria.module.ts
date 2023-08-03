import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroParticipanteComponent } from './component/registro-participante/registro-participante.component';
import { ConvocatoriaRoutingModule } from './convocatoria.routing';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RegistroParticipanteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ConvocatoriaRoutingModule,
    ReactiveFormsModule
    
  ]
})
export class ConvocatoriaModule { }
