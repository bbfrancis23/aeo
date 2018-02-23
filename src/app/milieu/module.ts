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
  VueControlsComponent
} from './core';

import { ModalDrawerComponent } from './modals';
import { MilieuModalComponent } from './modal';
import { ModalVueComponent } from './modal-vue';


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
    VueControlsComponent
  ],
  exports: [CollapseControlComponent,
    FilterVueComponent,
    IntroVueComponent,
    ItemControlsComponent, ItemSearchComponent,
    MilieuModalComponent, MilieuSideBarComponent,
    ModalControlsComponent, ModalDrawerComponent, ModalVueComponent,
    SizedItemsVueControlsComponent,
    ViewPortComponent,
    VueControlsComponent
  ]
})
export class MilieuModule { }
