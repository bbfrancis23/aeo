import { Component, Directive, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AccountService} from './account.service';
import { MilieuVue } from '../milieu/core';

"use strict";

@Directive({
  selector: '[var]',
  exportAs: 'var'
})
class VarDirective {
  @Input() var:any;
}

@Component({
selector: "account-vue",
template: `
  <main class="row" >
    <div class="col-md-2" ></div>
    <div class="col-md-8" >
      <div class="card" >
      <div class="card-header" >Account Info</div>
        <div class="card-block">
          <table>
            <tr>

              <td><button class="btn btn-outline-primary material-icons" [ngClass]="{'active': editUserName}" title="Update User Name" (click)="editUserName=!editUserName" >create</button></td>
              <td class="field-name" >User Name:</td>
              <td class="field" *ngIf="!editUserName">{{accountService.username.value}}</td>
              <td *ngIf="editUserName">
                <form (ngSubmit)="updateUserName();" [formGroup]="userNameForm" #formUserName="ngForm">
                  <div class="input-group">
                    <input class="form-control" placeholder="User Name" formControlName="username" >
                    <button  type="submit" class="btn btn-success material-icons" [disabled]="userNameForm.invalid" title="Update">done</button>
                    <button class="btn btn-dark material-icons" title="cancel" (click)="editUserName=false" >clear</button>
                  </div>
                  <div class="alert alert-success" *ngIf="userNameServerMessage">{{userNameServerMessage}}</div>
                  <div class="alert alert-danger" *ngIf="username.invalid && username.touched">
                    <aside *ngIf="username.errors.minlength">User Name must be at least {{accountService.username.min}} characters.</aside>
                    <aside *ngIf="username.errors.required">User Name is required</aside>
                  </div>
                  <div  *ngIf="username.invalid && !username.pristine">
                    <aside class="alert alert-danger" *ngIf="username.errors.pattern">User Name is invalid</aside>
                    <aside class="alert alert-danger" *ngIf="username.errors.maxlength">User Name can only be {{accountService.username.max}} characters.</aside>
                  </div>
                  <div *ngIf="uniqueUser===false && username.touched"><div class="alert alert-danger">User Name is already Taken.</div></div>
                </form>
              </td>
            </tr>


            <tr>
              <td><button class="btn btn-outline-primary material-icons" [ngClass]="{'active': editEmail}" title="Update Email" (click)="editEmail=!editEmail" >create</button></td>
              <td class="field-name">Email:</td>
              <td class="field" *ngIf="editEmail===false">{{accountService.email.value}}</td>
              <td *ngIf="editEmail===true">
                <form (ngSubmit)="updateEmail();" [formGroup]="emailForm" #formEmail="ngForm">
                  <div class="input-group">
                    <input class="form-control" placeholder="Email" formControlName="email" >
                    <button  type="submit" class="btn btn-outline-success material-icons" [disabled]="emailForm.invalid">done</button>
                    <button class="btn btn-outline-dark material-icons" title="cancel" (click)="editEmail=false" >clear</button>
                  </div>
                  <div class="alert alert-success" *ngIf="emailServerMessage">{{emailServerMessage}}</div>
                  <div class="alert alert-danger" *ngIf="email.invalid && email.touched">
                    <aside *ngIf="email.errors.required">Email is required</aside>
                    <aside *ngIf="email.errors.minlength">Email must be at least {{accountService.email.min}} characters.</aside>
                    <aside *ngIf="email.errors.maxlength">Email can only be {{accountService.email.max}} characters.</aside>
                    <aside *ngIf="email.errors.email">Email is invalid</aside>
                  </div>
                  <div *ngIf="uniqueEmail===false && email.touched"><br><div class="alert alert-danger">Email is already Taken.</div></div>
                </form>
              </td>
            </tr>

            <tr>
              <td><button class="btn btn-outline-primary material-icons" [ngClass]="{'active': editPassword}" title="Update Password" (click)="editPassword=!editPassword" >create</button></td>
              <td class="field-name">Password:</td>
              <td class="field" *ngIf="editPassword===false"></td>
              <td *ngIf="editPassword===true">
                <form (ngSubmit)="updatePassword();" [formGroup]="passwordForm" #formPassword="ngForm">
                  <div class="input-group">
                    <input class="form-control" placeholder="Password" formControlName="password" type="password">
                    <button  type="submit" class="btn btn-outline-success material-icons" [disabled]="passwordForm.invalid">done</button>
                    <button class="btn btn-outline-dark material-icons" title="cancel" (click)="editPassword=false" >clear</button>
                  </div>
                  <div class="alert alert-success" *ngIf="passwordServerMessage">{{passwordServerMessage}}</div>
                  <div class="alert alert-danger" *ngIf="password.invalid && password.touched">
                    <aside *ngIf="password.errors.required">Password is required</aside>
                    <aside *ngIf="password.errors.minlength">Password must be at least {{accountService.password.min}} characters.</aside>
                    <aside *ngIf="password.errors.maxlength">Password can only be {{accountService.password.max}} characters.</aside>
                    <aside *ngIf="password.errors.pattern">Password is invalid</aside>
                  </div>

                </form>
              </td>
            </tr>

          </table>
        </div>
      </div>
    </div>
    <div class="col-md-2"></div>
  </main>`
})
export class AccountVueComponent extends MilieuVue implements OnInit{

  editUserName = false;
  editEmail = false;
  editPassword = false;

  uniqueUser: boolean = null;
  uniqueEmail: boolean = null;

  @Input() accountService: AccountService;

  userNameForm: FormGroup;
  emailForm: FormGroup;
  passwordForm: FormGroup;

  userNameServerMessage = null;
  emailServerMessage = null;
  passwordServerMessage = null;

  ngOnInit(){

    this.userNameForm = new FormGroup({
      username: new FormControl( '',
        [ Validators.required, Validators.minLength(this.accountService.username.min), Validators.maxLength(this.accountService.username.max), Validators.pattern(this.accountService.username.pattern)] )
    });

    this.emailForm = new FormGroup({
      email: new FormControl('', [ Validators.required, Validators.minLength(this.accountService.email.min), Validators.maxLength(this.accountService.email.max), Validators.email])
    });

    this.passwordForm = new FormGroup({
      password: new FormControl('',
        [ Validators.required, Validators.minLength(this.accountService.password.min), Validators.maxLength(this.accountService.password.max), Validators.pattern(this.accountService.password.pattern)] )
    });
    //console.log(this.username);
  }

  checkUserName(){
    return this.accountService.uniqueUserName(this.username.value).then((data)=>{
      this.uniqueUser = data;
      return data;
    });
  }

  checkUniqueEmail(){
    return this.accountService.uniqueEmail(this.email.value).then( data => {
      this.uniqueEmail = data;
      return data;
    });
  }

  updateUserName(){
    this.checkUserName().then(data =>{
      this.accountService.updateUserName(this.username.value).then( updateData =>{
        if(updateData.update){
          this.userNameServerMessage = updateData.message;

          setTimeout(()=>{
            window.location.reload();
          },3000);
        }
      });
    }).catch( err =>{
      console.log(err);
    });
  }

  updateEmail(){
    this.checkUniqueEmail().then(data =>{

      //console.log(data);

      if(data){

        //console.log('ready to update email');
        this.accountService.updateEmail(this.email.value).then( updateData =>{
         if(updateData.update){
            this.emailServerMessage = updateData.message;

            setTimeout(()=>{
              window.location.reload();
            },3000);
          }
        });

      }

    }).catch( err =>{
      console.log(err);
    });
  }

  updatePassword(){
    this.accountService.updatePassword(this.password.value).then( updateData =>{
     if(updateData.update){
        this.passwordServerMessage = updateData.message;

        setTimeout(()=>{
          this.passwordServerMessage = null;
          this.editPassword = false;

        },3000);
      }
    });
  }

  get username() { return this.userNameForm.get('username') }
  get email() { return this.emailForm.get('email') }
  get password() { return this.passwordForm.get('password')}
}

/* Copyright AEO all rights reserved */
