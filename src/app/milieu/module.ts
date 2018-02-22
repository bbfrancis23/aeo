import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  CollapseControlComponent,
  FilterVueComponent,
  IntroVueComponent,
  ItemControlsComponent, ItemSearchComponent,
  ListVueComponent,
  MilieuSideBarComponent,
  ModalControlsComponent,
  SizedItemsVueControlsComponent,
  ViewPortComponent,
  VueControlsComponent
} from './core';

import { MilieuModalComponent, ModalDrawerComponent, ModalVueComponent } from './modals';



@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  declarations: [CollapseControlComponent,
    FilterVueComponent,
    IntroVueComponent,
    ItemControlsComponent, ItemSearchComponent,
    ListVueComponent,
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
    ListVueComponent,
    MilieuModalComponent, MilieuSideBarComponent,
    ModalControlsComponent, ModalDrawerComponent, ModalVueComponent,
    SizedItemsVueControlsComponent,
    ViewPortComponent,
    VueControlsComponent
  ]
})
export class MilieuModule { }
