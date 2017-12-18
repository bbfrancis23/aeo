import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FilterVueComponent } from './filter-vue.component';
import { IntroVueComponent } from './intro-vue.component';
import { ItemControlsComponent } from './item-controls.component';
import { ModalControlsComponent } from './modal-controls.component';
import { ModalVueComponent } from './modal-vue.component';
import { SizedItemsVueControlsComponent } from './sized-items-vue-controls.component';
import { VueControlsComponent } from './vue-controls.component';

import { LogInVueComponent } from './log-in-vue.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    FilterVueComponent,
    IntroVueComponent,
    ItemControlsComponent,
    LogInVueComponent,
    ModalControlsComponent,
    ModalVueComponent,
    SizedItemsVueControlsComponent,
    VueControlsComponent
  ],
  exports: [
    FilterVueComponent,
    IntroVueComponent,
    ItemControlsComponent,
    LogInVueComponent,
    ModalControlsComponent,
    ModalVueComponent,
    SizedItemsVueControlsComponent,
    VueControlsComponent
  ]
})
export class MilieuModule { }
