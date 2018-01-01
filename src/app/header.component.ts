import { Component, ViewChild } from '@angular/core';
import { AccountService } from './account/account.service';
import { JemService } from './jems/jem.service';
import { AppModalComponent } from './app-modal.component';

@Component({
  selector: 'app-header',
  template: `
  <nav class="navbar fixed-top navbar-expand-lg navbar-dark" >
    <a class="navbar-brand" routerLink="">AEO</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle"  id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >ANGULAR</a>
          <menu class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
           <a class="dropdown-item featured" routerLink="/code-jems/tech/angular">ANGULAR</a>
           <a class="dropdown-item" routerLink="/code-jems/tech/angular/type/best-practices">Best Practices</a>
           <a class="dropdown-item" routerLink="/code-jems/tech/angular/type/how-to">How To</a>
           <a class="dropdown-item" routerLink="/code-jems/tech/angular/type/mistakes">Mistakes</a>
           <a class="dropdown-item" routerLink="/code-jems/tech/angular/type/style-guide">Style Guide</a>
          </menu>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle"  id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">CSS</a>
          <menu class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
           <a class="dropdown-item featured" routerLink="/code-jems/tech/css">CSS</a>
           <a class="dropdown-item" routerLink="/code-jems/tech/css/type/best-practices">Best Practices</a>
           <a class="dropdown-item" routerLink="/code-jems/tech/css/type/how-to">How To</a>
           <a class="dropdown-item" routerLink="/code-jems/tech/css/type/mistakes">Mistakes</a>
           <a class="dropdown-item" routerLink="/code-jems/tech/css/type/style-guide">Style Guide</a>
           <div class="dropdown-divider"></div>
           <a class="dropdown-item featured" routerLink="/code-jems/tech/less">LESS</a>
           <a class="dropdown-item" routerLink="/code-jems/tech/less/type/best-practices">Best Practices</a>
           <a class="dropdown-item" routerLink="/code-jems/tech/less/type/how-to">How To</a>
          </menu>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle"  id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">HTML</a>
          <menu class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
           <a class="dropdown-item featured" routerLink="/code-jems/tech/html">HTML</a>
           <a class="dropdown-item" routerLink="/code-jems/tech/html/type/best-practices">Best Practices</a>
           <a class="dropdown-item" routerLink="/code-jems/tech/html/type/how-to">How To</a>
           <a class="dropdown-item" routerLink="/code-jems/tech/html/type/mistakes">Mistakes</a>
           <a class="dropdown-item" routerLink="/code-jems/tech/html/type/style-guide">Style Guide</a>
          </menu>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle"  id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">JAVASCRIPT</a>
          <menu class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
           <a class="dropdown-item featured" routerLink="/code-jems/tech/javascript">JAVASCRIPT</a>
           <a class="dropdown-item" routerLink="/code-jems/tech/javascript/type/best-practices">Best Practices</a>
           <a class="dropdown-item" routerLink="/code-jems/tech/javascript/type/how-to">How To</a>
           <a class="dropdown-item" routerLink="/code-jems/tech/javascript/type/mistakes">Mistakes</a>
           <a class="dropdown-item" routerLink="/code-jems/tech/javascript/type/style-guide">Style Guide</a>
          </menu>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle"  id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">MONGO-DB</a>
          <menu class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
           <a class="dropdown-item featured" routerLink="/code-jems/tech/mongodb">MONGO-DB</a>
           <a class="dropdown-item" routerLink="/code-jems/tech/mongodb/type/best-practices">Best Practices</a>
           <a class="dropdown-item" routerLink="/code-jems/tech/mongodb/type/how-to">How To</a>
           <a class="dropdown-item" routerLink="/code-jems/tech/mongodb/type/mistakes">Mistakes</a>
           <a class="dropdown-item" routerLink="/code-jems/tech/mongodb/type/style-guide">Style Guide</a>
          </menu>
        </li>
        <li class="nav-item"><a class="nav-link" routerLink="/code-jems">CODE JEMS</a></li>
      </ul>
      <item-search class="mr-2 d-none d-lg-block" [milieuService]="jemService"></item-search>
      <button (click)="accountClick()" class="btn material-icons btn-account" [ngClass]="{'btn-outline-success' : accountService.authenticated === true, 'btn-outline-warning': accountService.authenticated !== true}" title="Account">account_box</button>
    </div>
  </nav>

  <app-modal #logIn><app-log-in (modalCloseEvent)="modalLogIn.modalMode='off'"></app-log-in></app-modal>
  <app-modal #logOut><app-log-out></app-log-out></app-modal>
   `
})
export class AppHeaderComponent {

  @ViewChild("logIn") modalLogIn: AppModalComponent;
  @ViewChild("logOut") modalLogOut: AppModalComponent;

  constructor(private jemService: JemService, private accountService: AccountService ){
    console.log(accountService);
  }

  accountClick(){
    if(this.accountService.authenticated === true){
      this.modalLogOut.modalMode = 'on';
    }else{
      this.modalLogIn.modalMode = 'on';
    }
  }
}

/* copyright AEO all right reserved */
