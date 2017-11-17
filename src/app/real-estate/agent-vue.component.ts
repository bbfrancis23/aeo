import { Component } from '@angular/core';
import { MilieuVue } from '../milieu/milieu-vue';
import { MilieuService } from '../milieu/milieu.service';

'use strict';

@Component({
  selector: 'agent-vue',
  template:
  ` <modal-vue><div [ngClass]="{modal: modal}">
      <div class="card border-primary vue" *ngIf="show" >
        <img class="card-img-top" src="assets/img/misty-maki.jpg" alt="Misty Maki Real Estate Agent">
        <vue-controls (hideVueEvent)="show=false" (modalVueEvent)="modalChild.modalMode=true" *ngIf="!modalChild.modalMode && data.dashBoard"></vue-controls>
        <modal-controls *ngIf="modalChild.modalMode === true"></modal-controls>
        <div class="card-block">
          <h4 class="card-title">Misty Maki</h4>
          <span>(801) 699-0824</span><br>
          <span>mistymaki@msn.com</span><br>
          <span>(801) 699-0824</span><br>
        </div>
      </div>
    </div></modal-vue>`
})
export class AgentVueComponent extends MilieuVue { constructor(protected data: MilieuService) { super(data); } }

/* Copyright AEO all rights reserved */
