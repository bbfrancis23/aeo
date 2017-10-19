import { ViewChild } from '@angular/core';
import { DashBoardService } from '../dash-board/dash-board.service';
import { ModalDashBoardTileComponent } from '../dash-board/modal-dash-board-tile.component';

'use strict';

export class DashBoardTileComponent {
  private show = true;

  @ViewChild(ModalDashBoardTileComponent) modalChild;

  constructor(protected data: DashBoardService) { };

  //get show() { return (this._show && this.data.dashBoard) ? true : false; }
}

/* copyright AEO all right reserved */
