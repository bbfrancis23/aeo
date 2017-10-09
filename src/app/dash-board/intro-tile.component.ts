import { Component } from '@angular/core';
import { DashBoardTileComponent } from './dash-board-tile.component';

'use strict';

@Component({
  selector: 'intro-tile',
  template:
  ` <div class="card border-primary tile" *ngIf="show" >
        <img class="card-img-top" [src]="img" alt="{{title}}">
        <div class="tile-controls"><a class="material-icons tile-item" (click)="show=false;" >clear</a></div>
        <div class="card-block p-3">
          <h4 class="card-title">{{title}}</h4>
          <p class="card-text">{{intro}}</p>
        </div>
      </div>`
})
export class IntroTileComponent extends DashBoardTileComponent {
}
