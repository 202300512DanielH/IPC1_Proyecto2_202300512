import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SigInComponent } from './components/sig-in/sig-in.component';
import { HomeUserComponent } from './components/home-user/home-user.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component:LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'sigIn', component: SigInComponent },
  { path: 'user/home', component: HomeUserComponent },
  { path: 'admin/home', component: HomeAdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
