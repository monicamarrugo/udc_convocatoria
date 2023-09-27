import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroParticipanteComponent } from './component/registro-participante/registro-participante.component';
import { ArchivosParticipanteComponent } from './component/archivos-participante/archivos-participante.component';
import {PantallaActaComponent } from './component/pantalla-acta/pantalla-acta.component';
import {RequisitosMinimosComponent} from './component/requisitos-minimos/requisitos-minimos.component';
import {AuthorizatedGuard} from '../core/guard/authorizated.guard';

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
            path: 'reporte/:codigoInscripicion',
            component: PantallaActaComponent,
            canActivate: [AuthorizatedGuard],
            data: {
                  title: 'Reporte Requisitos',
                }
          }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConvocatoriaRoutingModule { }