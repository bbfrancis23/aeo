import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'item-controls',
  template: `<div class="item-controls">
                  <div class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown"></a>
                    <div class="dropdown-menu dropdown-menu-right" >
                     <a class="dropdown-item" (click)="deleteItemEvent.emit()" >Delete</a>
                     <a class="dropdown-item" (click)="updateItemEvent.emit();">Update</a>
                     <a class="dropdown-item" >Favorite</a>
                   </div>
                 </div>
                </div>`
})
export class ItemControlsComponent {

  //@Output() hideTileEvent = new EventEmitter();
  @Output() deleteItemEvent = new EventEmitter();
  @Output() updateItemEvent = new EventEmitter();

}
