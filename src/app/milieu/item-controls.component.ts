import { Component, Input } from '@angular/core';
'use strict';

@Component({
  selector: 'item-controls',
  template: `
    <div class="item-controls dropdown">
        <a class="dropdown-toggle" data-toggle="dropdown"></a>
        <div class="dropdown-menu dropdown-menu-right" >
          <a class="dropdown-item" (click)="milieuService.delete(item._id)" ><div class="material-icons">delete_forever</div>Delete</a>
          <a class="dropdown-item" (click)="milieuService.changeSelectedItem(this.item)"><div class="material-icons">create</div> Update</a>
          <a class="dropdown-item" ><div class="material-icons">favorite</div> Favorite</a>
        </div>
    </div>`
})
export class ItemControlsComponent {

  @Input() item: Object = {};
  @Input() milieuService: {};
}
/* Copyright AEO all rights reserved */
