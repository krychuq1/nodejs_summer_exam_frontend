import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import {routing} from '../Routing';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {
  MatFormFieldModule, MatListModule,
  MatInputModule, MatCardModule, MatButtonModule,
  MatDialogModule, MatProgressSpinnerModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import {AuthGuard} from './auth-guard';
import { SignupComponent } from './pages/signup/signup.component';
import {SignupService} from './pages/signup/signup.service';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { RecaptchaModule } from 'ng-recaptcha';
import {HeaderComponent} from './components/header/header.component';
import {LoginService} from './services/login.service';
import {UserService} from './services/user.service';
import {CreateTaskComponent} from './pages/create-task/create-task.component';
import {TaskService} from './services/task.service';
import {ShareTaskComponent} from './pages/share-task/share-task.component';
import {ShareTaskService} from './services/shareTask.service';
import {ImageUploadModule} from 'angular2-image-upload';
import {ProfileComponent} from './pages/profile/profile.component';
import {AdminComponent} from './pages/admin/admin.component';
import {UsersService} from './services/users.service';
import {UpdateComponent} from './pages/update/update.component';
import { SafePipe } from './safe.pipe';
import {ChatComponent} from './components/chat-window/chat.component';
import {NgxAutoScrollModule} from 'ngx-auto-scroll';
import {ToastrModule} from 'ngx-toastr';
import {ResetPasswordComponent} from './pages/reset-password/reset-password';
import {ResetPasswordService} from './services/reset-password.service';
import {ForgotService} from './services/forgot.service';
import {ChatSideComponent} from './components/chat-side/chat-side';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    ForgotComponent,
    ResetPasswordComponent,
    HeaderComponent,
    CreateTaskComponent,
    ShareTaskComponent,
    ProfileComponent,
    AdminComponent,
    SafePipe,
    UpdateComponent,
    ChatComponent,
    ChatSideComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ImageUploadModule.forRoot(),
    RecaptchaModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatButtonModule,
    routing,
    MatDialogModule,
    NgxAutoScrollModule

  ],
  providers: [LoginService, SignupService, ForgotService, ResetPasswordService,
    AuthGuard, UserService, TaskService, ShareTaskService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
