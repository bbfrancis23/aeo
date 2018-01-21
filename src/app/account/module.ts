import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAccountVueComponent } from './create-account-vue.component';
import { MilieuModule } from '../milieu/module';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

import { AccountMilieuComponent, EmailInputComponent, PasswordInputComponent, UpdatePasswordForm  } from './core';
import { AccountResetCompoent} from './core';
import { AccountVueComponent } from './account-vue.component'
import { AccountServicesComponent} from './services.component';

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
    AccountResetCompoent
  ],
  exports: [
    CreateAccountVueComponent,
    AccountVueComponent,
    AccountMilieuComponent,
    EmailInputComponent,
    PasswordInputComponent,
    UpdatePasswordForm,
    AccountServicesComponent,
    AccountResetCompoent
  ]
})
export class AccountModule { }
