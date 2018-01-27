import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AccountMilieuComponent, AccountResetVueComponent, CreateAccountVueComponent, LogInVueComponent, ResetPasswordVueCompoent, AccountVueComponent, } from './core';
import { EmailFormComponent,   UserNameFormComponent,  PasswordFormComponent } from './forms';
import { EmailInputComponent, UserNameInputComponent, PasswordInputComponent,} from './input-fields';
import { AccountServicesComponent} from './services.component';

import { MilieuModule } from '../milieu/module';


@NgModule({
  imports: [ CommonModule, RouterModule, MilieuModule, ReactiveFormsModule, ],
  declarations: [ AccountVueComponent, AccountResetVueComponent, AccountServicesComponent, AccountMilieuComponent,
                  CreateAccountVueComponent,
                  EmailFormComponent, EmailInputComponent,
                  LogInVueComponent,
                  PasswordInputComponent, PasswordFormComponent,
                  ResetPasswordVueCompoent,
                  UserNameFormComponent, UserNameInputComponent
  ],
  exports:[ AccountVueComponent, AccountResetVueComponent, AccountServicesComponent, AccountMilieuComponent,
                  CreateAccountVueComponent,
                  EmailFormComponent, EmailInputComponent,
                  LogInVueComponent,
                  PasswordInputComponent, PasswordFormComponent,
                  ResetPasswordVueCompoent,
                  UserNameFormComponent, UserNameInputComponent
  ]
})
export class AccountModule { }
