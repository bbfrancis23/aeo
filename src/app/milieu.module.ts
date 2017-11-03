import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FilterVueComponent } from './milieu/filter-vue.component';
import { IntroVueComponent } from './milieu/intro-vue.component';
import { ItemControlsComponent } from './milieu/item-controls.component';
import { ModalControlsComponent } from './milieu/modal-controls.component';
import { ModalVueComponent } from './milieu/modal-vue.component';
import { SizedItemsVueControlsComponent } from './milieu/sized-items-vue-controls.component';
import { VueControlsComponent } from './milieu/vue-controls.component';

import { LogInVueComponent } from './milieu/log-in-vue.component';

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
