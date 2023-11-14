import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroParticipanteComponent } from './component/registro-participante/registro-participante.component';
import { ArchivosParticipanteComponent } from './component/archivos-participante/archivos-participante.component';
import {PantallaActaComponent } from './component/pantalla-acta/pantalla-acta.component';
import {RequisitosMinimosComponent} from './component/requisitos-minimos/requisitos-minimos.component';
import {AuthorizatedGuard} from '../core/guard/authorizated.guard';
import { HojaVidaComponent } from './component/hoja-vida/hoja-vida.component';
import { EvaluacionCompetenciasComponent } from './component/evaluacion-competencias/evaluacion-competencias.component';

const routes: Routes = [
  {
    path: 'participante',
    component: RegistroParticipanteComponent,
   
    data: {
          title: 'Registro Participante',
        }
  },
    {
        path: 'documentos',
        component: ArchivosParticipanteComponent,
        data: {
              title: 'Registro Documentos',
            }
      }
    ,
    {
        path: 'requisitos',
        component: RequisitosMinimosComponent,
        canActivate: [AuthorizatedGuard],
        data: {
              title: 'Requisitos Minimos',
            }
    },
    {
        path: 'reporte',
        component: PantallaActaComponent,
        data: {
              title: 'Reporte Requisitos',
            }
    },
    {
        path: 'hojavida',
        component: HojaVidaComponent,
        data: {
              title: 'Requisitos Minimos',
            }
    },
    {
        path: 'competencias',
        component: EvaluacionCompetenciasComponent,
        canActivate: [AuthorizatedGuard],
        data: {
              title: 'Evaluación Competencias',
            }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConvocatoriaRoutingModule { }