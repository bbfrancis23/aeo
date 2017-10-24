import { Component, Input } from '@angular/core';
import { MilieuService } from './milieu.service';

'use strict';

@Component({
  selector: 'item-controls',
  template: `
    <div class="item-controls">
      <div class="dropdown">
        <a class="dropdown-toggle" data-toggle="dropdown"></a>
        <div class="dropdown-menu dropdown-menu-right" >
          <a class="dropdown-item" (click)="data.delete(item._id)" ><div class="material-icons drawer mi-sm">delete_forever</div>Delete</a>
          <a class="dropdown-item" (click)="data.changeSelectedItem(this.item)"><div class="material-icons drawer mi-sm">create</div> Update</a>
          <a class="dropdown-item" ><div class="material-icons drawer mi-sm">favorite</div> Favorite</a>
        </div>
      </div>
    </div>`
})
export class ItemControlsComponent {

  @Input() item: Object = {};
  constructor(private data: MilieuService) { };
}
/* Copyright AEO all rights reserved */
