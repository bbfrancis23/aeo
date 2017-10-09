import { Component } from '@angular/core';
import { DashBoardTileComponent } from './dash-board-tile.component';
import { DashBoardService } from '../dash-board/dash-board.service';

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

  title = this.data.config.title;
  intro = this.data.config.intro;
  img = this.data.config.img;

  constructor(private data: DashBoardService) {
    super();
  }
}
