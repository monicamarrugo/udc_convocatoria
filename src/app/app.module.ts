import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './utility/components/main/main.component';
import { InicioComponent } from './inicio/inicio.component';
import { ConfirmacionComponent } from './widgets/confirmacion/confirmacion.component';
import { MaterialModule } from '../app/modules/material.module';
import { CustomModalComponent } from './widgets/custom-modal/custom-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { DescargasComponent } from './descargas/descargas.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    InicioComponent,
    ConfirmacionComponent,
    CustomModalComponent,
    LoginComponent,
    DescargasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
