import { Component, ViewChild } from '@angular/core';
import { AccountService } from './account/data';
import { JemService } from './jems/jem.service';
import { MilieuModalComponent } from './milieu/modal';
import { JemMilieuComponent } from './jems/jem-milieu.component';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <router-outlet ></router-outlet>
    <app-footer ></app-footer>`
})
export class AppComponent {


}

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
        <item-search id="nav-search" class="d-none d-lg-block" [milieuService]="jemService"></item-search>
        <button (click)="accountServices.modalMode = true" class="btn material-icons btn-account" [ngClass]="{'btn-outline-success' : accountService.authenticated, 'btn-outline-warning': !accountService.authenticated }" title="Account">account_box</button>
      </div>
    </nav>

    <milieu-modal id="account-services-modal"><account-services ></account-services></milieu-modal>`
})
export class AppHeaderComponent {
  @ViewChild(MilieuModalComponent) accountServices: MilieuModalComponent;
  constructor(private jemService: JemService, private accountService: AccountService) {
    //console.log(jemService, accountService);
  }
}

@Component({
  selector: 'app-content',
  template: `
    <view-port id="app-content">
      <media><video src="assets/img/code.mov" autoplay="true" loop="true" ></video></media>
      <content>
        <h1>AEO - TECH</h1>
        <h2> Home of Code Jems</h2>
        <p>As a programmer do you find your self looking up the same documentation over and over. Then looking forever till you find what you want...</p>
        <p>Code Jems are small, searchable, filterable, customizable easy to understand code snippets.</p>
        <p>Perfect for quick reference and custom 'Cheat Sheets'.</p>
        <a routerLink="code-jems/tech/angular"><img src="assets/img/angular.png"></a>
        <a routerLink="code-jems/tech/css"><img src="assets/img/css.png"></a>
        <a routerLink="code-jems/tech/css"><img src="assets/img/html.png"></a>
        <a routerLink="code-jems/tech/css"><img src="assets/img/javascript.png"></a>
        <a routerLink="code-jems/tech/css"><img src="assets/img/mongo.png"></a>
      </content>
    </view-port>`,
})
export class AppContentComponent { }


@Component({
  selector: 'app-footer',
  template: `
    <footer class="fluid-container" *ngIf="show">
      <div class="row">
        <div class="col-lg-12">
          <a href="https://angular.io" target="_blank"><img src="assets/img/angular.png" title="Angular" ></a>
          <a href="https://www.mongodb.com/" target="_blank"><img src="assets/img/mongo.png" title="MongoDB" ></a>
          <a href="https://nodejs.org" target="_blank"><img src="assets/img/nodejs.png" title="NodeJS" style=""></a>
          <a href="https://getbootstrap.com" target="_blank"><img src="assets/img/bootstrap.png" title="Bootstrap" style=""></a>
          <a href="https://www.digitalocean.com" target="_blank"><img src="assets/img/digitalocean.png" title="DigitalOcean" style=""></a>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
        © 2018 AEO ALL RIGHT RESERVED
        </div>
      </div>
    </footer>`
})
export class AppFooterComponent {
  show = true;
}


/* copyright AEO all right reserved */
