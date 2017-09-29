import { Component, Input, Output, EventEmitter } from '@angular/core';

'use strict';

@Component({
  selector: 'item-controls',
  template: `<div class="item-controls">
                <div class="dropdown">
                  <a class="dropdown-toggle" data-toggle="dropdown"></a>
                  <div class="dropdown-menu dropdown-menu-right" >
                   <a class="dropdown-item" (click)="deleteItemEvent.emit()" ><div class="material-icons drawer mi-sm">delete_forever</div> Delete</a>
                   <a class="dropdown-item" (click)="updateItemEvent.emit();"><div class="material-icons drawer mi-sm">create</div> Update</a>
                   <a class="dropdown-item" ><div class="material-icons drawer mi-sm">favorite</div> Favorite</a>
                 </div>
               </div>
              </div>`
})
export class ItemControlsComponent {

  @Output() deleteItemEvent = new EventEmitter();
  @Output() updateItemEvent = new EventEmitter();

}
