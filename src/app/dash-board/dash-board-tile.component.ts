import { ViewChild } from '@angular/core';
import { ModalDashBoardTileComponent } from '../dash-board/modal-dash-board-tile.component';

'use strict';

export class DashBoardTileComponent {
  show = true;

  @ViewChild(ModalDashBoardTileComponent) modalChild;
}

/* copyright AEO all right reserved */
