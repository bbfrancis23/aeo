import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterVueComponent, IntroVueComponent, ItemControlsComponent, ItemSearchComponent, ModalControlsComponent, SizedItemsVueControlsComponent, ViewPortComponent, VueControlsComponent } from './core';
import { MilieuModalComponent, ModalVueComponent } from './modals';

@NgModule({
  imports: [ CommonModule, FormsModule, ReactiveFormsModule ],
  declarations: [
    FilterVueComponent,
    IntroVueComponent,
    ItemControlsComponent,
    ItemSearchComponent,
    MilieuModalComponent,
    ModalControlsComponent,
    ModalVueComponent,
    SizedItemsVueControlsComponent,
    ViewPortComponent,
    VueControlsComponent
  ],
  exports: [
    FilterVueComponent,
    IntroVueComponent,
    ItemControlsComponent,
    ItemSearchComponent,
    MilieuModalComponent,
    ModalControlsComponent,
    ModalVueComponent,
    SizedItemsVueControlsComponent,
    VueControlsComponent,
    ViewPortComponent
  ]
})
export class MilieuModule { }
