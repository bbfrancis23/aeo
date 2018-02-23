import { Input, ViewChild } from '@angular/core';

import { ModalVueComponent } from './modal-vue';
import { MilieuService } from './data';

'use stict';

/*
  Brian Francis
  Summary: Base Class for all Milieu Vues
  Description:

    ViewChilds:
      modal: Optional Child Modal Vue for Vues that employ a modal.
      -- Just wrap contents in a modal-vue tag.
      -- ViewChild is made even though you can usually access from a templeate variable because sometimes you might want to remotely control the modalMode out side of the Component itself.
      ---- Example: An AddModalVue or UpdateModalVue might want to be triggered from an ItemVue or a ToolsBar.

    Inputs:
      show: Boolean display in HTML.
      sidebarMode: Boolean that defines if a vue is part of a sidebar.

    Accessors and Mutators:
      get/set modalMode: Boolean cached short-cut to modalChild.modalMode.

    Constructor:
      params: Optional MilieuService.

    Definitions:
      Milieu: Item Application Environment. Examples: Account, Code Jems, Real Estate.
      Modal: Interactive Overlay Element.
      Vue: An Interface to a Milieu. Examples: A User Profile would be an AccountVue to an Account Milieu. A log In Form would be LogInVue to an Account Milieu.
*/

export abstract class MilieuVue {

  @ViewChild(ModalVueComponent) modal?: ModalVueComponent;



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
