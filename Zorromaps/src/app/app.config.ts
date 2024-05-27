import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from './environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    provideRouter(routes), provideAnimationsAsync(), provideAnimationsAsync()]
};
