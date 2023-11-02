import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { BrowserModule, bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http';
import { TOKEN_PROVIDER } from './app/interceptors/token.interceptor';
import { ERROR_PROVIDER } from './app/interceptors/error.interceptor';
import { NOTYF, notyfFactory } from './shared/utils/notyf.token';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserAnimationsModule, 
      BrowserModule, 
      HttpClientModule,
      NgxSkeletonLoaderModule.forRoot({ animation: 'pulse' }),
      ),
      provideRouter(routes),
      provideClientHydration(),
    { provide: NOTYF, useFactory: notyfFactory },
    TOKEN_PROVIDER,
    ERROR_PROVIDER
  ]
})
  .catch(err => console.error(err));
