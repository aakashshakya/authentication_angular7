import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AlertComponent } from './_components/alert/alert.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppInterceptorService } from './_helpers/app-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers';
import { fakeBackendProvider } from './_helpers/fake-backend';
import { UserupdateComponent } from './userupdate/userupdate.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    UserupdateComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
    provide:HTTP_INTERCEPTORS,
    useClass:AppInterceptorService,
    multi: true
  },
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // // provider used to create fake backend
        // fakeBackendProvider
],
  bootstrap: [AppComponent]
})
export class AppModule { }
