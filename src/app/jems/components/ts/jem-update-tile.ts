import { Component, Output, EventEmitter } from '@angular/core';
import { DashBoardTileComponent} from '../../../dash-board/components/ts/dash-board-tile';
import { Jem } from '../../../jem';
import { JemService} from '../../../jem.service';

@Component({
  selector: 'jem-update-tile',
  templateUrl: '../html/jem-form.html',
  styles: []
})
export class JemUpdateTileComponent extends DashBoardTileComponent{
  function = "Update";

  submitted = false
  onSubmit():void{

  //  this.jemService.createJem(this.model).then((jem)=>{ this.jemAddedEvent.emit(jem) });

    this.submitted = true;

    //console.log(this.model);
  }
  get diagnostic() {return JSON.stringify(this.model);}

  model: Jem = new Jem();

  @Output() jemUpdatedEvent = new EventEmitter<Jem>();

  constructor(private jemService: JemService){super();
    this.model.tech = 'Git';
    this.model.type = 'Best Practices'
  }

  hideTile(){
    this.show = false;
  }
}
