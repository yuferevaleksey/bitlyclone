import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';

import { environment } from '../environments/environment';
import {
  ApiModule,
  Configuration,
  ConfigurationParameters,
} from '@bit-clone-app/api';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from '@bit-clone-app/common/lib/interceptors/jwt.interceptor';
import { ErrorInterceptor } from '@bit-clone-app/common/lib/interceptors/error.interceptor';
import { AppStoreModule } from '@bit-clone-app/common/lib/modules/app-store/app-store.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    basePath: environment.basePath,
    withCredentials: true,
  };
  return new Configuration(params);
}

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    ApiModule.forRoot(apiConfigFactory),
    HttpClientModule,
    AppRoutingModule,
    AppStoreModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  exports: [AppRoutingModule],
})
export class AppModule {}
