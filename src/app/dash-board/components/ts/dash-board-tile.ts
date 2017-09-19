import { Component } from '@angular/core';

@Component({
  selector: 'dash-board-tile',
  templateUrl: '../html/dash-board-tile.html',
  //styleUrls: ['../css/dash-board.css']
})
export class DashBoardTileComponent {
  show = true;

  toggle(): void{
    this.show = this.show ? false : true;
  }
}
