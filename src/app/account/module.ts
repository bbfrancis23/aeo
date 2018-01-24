import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAccountVueComponent } from './core';
import { MilieuModule } from '../milieu/module';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

import { AccountMilieuComponent, ResetPasswordCompoent, AccountVueComponent  } from './core';
import { AccountServicesComponent} from './services.component';
import { EmailFormComponent, EmailInputComponent, UserNameFormComponent, UserNameInputComponent, PasswordInputComponent, UpdatePasswordForm } from './forms';

@NgModule({
  imports: [ CommonModule, RouterModule, MilieuModule, ReactiveFormsModule, ],
  declarations: [
    CreateAccountVueComponent,
    AccountVueComponent,
    AccountMilieuComponent,
    EmailInputComponent,
    PasswordInputComponent,
    UpdatePasswordForm,
    AccountServicesComponent,
    ResetPasswordCompoent,
    UserNameFormComponent,
    EmailFormComponent,
    UserNameInputComponent
  ],
  exports: [
    CreateAccountVueComponent,
    AccountVueComponent,
    AccountMilieuComponent,
    EmailInputComponent,
    PasswordInputComponent,
    UpdatePasswordForm,
    AccountServicesComponent,
    ResetPasswordCompoent,
    UserNameFormComponent,
    EmailFormComponent,
    UserNameInputComponent
  ]
})
export class AccountModule { }
