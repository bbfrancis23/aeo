import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAccountVueComponent } from './create-account-vue.component';
import { MilieuModule } from '../milieu/module';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

import { AccountMilieuComponent, EmailInputComponent, PasswordInputComponent, UpdatePasswordForm  } from './core';
import { AccountResetCompoent} from './core';
import { AccountVueComponent } from './core'
import { AccountServicesComponent} from './services.component';
import { EmailFormComponent, UserNameFormComponent } from './forms';

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
    AccountResetCompoent,
    UserNameFormComponent,
    EmailFormComponent
  ],
  exports: [
    CreateAccountVueComponent,
    AccountVueComponent,
    AccountMilieuComponent,
    EmailInputComponent,
    PasswordInputComponent,
    UpdatePasswordForm,
    AccountServicesComponent,
    AccountResetCompoent,
    UserNameFormComponent,
    EmailFormComponent
  ]
})
export class AccountModule { }
