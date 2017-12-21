import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-log-out',
  template: `
  <div class="card" >
    <modal-controls></modal-controls>
    <div class="card-header"  >Log Out</div>
    <div class="card-block" >
      <div class="center" ><a (click)="logOut()" class="btn btn-outline-primary close-modal" >LOG OUT</a></div>
    </div>
  </div>
  `
})
export class AppLogOutComponent{

  @Input() milieuService: any;

  logOut(){
    console.log("You clicky");
    this.milieuService.logOut();
  }
}
