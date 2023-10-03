import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { RegistrationComponent } from './components/registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { Inject } from '@angular/core';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { ProfileComponent } from './components/profile/profile.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { MyApiService } from './services/my-api.service';
import { AcountComponent } from './components/acount/acount.component';
import { CkrequestComponent } from './components/ckrequest/ckrequest.component';
import { MatIconModule } from '@angular/material/icon';
import { TrnsdialogComponent } from './components/trnsdialog/trnsdialog.component';
import { TranshistoryComponent } from './components/transhistory/transhistory.component';
import { UsertransectionComponent } from './components/usertransection/usertransection.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistrationComponent,
    DashboardComponent,
    HeaderComponent,
    ProfileComponent,
    EditDialogComponent,
    AcountComponent,
    CkrequestComponent,
    TrnsdialogComponent,
    TranshistoryComponent,
    UsertransectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatIconModule,
  ],
  providers: [UserService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
