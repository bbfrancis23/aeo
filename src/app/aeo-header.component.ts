import { Component } from '@angular/core';
import { JemService } from './jems/jem.service';

@Component({
  selector: 'aeo-header',
  templateUrl: './aeo-header.component.html'
})
export class AeoHeaderComponent {

  constructor(private jemService: JemService){
    //console.log(jemService);
  }
}
