import { Component } from '@angular/core';
import { DashBoardTileComponent } from '../dash-board/dash-board-tile.component';
import { DashBoardService } from '../dash-board/dash-board.service';
import { Jem } from './jem';

'use strict';

@Component({
  selector: 'jem-add-tile',
  templateUrl: './jem-form.component.html'
})
export class JemAddTileComponent extends DashBoardTileComponent {
  function = "Add";
  submitted = false
  model: Jem = new Jem();

  constructor(private data: DashBoardService) {
    super();
    this.model.tech = 'Git';
    this.model.type = 'Best Practices'
  }

  onSubmit(): void {
    this.data.create(this.model);
    this.data.refresh();
    this.submitted = true;
  }
}
