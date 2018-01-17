import { Component, Input, OnInit } from '@angular/core';
import { MilieuFormGroup } from '../milieu/core';
import { AccountService } from './account.service';
import { FormControl, Validators } from '@angular/forms';

'use strict';

@Component ({
  selector: 'email-input',
  template: `
    <div class="input-group" [formGroup]="emailFormGroup">
      <input class="form-control" formControlName="email" placeholder="Email" (focus)="emailFormGroup.focus='email'" required>
      <button class="btn btn-outline-secondary material-icons" *ngIf="emailFormGroup.focus==='email'" title="Reset Email" (click)="email.reset()" >clear</button>
    </div>
    <div *ngIf="email.invalid && email.touched" class="alert alert-danger">
      <aside *ngIf="errors.required">Email is required.</aside>
      <aside *ngIf="errors.minlength">Email min {{errors.minlength.requiredLength}} characters.<br>You have {{errors.minlength.actualLength}}.</aside>
      <aside *ngIf="errors.maxlength">Email max {{errors.maxlength.requiredLength}} characters.<br> You have {{errors.maxlength.actualLength}}.</aside>
      <aside *ngIf="errors.email">Must be valid Email.<br>e.g. - name@mail.com</aside>
    </div>
    `
})
export class EmailInputComponent implements OnInit {
  @Input() emailFormGroup: MilieuFormGroup;

  constructor(public accountService:AccountService){}

  ngOnInit(){
    this.emailFormGroup.addControl('email',  new FormControl('', [Validators.required, Validators.minLength(this.accountService.email.min),Validators.maxLength(this.accountService.email.max),Validators.email]));
  }

  get email() { return this.emailFormGroup.get('email') }
  get errors() { return this.email.errors }
}
