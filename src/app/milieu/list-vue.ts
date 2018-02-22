import { Input, OnInit } from '@angular/core';

import { MilieuVue } from './vue';
import { MilieuService } from './data';

'use strict';

/*
  Brian Francis
  Summary: Base Class for List Vues
  Description:
    quickView: Boolen definition of quickView.
    -- Example the description might be limited to 100 characters.

    Constructor:
      params: milieuService
      -- This param will actually inherit from milieuService.

    ngOnInit(): subscribes to the current filtered Milieu Items.

    trackByItem: Any *ngFor should include the trackByItem fucntion.
    -- Example: *ngFor="let item of items; trackBy: trackByItem"

    Definitions:
      Milieu: Item Application Environment. Examples: Account, Code Jems, Real Estate.
      Vue: An Interface to a Milieu. Examples: A User Profile would be an AccountVue to an Account Milieu. A log In Form would be LogInVue to an AccountMilieu.
*/

export abstract class ListVue extends MilieuVue implements OnInit {

  quickView = false;
  items: {};

  constructor(protected milieuService: MilieuService) {
    super();
  }

  ngOnInit() {
    this.milieuService.currentFilteredItems.subscribe(filteredItems => {
      this.items = filteredItems;
    })
  }

  trackByItem(index: number, item) {
    return item._id;
  }
}
