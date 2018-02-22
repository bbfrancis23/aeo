import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { AccountService } from './data';

import { MilieuFieldForm, MilieuFormGroup, MilieuVue } from '../milieu/core';

'use strict';

/* ABSTRACT ************************************************************************************************************************************************************************************************/

/* ACCOUNT FORM VUE ************************************************************/

export abstract class AccountFormVue extends MilieuVue {

  uniqueUser: boolean = null;
  uniqueEmail: boolean = null;
  accountCreated: boolean = null;
  submitted = false;
  mailsent: boolean = null;
  message = "";
  processing = false;
  loggedIn: boolean = null;

  form = new MilieuFormGroup({});

  @Input() accountService: AccountService;

  constructor(accountService: AccountService) { super(accountService) }

  get username() { return this.form.get('username') }
  get email() { return this.form.get('email') }

  checkUniqueUserName() {

    this.processing = true;

    this.accountService.uniqueUserName(this.username.value).then((data) => {

      this.processing = false;
      this.uniqueUser = data;
    });
  }

  checkUniqueEmail() {

    if (this.email.value && this.email.valid) {

      this.processing = true;

      this.accountService.uniqueEmail(this.email.value).then(unique => {

        this.processing = false;
        this.uniqueEmail = unique;
      });
    }
  }

  createAccount() {

    this.accountService.createItem(this.form.value).then((data) => {

      this.accountCreated = data.created;
      this.message = data.message;
      window.location.reload();
    });
  }

  logIn() {

    this.accountService.login(this.form.value).then((data) => {

      this.message = data;
      this.loggedIn = data.login;
      this.message = data.message;
    });
  }

  resetPassword() {

    this.submitted = true;

    this.accountService.resetPassword(this.form.get('email').value).then(mailsent => {

      this.mailsent = mailsent;
      this.submitted = false;
    });
  }
}

/* COMPONENTS **********************************************************************************************************************************************************************************************/

/* EMAIL FORM ******************************************************************/

@Component({
  selector: 'email-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" *ngIf="!submitted">
      <div class="input-group">
        <input class="form-control" [autofocus]="true" (keypress)="focus ='email'" formControlName="email" tabindex="1" placeholder="Email" required>
        <button class="btn btn-outline-secondary material-icons" (click)="email.reset()" type="button" title="Clear Email" tabindex="2" *ngIf="focus==='email'">clear</button>
        <button class="btn material-icons submit-check-button"
                [ngClass]="{'btn-outline-primary': !valid, 'btn-primary': valid}" [disabled]="!valid"
                title="Submit Email" tabindex="3" *ngIf="focus==='email'">done</button>
      </div>
    </form>
    <div class="alert alert-danger" *ngIf="email.invalid && email.touched">
      <aside *ngIf="errors.required">Email is required.</aside>
      <aside *ngIf="minLengthError">Email min {{minLengthError.requiredLength}} characters.<br>You have {{minLengthError.actualLength}}.</aside>
      <aside *ngIf="maxLengthError">Email max {{maxLengthError.requiredLength}} characters.<br>You have {{maxLengthError.actualLength}}.</aside>
      <aside *ngIf="errors.email">Must be valid Email.<br>e.g. - name@mail.com</aside>
    </div>
    <div class="alert" [ngClass]="{'alert-success': updated, 'alert-danger': !updated}" *ngIf="message" >{{message}}</div>
    <div *ngIf="uniqueEmail===false && email.touched"><div class="alert alert-danger">Email is already Taken.</div></div>`
})
export class EmailFormComponent extends MilieuFieldForm {

  uniqueEmail: boolean = null;

  focus = this.form.focus;
  get email() { return this.form.get('email') }
  get errors() { return this.email.errors }
  get valid() { return this.form.valid }
  get minLengthError() { return this.errors.minlength }
  get maxLengthError() { return this.errors.maxlength }

  constructor(public accountService: AccountService) {
    super(accountService);
    let em = this.accountService.email;
    this.form.addControl('email', new FormControl('', [Validators.required, Validators.minLength(em.min), Validators.maxLength(em.max), Validators.email]));
  }

  checkUniqueEmail() {
    return this.accountService.uniqueEmail(this.email.value).then(data => {
      this.uniqueEmail = data;
      return data;
    });
  }

  submit() {
    this.checkUniqueEmail().then(data => {

      if (data) {

        this.accountService.updateEmail(this.email.value).then(
          updateData => {

            if (updateData.update) {

              this.message = updateData.message;
              this.updated = updateData.update;

              setTimeout(() => { window.location.reload() }, 3000);
            }
          }
        );
      }
    }).catch(err => { console.log(err) });
  }

}

/* PASSWORD FORM ***************************************************************/

@Component({

  selector: 'password-form',

  host: { '( document:keypress )': 'handleKeyboardEvent( $event )' },

  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" *ngIf="!submitted">
      <div class="input-group">
        <input  class="form-control"
                [type]="inputType"
                (keypress)="focus='password'"
                formControlName="password" autocorrect="off" autocomplete="off" tabindex="1" placeholder="New Password" required >
        <button class="btn btn-outline-secondary material-icons"
                (mousedown)="inputType='text'" (mouseup)="inputType='password'" (mouseout)="inputType='password'"
                type="button" title="Show Password" tabindex="2"
                *ngIf="focus==='password'" >
          visibility
        </button>
        <button class="btn btn-outline-secondary material-icons" (click)="password.reset()" type="button" title="Clear Password" tabindex="3" *ngIf="focus==='password'">clear</button>
        <button class="btn material-icons submit-check-button"
                [ngClass]="{'btn-outline-primary': !valid, 'btn-primary': valid}" [disabled]="!valid"
                title="Update Password" tabindex="4"
                *ngIf="focus==='password'" >
          done
        </button>
      </div>
    </form>
    <div class="alert alert-warning" *ngIf="caps">CAPS IS ON</div>
    <div class="alert alert-danger" *ngIf="password.invalid && password.touched">
      <aside *ngIf="errors.required">Password is required.</aside>
      <aside *ngIf="minLengthError">Password min {{minLengthError.requiredLength}} characters.<br>You have {{minLengthError.actualLength}}.</aside>
      <aside *ngIf="maxLengthError">Password max {{maxLengthError.requiredLength}} characters.<br>You have {{maxLengthError.actualLength}}.</aside>
      <aside *ngIf="errors.pattern">Space characters are invalid for Passwords.</aside>
    </div>
    <div class="alert" [ngClass]="{'alert-success': passwordUpdated, 'alert-danger': !passwordUpdated}" *ngIf="message" >{{message}}</div>`
})
export class PasswordFormComponent extends MilieuFieldForm {

  caps = false;
  inputType = 'password';

  @Input() resetToken: string = null;

  get password() { return this.form.get('password') }
  get errors() { return this.password.errors }
  focus = this.form.focus;
  get valid() { return this.form.valid }
  get minLengthError() { return this.errors.minlength }
  get maxLengthError() { return this.errors.maxlength }

  constructor(public accountService: AccountService) {
    super(accountService);
    let pw = this.accountService.password;
    this.form.addControl('password', new FormControl('', [Validators.required, Validators.minLength(pw.min), Validators.maxLength(pw.max), Validators.pattern(pw.pattern)]));
  }

  handleKeyboardEvent(event: KeyboardEvent) { if (this.focus === 'password') this.caps = event.getModifierState('CapsLock') }

  submit() {
    this.submitted = true;
    this.accountService.updatePassword(this.password.value, this.resetToken).then(response => {

      this.message = response.message;
      this.updated = response.update;

    })
  }
}

/* USER NAME FORM **************************************************************/

@Component({
  selector: 'username-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" *ngIf="!submitted">
      <div class="input-group">
        <input class="form-control" (keypress)="focus ='username'" formControlName="username" tabindex="1" placeholder="User Name" required autofocus>
        <button class="btn btn-outline-secondary material-icons" (click)="username.reset()" type="button" title="Clear User Name"  tabindex="2" *ngIf="focus==='username'">
          close
        </button>
        <button class="btn material-icons submit-check-button"
                [ngClass]="{'btn-outline-primary': !valid, 'btn-primary': valid}" [disabled]="!valid" title="Submit User Name" tabindex="3"
                *ngIf="focus==='username'">
          done
        </button>
      </div>
    </form>
    <div class="alert alert-danger" *ngIf="username.invalid && username.touched">
      <aside *ngIf="errors.required">User Name is required.</aside>
      <aside *ngIf="minLengthError">User Name min {{minLengthError.requiredLength}} characters.<br>You have {{minLengthError.actualLength}}.</aside>
      <aside *ngIf="maxLengthError">User Name max {{maxLengthError.requiredLength}} characters.<br>You have {{maxLengthError.actualLength}}.</aside>
      <aside *ngIf="errors.pattern">User Name can only use Alpha Numberic characters and NO spaces.</aside>
    </div>
    <div class="alert" [ngClass]="{'alert-success': updated, 'alert-danger': !updated}" *ngIf="message" >{{message}}</div>
    <div *ngIf="uniqueUser===false && username.touched"><div class="alert alert-danger">User Name is already Taken.</div></div>`
})
export class UserNameFormComponent extends MilieuFieldForm {

  uniqueUser: boolean = null;

  // cache
  focus = this.form.focus;
  get minLengthError() { return this.errors.minlength }
  get maxLengthError() { return this.errors.maxlength }
  get username() { return this.form.get('username') }
  get errors() { return this.username.errors }
  get valid() { return this.form.valid }

  constructor(public accountService: AccountService) {
    super(accountService);
    let user = this.accountService.username;
    this.form.addControl('username', new FormControl('', [Validators.required, Validators.minLength(user.min), Validators.maxLength(user.max), Validators.pattern(user.pattern)]));
  }

  uniqueUserName() {
    return this.accountService.uniqueUserName(this.username.value).then((data) => {
      this.uniqueUser = data;
      return data;
    });
  }

  submit() {
    this.uniqueUserName().then(data => {
      this.accountService.updateUserName(this.username.value).then(updateData => {
        if (updateData.update) {
          this.message = updateData.message;
          this.updated = updateData.update;
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      });
    }).catch(err => {
      console.log(err);
    });
  }
}
