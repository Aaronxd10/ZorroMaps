import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from './environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    provideRouter(routes), 
    provideAnimationsAsync(), 
    provideAnimationsAsync(), 
    provideFirebaseApp(() => initializeApp({"projectId":"zorromaps-fa3e8",
    "appId":"1:710554476668:web:785b03b321989d4d03e9f9",
    "databaseURL":"https://zorromaps-fa3e8-default-rtdb.firebaseio.com",
    "storageBucket":"zorromaps-fa3e8.appspot.com",
    "apiKey":"AIzaSyDIomkPCKApaNwyvV5E3yKxejKpPKe7xRA",
    "authDomain":"zorromaps-fa3e8.firebaseapp.com",
    "messagingSenderId":"710554476668",
    "measurementId":"G-DFEE13KNQ0"})),
     provideAuth(() => getAuth())]
};
