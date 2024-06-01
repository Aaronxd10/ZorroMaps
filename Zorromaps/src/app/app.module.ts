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
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from './environments/environment';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { withNoHttpTransferCache } from '@angular/platform-browser';
import { SpinnerComponent } from '@coreui/angular';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';




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
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializa Firebase con la configuración
    AngularFireDatabaseModule, // Importa el módulo de base de datos
    AngularFirestoreModule,
    SpinnerComponent,
    MatIconModule,
    FormsModule,
    

  ],
  exports: [],
  providers: [
    {provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    provideRouter(routes), 
    provideAnimationsAsync(), 
    provideFirebaseApp(() => initializeApp({"projectId":"zorromaps-fa3e8",
    "appId":"1:710554476668:web:785b03b321989d4d03e9f9",
    "databaseURL":"https://zorromaps-fa3e8-default-rtdb.firebaseio.com",
    "storageBucket":"zorromaps-fa3e8.appspot.com",
    "apiKey":"AIzaSyDIomkPCKApaNwyvV5E3yKxejKpPKe7xRA",
    "authDomain":"zorromaps-fa3e8.firebaseapp.com",
    "messagingSenderId":"710554476668",
    "measurementId":"G-DFEE13KNQ0"})),
     provideAuth(() => getAuth())],
})
export class AppModule { }
