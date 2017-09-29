import { Component, Output, EventEmitter } from '@angular/core';
import { DashBoardTileComponent} from '../../../dash-board/components/ts/dash-board-tile';
import { Jem } from '../../jem';
import { JemService} from '../../jem.service';

@Component({
  selector: 'jem-update-tile',
  templateUrl: '../html/jem-form.html',
  styles: []
})
export class JemUpdateTileComponent extends DashBoardTileComponent{
  function = "Update";
  model: Jem = new Jem();
  submitted = false

  @Output() jemUpdatedEvent = new EventEmitter<Jem>();


  onSubmit():void{
    this.jemService.createJem(this.model).then((jem)=>{});
    this.submitted = true;
  }

  constructor(private jemService: JemService){super(); }


}
