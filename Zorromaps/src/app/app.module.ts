import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';


@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    CrearCuentaComponent,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [],
})
export class AppModule { }