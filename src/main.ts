import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http';
import { TOKEN_PROVIDER } from './app/interceptors/token.interceptor';
import { ERROR_PROVIDER } from './app/interceptors/error.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule, BrowserModule, AppRoutingModule, HttpClientModule),
    TOKEN_PROVIDER,
    ERROR_PROVIDER
  ]
})
  .catch(err => console.error(err));
