import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  CollapseControlComponent,
          FilterVueComponent,
          IntroVueComponent,
          ItemControlsComponent, ItemSearchComponent,
          ListVueComponent,
          ModalControlsComponent,
          SizedItemsVueControlsComponent,
          ViewPortComponent,
          VueControlsComponent } from './core';

import { MilieuModalComponent, ModalDrawerComponent, ModalVueComponent } from './modals';

import { MilieuSideBarComponent, SidebarFilterVueComponent, SideBarIntroVueComponent } from './sidebar';

@NgModule({
  imports: [ CommonModule, FormsModule, ReactiveFormsModule ],
  declarations: [ CollapseControlComponent,
                  FilterVueComponent,
                  IntroVueComponent,
                  ItemControlsComponent, ItemSearchComponent,
                  ListVueComponent,
                  MilieuModalComponent, MilieuSideBarComponent,
                  ModalControlsComponent, ModalDrawerComponent, ModalVueComponent,
                  SidebarFilterVueComponent,
                  SideBarIntroVueComponent,
                  SizedItemsVueControlsComponent,
                  ViewPortComponent,
                  VueControlsComponent
  ],
  exports: [  CollapseControlComponent,
              FilterVueComponent,
              IntroVueComponent,
              ItemControlsComponent, ItemSearchComponent,
              ListVueComponent,
              MilieuModalComponent, MilieuSideBarComponent,
              ModalControlsComponent, ModalDrawerComponent, ModalVueComponent,
              SideBarIntroVueComponent,
              SidebarFilterVueComponent,
              SizedItemsVueControlsComponent,
              ViewPortComponent,
              VueControlsComponent
  ]
})
export class MilieuModule { }
