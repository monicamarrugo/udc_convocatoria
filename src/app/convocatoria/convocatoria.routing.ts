import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroParticipanteComponent } from './component/registro-participante/registro-participante.component';
import { ArchivosParticipanteComponent } from './component/archivos-participante/archivos-participante.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConvocatoriaRoutingModule { }