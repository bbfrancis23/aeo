import { Component, ViewChild } from '@angular/core';
import { JemService } from './jems/jem.service';
import { AeoModalComponent } from './aeo-modal.component';

@Component({
  selector: 'aeo-header',
  templateUrl: './aeo-header.component.html'
})
export class AeoHeaderComponent {

  @ViewChild(AeoModalComponent) modalChild: AeoModalComponent;

  constructor(private jemService: JemService){
  }

  
}
