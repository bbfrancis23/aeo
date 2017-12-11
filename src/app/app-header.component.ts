import { Component, ViewChild } from '@angular/core';
import { JemService } from './jems/jem.service';
import { AppModalComponent } from './app-modal.component';

@Component({
  selector: 'app-header',
  template: `
  <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark" >
    <a class="navbar-brand" href="">AEO</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle"  id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">JavaScript</a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
           <a class="dropdown-item" href="/code-jems/tech/javascript">JavaScript</a>
           <a class="dropdown-item" href="/code-jems/tech/javascript/type/best-practices">Best Practices</a>
           <a class="dropdown-item" href="/code-jems/tech/javascript/type/how-to">How To</a>
           <a class="dropdown-item" href="/code-jems/tech/javascript/type/mistakes">Mistakes</a>
           <a class="dropdown-item" href="/code-jems/tech/javascript/type/style-guide">Style Guide</a>
          </div>
        </li>
        <li class="nav-item"><a class="nav-link" href="/code-jems">Code Jems</a></li>
      </ul>
      <item-search class="mr-2" [milieuService]="jemService"></item-search>
      <button (click)="this.modalChild.modalMode = 'on'" class="btn btn-outline-secondary material-icons btn-account" title="Account">account_box</button>
    </div>
  </nav>
  <app-modal><aeo-log-in [milieuService]="jemService"></aeo-log-in></app-modal>`,

  styles:[`@media (max-width: 991px) {.btn-account{margin-top: 10px;}}`]
})
export class AppHeaderComponent { @ViewChild(AppModalComponent) modalChild: AppModalComponent; constructor(private jemService: JemService){}}

/* copyright AEO all right reserved */
