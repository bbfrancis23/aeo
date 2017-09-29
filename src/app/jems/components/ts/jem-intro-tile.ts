import { Component } from '@angular/core';
import { DashBoardTileComponent} from '../../../dash-board/components/ts/dash-board-tile';

@Component({
  selector: 'jem-intro-tile',
  template:
    ` <div class="card border-primary tile" *ngIf="show" >
        <img class="card-img-top" src="assets/img/code-jems.jpg" alt="Card image cap">
        <div class="tile-controls"><a class="material-icons tile-item" (click)="show=false;" >clear</a></div>
        <div class="card-block p-3">
          <h4 class="card-title">Code Jems</h4>
          <p class="card-text">Short-cut keys, Best Practices, How to and Mistakes. Code Jems,  it's all here</p>
        </div>
      </div>`
})
export class JemIntroTileComponent extends DashBoardTileComponent{
}
