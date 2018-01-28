import { Component, Input } from '@angular/core';

import { fadeInOutAnimation } from './animations';
import { IntroVueComponent } from './core';
import { MilieuService } from './data';

@Component({
  selector: 'sidebar-intro-vue',
  template:
    `<modal-vue>
        <div class="card" [@fadeInOut]="'in'" *ngIf="show" >
          <vue-controls (hideVueEvent)="show=false" (modalVueEvent)="modalChild.modalMode=true" *ngIf="showControls" ></vue-controls>
          <modal-controls *ngIf="modalChild.modalMode"></modal-controls>
          <img [src]="milieuService.config.img" alt="{{milieuService.config.title}}">
          <div class="card-block">
            <h2>{{milieuService.config.title}}</h2>
            <p>{{milieuService.config.intro}}</p>
          </div>
        </div>
    </modal-vue>`,
  animations: [ fadeInOutAnimation ],
})
export class SideBarIntroVueComponent extends IntroVueComponent {
  @Input() milieuService: any;
  showControls = false;
}
