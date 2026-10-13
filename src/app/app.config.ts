import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withHashLocation } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // withHashLocation: rutas con "#/" para que funcionen en GitHub Pages sin configurar el servidor.
    provideRouter(routes, withHashLocation(), withComponentInputBinding()),
    provideHttpClient(),
  ],
};
