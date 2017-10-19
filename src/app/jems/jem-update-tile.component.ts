import { Component, OnInit } from '@angular/core';
import { DashBoardTileComponent } from '../dash-board/dash-board-tile.component';
import { DashBoardService } from '../dash-board/dash-board.service';


'use strict';

@Component({
  selector: 'jem-update-tile',
  templateUrl: './jem-form.component.html'
})
export class JemUpdateTileComponent extends DashBoardTileComponent implements OnInit {
  function = "Update";
  model: Object = {};
  submitted = false;

  onSubmit(): void {
    this.data.create(this.model).then((jem) => { });
    this.data.refresh();
    this.submitted = true;
  }

  constructor(protected data: DashBoardService) {
    super(data);
    data.currentSelectedItem.subscribe(selectedItem => this.model = selectedItem);
  }

  ngOnInit() {
    //this.modal = document.getElementById('formModal');
  }

}
