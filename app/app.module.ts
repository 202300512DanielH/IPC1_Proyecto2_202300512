import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SigInComponent } from './components/sig-in/sig-in.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HomeUserComponent } from './components/home-user/home-user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigInComponent,
    HomeComponent,
    HomeUserComponent,
    NavbarComponent,
    HomeAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
