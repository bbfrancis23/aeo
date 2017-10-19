import { DashBoardTileComponent } from './dash-board-tile.component';
import { DashBoardService } from './dash-board.service';

"use strict";

export class ListTileComponent extends DashBoardTileComponent {
  showBig = true;
  items: {};

  constructor(protected data: DashBoardService) { super(data); }
}
