import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroParticipanteComponent } from './component/registro-participante/registro-participante.component';
import { ArchivosParticipanteComponent } from './component/archivos-participante/archivos-participante.component';
import { ConvocatoriaRoutingModule } from './convocatoria.routing';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../modules/material.module';
import { RequisitosMinimosComponent } from './component/requisitos-minimos/requisitos-minimos.component';
import { CheckRequisitosComponent } from './component/check-requisitos/check-requisitos.component';
import {AuthorizatedGuard} from '../core/guard/authorizated.guard';
import { PantallaActaComponent } from './component/pantalla-acta/pantalla-acta.component';
import { HojaVidaComponent } from './component/hoja-vida/hoja-vida.component';
import { ConsolidadoHvComponent } from './component/consolidado-hv/consolidado-hv.component';


@NgModule({
  declarations: [
    RegistroParticipanteComponent,
    ArchivosParticipanteComponent,
    RequisitosMinimosComponent,
    CheckRequisitosComponent,
    PantallaActaComponent,
    HojaVidaComponent,
    ConsolidadoHvComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ConvocatoriaRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    
  ],
  providers: [AuthorizatedGuard],
})
export class ConvocatoriaModule { }
