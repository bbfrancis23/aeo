import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAccountVueComponent } from './core';
import { MilieuModule } from '../milieu/module';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

import { AccountMilieuComponent, AccountResetVueComponent, LogInVueComponent, ResetPasswordVueCompoent, AccountVueComponent, } from './core';
import { AccountServicesComponent} from './services.component';
import { EmailFormComponent,   UserNameFormComponent,  UpdatePasswordForm } from './forms';
import { EmailInputComponent, UserNameInputComponent, PasswordInputComponent,} from './input-fields';

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
    ResetPasswordVueCompoent,
    UserNameFormComponent,
    EmailFormComponent,
    UserNameInputComponent,
    AccountResetVueComponent,
    LogInVueComponent

  ],
  exports: [
    CreateAccountVueComponent,
    AccountVueComponent,
    AccountMilieuComponent,
    EmailInputComponent,
    PasswordInputComponent,
    UpdatePasswordForm,
    AccountServicesComponent,
    ResetPasswordVueCompoent,
    UserNameFormComponent,
    EmailFormComponent,
    UserNameInputComponent,
    AccountResetVueComponent,
    LogInVueComponent
  ]
})
export class AccountModule { }
