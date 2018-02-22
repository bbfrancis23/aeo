import { Component, Input } from '@angular/core';

import { fadeInOutAnimation } from './animations';

'use strict';

/*
  Brian Francis
  Summary: Modal for Milieu that isn't part of a Vue. Example: A log-in that can be viewed from any where in the App.
  Description:
    modalMode: Boolean that defined if component is in modalMode.

    @Inputs:
      modalOnly: Boolean that defines if a component should only be used as a modal.

    modalClick:
      params: click - Recieves clickEvent.

      Called for every click on the modal.
      Turns modalMode false for the modal area around the content when modalMode is true and for anything marked with the class of 'close-modal' like a close modal button.

    Definitions:
      Milieu: Item Application Environment. Examples: Account, Code Jems, Real Estate.
      Vue: An Interface to a Milieu. Examples: A User Profile would be an AccountVue to an Account Milieu. A log In Form would be LogInVue to an AccountMilieu.
*/

@Component({
  selector: 'milieu-modal',
  template: `
    <div *ngIf="modalMode" [ngClass]="{'modal-mode': modalMode}"   (click)="modalClick($event)" [@fadeInOut]="'in'">
      <div class="modal-content" ><ng-content></ng-content></div>
    </div>
  `,
  animations: [fadeInOutAnimation]
})
export class MilieuModalComponent {
  modalMode = false;
  @Input() modalOnly = false;

  modalClick(click) {

    if (this.modalMode) {
      const clickClass = click.target.className;

      if (clickClass.search(/modal-mode/) > -1 || clickClass.search(/close-modal/) > -1) {
        this.modalMode = false;
      }
    }
  }
}
