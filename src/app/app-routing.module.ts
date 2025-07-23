import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConvocatoriaModule } from '../app/convocatoria/convocatoria.module';
import { MainComponent } from './utility/components/main/main.component';
import {InicioComponent} from './inicio/inicio.component';
import {LoginComponent} from './login/login.component';
import { DescargasComponent } from './descargas/descargas.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  {
     path: 'convocatoria',
     component: MainComponent,
     loadChildren: () => ConvocatoriaModule
  },
  {
    path: 'inicio',
    component: InicioComponent,
    data:{ title: 'Inicio Convocatoria'}
  },
  {
    path: 'login',
    component: LoginComponent,
    data:{ title: 'Login Convocatoria'}
  },
  {
    path: 'documentos',
    component: DescargasComponent,
    data:{ title: 'Descargas Convocatoria'}
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
