import { Component } from '@angular/core';
import { DashBoardTileComponent } from './dash-board-tile.component';
import { DashBoardService } from '../dash-board/dash-board.service';

'use strict';

@Component({
  selector: 'intro-tile',
  template:
  ` <div [ngClass]="{modal: modal}">
      <div class="card border-primary tile" *ngIf="show" >
        <img class="card-img-top" [src]="data.config.img" alt="{{data.config.title}}">
        <div class="tile-controls"><a class="material-icons tile-item" (click)="show=false;" >clear</a></div>
        <div class="card-block p-3">
          <h4 class="card-title">{{data.config.title}}</h4>
          <p class="card-text">{{data.config.intro}}</p>
        </div>
      </div>
    </div>`
})
export class IntroTileComponent extends DashBoardTileComponent {

  constructor(private data: DashBoardService) { super(); }
}

/* Copyright AEO all rights reserved */
