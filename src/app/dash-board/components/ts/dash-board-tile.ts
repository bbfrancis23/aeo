import { Component } from '@angular/core';

@Component({
  selector: 'dash-board-tile',
  template: ''
})
export class DashBoardTileComponent {
  show = true;

  toggle(){
    this.show = (this.show) ? false : true;
  }
}
