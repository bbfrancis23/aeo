import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AccountService } from './account.service';

@Component({
  selector: 'account-reset',
  template: `
  <view-port>
    <media><div class="media-wrapper"><img src="assets/img/code.jpg" ></div></media>
    <content>
      <main class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <div class="card">
          <div class="card-header">Reset Password</div>
            <div class="card-block">
              <div class="alert alert-danger" *ngIf="!validCode">This link is Invalid or Expired.</div>
              
            </div>
          </div>
        </div>
        <div class="col-md-3"></div>
      </main>
    </content>
  </view-port>`
})
export class AccountResetCompoent {


  validCode = null;
  token: string = null;

  constructor(public route: ActivatedRoute, public accountService: AccountService){
    this.route.params.subscribe(params => {

      this.token = params.id;
      this.accountService.validResetId(params.id).then(valid=>{
        this.validCode = valid;
      });

    });
  }
}
