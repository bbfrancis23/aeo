import { Component, ViewChild } from '@angular/core';
import { JemService } from './jems/jem.service';
import { AppModalComponent } from './app-modal.component';

@Component({
  selector: 'app-header',
  template: `
  <nav class="navbar fixed-top navbar-expand-lg navbar-dark" >
    <a class="navbar-brand" href="">AEO</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle"  id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >ANGULAR</a>
          <menu class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
           <a class="dropdown-item featured" href="/code-jems/tech/angular">ANGULAR</a>
           <a class="dropdown-item" href="/code-jems/tech/angular/type/best-practices">Best Practices</a>
           <a class="dropdown-item" href="/code-jems/tech/angular/type/how-to">How To</a>
           <a class="dropdown-item" href="/code-jems/tech/angular/type/mistakes">Mistakes</a>
           <a class="dropdown-item" href="/code-jems/tech/angular/type/style-guide">Style Guide</a>
          </menu>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle"  id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">CSS</a>
          <menu class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
           <a class="dropdown-item featured" href="/code-jems/tech/css">CSS</a>
           <a class="dropdown-item" href="/code-jems/tech/css/type/best-practices">Best Practices</a>
           <a class="dropdown-item" href="/code-jems/tech/css/type/how-to">How To</a>
           <a class="dropdown-item" href="/code-jems/tech/css/type/mistakes">Mistakes</a>
           <a class="dropdown-item" href="/code-jems/tech/css/type/style-guide">Style Guide</a>
           <div class="dropdown-divider"></div>
           <a class="dropdown-item featured" href="/code-jems/tech/less">LESS</a>
           <a class="dropdown-item" href="/code-jems/tech/less/type/best-practices">Best Practices</a>
           <a class="dropdown-item" href="/code-jems/tech/less/type/how-to">How To</a>
          </menu>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle"  id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">HTML</a>
          <menu class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
           <a class="dropdown-item featured" href="/code-jems/tech/html">HTML</a>
           <a class="dropdown-item" href="/code-jems/tech/html/type/best-practices">Best Practices</a>
           <a class="dropdown-item" href="/code-jems/tech/html/type/how-to">How To</a>
           <a class="dropdown-item" href="/code-jems/tech/html/type/mistakes">Mistakes</a>
           <a class="dropdown-item" href="/code-jems/tech/html/type/style-guide">Style Guide</a>
          </menu>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle"  id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">JAVASCRIPT</a>
          <menu class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
           <a class="dropdown-item featured" href="/code-jems/tech/javascript">JAVASCRIPT</a>
           <a class="dropdown-item" href="/code-jems/tech/javascript/type/best-practices">Best Practices</a>
           <a class="dropdown-item" href="/code-jems/tech/javascript/type/how-to">How To</a>
           <a class="dropdown-item" href="/code-jems/tech/javascript/type/mistakes">Mistakes</a>
           <a class="dropdown-item" href="/code-jems/tech/javascript/type/style-guide">Style Guide</a>
          </menu>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle"  id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">MONGO-DB</a>
          <menu class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
           <a class="dropdown-item featured" href="/code-jems/tech/mongodb">MONGO-DB</a>
           <a class="dropdown-item" href="/code-jems/tech/mongodb/type/best-practices">Best Practices</a>
           <a class="dropdown-item" href="/code-jems/tech/mongodb/type/how-to">How To</a>
           <a class="dropdown-item" href="/code-jems/tech/mongodb/type/mistakes">Mistakes</a>
           <a class="dropdown-item" href="/code-jems/tech/mongodb/type/style-guide">Style Guide</a>
          </menu>
        </li>
        <li class="nav-item"><a class="nav-link" href="/code-jems">CODE JEMS</a></li>
      </ul>
      <item-search class="mr-2 d-none d-lg-block" [milieuService]="jemService"></item-search>
      <button (click)="this.modalChild.modalMode = 'on'" class="btn material-icons btn-account" [ngClass]="{'btn-outline-success' : jemService.authenticated === true, 'btn-outline-warning': jemService.authenticated !== true}" title="Account">account_box</button>
    </div>
  </nav>

  <app-modal><app-log-in [milieuService]="jemService" (modalCloseEvent)="modalChild.modalMode='off'"></app-log-in></app-modal>`
})
export class AppHeaderComponent {

  @ViewChild(AppModalComponent) modalChild: AppModalComponent;

  constructor(private jemService: JemService){
    //console.log(jemService.location.path());
  }
}

/* copyright AEO all right reserved */
