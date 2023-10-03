import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { loginGaurd } from './gaurds/loginauth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { AcountComponent } from './components/acount/acount.component';
import { CkrequestComponent } from './components/ckrequest/ckrequest.component';
import { UsertransectionComponent } from './components/usertransection/usertransection.component';

const routes: Routes = [
  {path: '',  component:LoginComponent},
  { path:'login', component:LoginComponent},
  {path:'register',component:RegistrationComponent},
  {path:'dashboard',component:DashboardComponent,  children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'ckrequest', component: CkrequestComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'home', component: HomeComponent },
    { path: 'acount', component: AcountComponent },
    { path: 'Utransection', component: UsertransectionComponent }
  ],canActivate:[loginGaurd]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
