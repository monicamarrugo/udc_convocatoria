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
import { EvaluacionCompetenciasComponent } from './component/evaluacion-competencias/evaluacion-competencias.component';
import { FormatoCompetenciasComponent } from './component/formato-competencias/formato-competencias.component';
import { CompetenciasConsolidadasComponent } from './component/competencias-consolidadas/competencias-consolidadas.component';
import { CompetenciasResultadosComponent } from './component/competencias-resultados/competencias-resultados.component';
import { NoPasteDirective } from '../utility/directives/no-paste.directive';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UploadFileDialogComponent } from './component/upload-file-dialog/upload-file-dialog.component';


@NgModule({
  declarations: [
    RegistroParticipanteComponent,
    ArchivosParticipanteComponent,
    RequisitosMinimosComponent,
    CheckRequisitosComponent,
    PantallaActaComponent,
    HojaVidaComponent,
    ConsolidadoHvComponent,
    EvaluacionCompetenciasComponent,
    FormatoCompetenciasComponent,
    CompetenciasConsolidadasComponent,
    CompetenciasResultadosComponent,
    NoPasteDirective,
    UploadFileDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ConvocatoriaRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    MatFormFieldModule,
    MatInputModule,
    
  ],
  providers: [AuthorizatedGuard],
})
export class ConvocatoriaModule { }
