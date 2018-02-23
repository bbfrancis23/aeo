import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  CollapseControlComponent,
  FilterVueComponent,
  IntroVueComponent,
  ItemControlsComponent, ItemSearchComponent,
  MilieuSideBarComponent,
  ModalControlsComponent,
  SizedItemsVueControlsComponent,
  ViewPortComponent,
} from './core';

import { ModalDrawerComponent } from './modals';
import { MilieuModalComponent } from './modal';
import { ModalVueComponent } from './modal-vue';
import { VueControlComponent } from './vue-control';


@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  declarations: [CollapseControlComponent,
    FilterVueComponent,
    IntroVueComponent,
    ItemControlsComponent, ItemSearchComponent,
    MilieuModalComponent, MilieuSideBarComponent,
    ModalControlsComponent, ModalDrawerComponent, ModalVueComponent,
    SizedItemsVueControlsComponent,
    ViewPortComponent,
    VueControlComponent
  ],
  exports: [CollapseControlComponent,
    FilterVueComponent,
    IntroVueComponent,
    ItemControlsComponent, ItemSearchComponent,
    MilieuModalComponent, MilieuSideBarComponent,
    ModalControlsComponent, ModalDrawerComponent, ModalVueComponent,
    SizedItemsVueControlsComponent,
    ViewPortComponent,
    VueControlComponent
  ]
})
export class MilieuModule { }
