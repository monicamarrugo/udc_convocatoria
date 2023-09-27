import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConvocatoriaModule } from '../app/convocatoria/convocatoria.module';
import { MainComponent } from './utility/components/main/main.component';
import {InicioComponent} from './inicio/inicio.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: '/login',
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
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
