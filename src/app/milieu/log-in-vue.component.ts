import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MilieuVue } from '../milieu/milieu-vue';
import { MilieuService } from '../milieu/milieu.service';

'use strict';

// opt-js //

@Component({
  selector: 'log-in-vue',
  template: `
    <div class="card border-primary tile " style="margin-top: 10px">
      <div class="card-header bg-primary"><h4>Log In</h4></div>
      <div class="card-block p-3" >
        <form  (ngSubmit)="onSubmit();" [formGroup]="logInForm" #formDir="ngForm">
          <div [hidden]="formDir.submitted">
                  <div class="form-group">
                    <label for="email" class="sr-only">Email</label>
                    <input id="email" class="form-control" formControlName="email" placeholder="Email" required >
                    <div *ngIf="email.invalid && (email.touched)" class="alert alert-danger">
                      <div *ngIf="email.errors.required">Email is required.</div>
                      <div *ngIf="email.errors.email">Must be valid Email.</div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="email" class="sr-only">Password</label>
                      <input id="password" type="password" class="form-control "  formControlName="password" placeholder="Password" required>
                      <div *ngIf="password.invalid && (password.touched)" class="alert alert-danger">
                        <div *ngIf="password.errors.required">Password is required.</div>
                        <div *ngIf="password.errors.minlength">Must be at least 4 character long.</div>
                      </div>
                    </div>
                  <button type="submit" class="btn btn-outline-success float-right" [disabled]="logInForm.invalid" >Log In</button>

          </div>
        </form>
      </div>
    </div>`
})
export class LogInVueComponent extends MilieuVue implements OnInit {
  submitted = false;
  logInForm: FormGroup;

  constructor(protected data: MilieuService) { super(data); }

  ngOnInit() {
    this.logInForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  onSubmit(): void {
    this.data.login(this.logInForm.value);
  }

  get email() { return this.logInForm.get('email') }
  get password() { return this.logInForm.get('password') }
}

/* Copyright AEO all rights reserved */
