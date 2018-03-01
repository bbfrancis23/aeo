import { Component, Input } from '@angular/core';
import { modalVueFadeInOut } from './animations';

/*
  Brian Francis

  Summary: Modal for Milieu Vues. Simply wrap this around a view and make modalMode true.
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
      Modal: Interactive Overlay Element.
      Vue: An Interface to a Milieu. Examples: A User Profile would be an AccountVue to an Account Milieu. A log In Form would be LogInVue to an AccountMilieu.
*/

@Component({
  selector: 'modal-vue',
  template: `
    <div *ngIf="!modalOnly || (modalOnly && modalMode)">
      <div [ngClass]="{'modal-mode': modalMode}" [@modalVueFadeInOut]="modalMode" (click)="modalClick($event)">
        <div [ngClass]="{'modal-vue-content': modalMode}"><ng-content></ng-content></div>
      </div>
    </div>`,
  animations: [modalVueFadeInOut]
})
export class ModalVueComponent {

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
