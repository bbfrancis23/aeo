import { Component, EventEmitter, Input, Output } from '@angular/core';

'use strict';

/*
  Brian Francis
  Summary: Basic Control Component Vues. Uses Bootstrap 4 dropdown technology.
  Description:

    Inputs:
      show: Boolean for display in HTML.
      show[ Hide, Modal, QuickView, DetailView ]Ctrl: Boodlean for display in HTML.

    Outputs:
      [Hide, Modal, QuickView, DetailView]: EmitsEvent when control item selected.

    Definitions:
      Control: Interactive dynamic manipulation of a Vue. Most often a drop down menu or a button.
      Milieu: Item Application Environment. Examples: Account, Code Jems, Real Estate.
      Modal: Interactive Overlay Element.
      Vue: An Interface to a Milieu. Examples: A User Profile would be an AccountVue to an Account Milieu. A log In Form would be LogInVue to an Account Milieu.
*/

@Component({
  selector: 'vue-control',
  template: `
    <div classs="dropdown">
      <a class="dropdown-toggle" data-toggle="dropdown"></a>
      <div class="dropdown-menu dropdown-menu-right" >
        <a class="dropdown-item" (click)="hideVue.emit()" *ngIf="showHideCtrl"><div class="material-icons">remove_circle</div> Hide</a>
        <a class="dropdown-item" (click)="modalVue.emit()" *ngIf="showModalCtrl"><div class="material-icons">open_in_browser</div> Modal</a>
        <a class="dropdown-item" (click)="quickView.emit()" *ngIf="showQuickViewCtrl"><div class="material-icons">view_headline</div>Quick View</a>
        <a class="dropdown-item" (click)="detailView.emit()" *ngIf="showDetailViewCtrl"><div class="material-icons">view_agenda</div>Detail View</a>
      </div>
    </div>`
})
export class VueControlComponent {

  @Input() show = true;
  @Input() showHideCtrl = true;
  @Input() showModalCtrl = true;
  @Input() showQuickViewCtrl = false;
  @Input() showDetailViewCtrl = false;

  @Output() hideVue = new EventEmitter();
  @Output() modalVue = new EventEmitter();
  @Output() quickView = new EventEmitter();
  @Output() detailView = new EventEmitter();
}
