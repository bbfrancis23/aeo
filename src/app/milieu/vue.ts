import { Input, ViewChild } from '@angular/core';

import { ModalVueComponent } from './modals';
import { MilieuService } from './data';

/*
  Brian Francis
  Summary: Base Class for all Milieu Vues
  Description:

    ViewChilds:
      modal: Optional Child Modal Vue for Vues that employ a modal. -- Just wrap contents in a modal-vue tag.

    Inputs:
      show: Boolean display in HTML.
      sidebarMode: Boolean that defines if a vue is part of a sidebar.

    Accessors and Mutators:
      get/set modalMode: Boolean cached short-cut to modalChild.

    Constructor:
      params: Optional MilieuService.

    Definitions:
      Milieu: Item Application Environment. Examples: Account, Code Jems, Real Estate.
      Modal: Interactive Overlay Element.
      Vue: An Interface to a Milieu. Examples: A User Profile would be an AccountVue to an Account Milieu. A log In Form would be LogInVue to an AccountMilieu.      
*/

export abstract class MilieuVue {

  @ViewChild(ModalVueComponent) modal: ModalVueComponent;

  @Input() show = true;
  @Input() sidebarMode = false;

  get modalMode() {
    return this.modal.modalMode;
  }

  set modalMode(b) {
    this.modal.modalMode = b;
  }

  constructor(milieuService?: MilieuService)
  constructor()
  { }

}
