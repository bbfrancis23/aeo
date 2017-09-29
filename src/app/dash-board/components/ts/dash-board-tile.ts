import { Component } from '@angular/core';

@Component({
  selector: 'dash-board-tile',
  templateUrl: '../html/dash-board-tile.html'
})
export class DashBoardTileComponent {
  show = true;

  toggle(){
    this.show = (this.show) ? false : true;
  }
}
