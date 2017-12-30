import { Component } from "@angular/core"
import { AccountService} from './account.service';


"use strict";

@Component({
selector: "account-vue",
template: `
  <main class="row" >
    <div class="col-md-2"></div>
    <div class="col-md-8">
      <div class="card">
      <div class="card-header">Account Info</div>
        <div class="card-block" style="margin: 0 auto;">
          <table>
            <tr>
              <td><button class="btn btn-outline-primary material-icons" title="Edit User Name" (click)="editUserName=!editUserName" >create</button></td>
              <td class="field-name">User Name:</td>
              <td class="field" *ngIf="editUserName===false">{{accountService.username}}</td>
              <td *ngIf="editUserName===true"><input class="form-control" placeholder="{{accountService.username}}"></td>
              <td class="field" *ngIf="editUserName===true"><button type="submit" class="btn btn-outline-success">Update</button></td>
            </tr>
            <tr>
              <td><button class="btn btn-outline-primary material-icons" title="Edit User Name" (click)="editUserName=!editUserName" >create</button></td>
              <td class="field-name">Email Address:</td>
              <td class="field" *ngIf="editUserName===false">{{accountService.email}}</td>
              <td *ngIf="editUserName===true"><input class="form-control" placeholder="{{accountService.username}}"></td>
              <td class="field" *ngIf="editUserName===true"><button type="submit" class="btn btn-outline-success">Update</button></td>
            </tr>
            <tr>
              <td colspan="2"><button class="btn btn-outline-primary material-icons" title="Edit User Name" (click)="editUserName=!editUserName" >create</button></td>
                         
              <td *ngIf="editUserName===true"><input class="form-control" placeholder="{{accountService.username}}"></td>
              <td class="field" *ngIf="editUserName===true"><button type="submit" class="btn btn-outline-success">Update</button></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="col-md-2"></div>
  </main>`
})
export class AccountVueComponent{

  editUserName = false;
  editEmail = false;
  editPassword = false;


  constructor(private accountService: AccountService){

  }
}

/* Copyright AEO all rights reserved */
