import { JemListVueComponent, ManageJemComponent } from './core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MilieuModule } from '../milieu/module';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { JemComponent } from './jem.component';
import { JemSmallComponent } from './jem-sm.component';
import { JemMilieuComponent } from './jem-milieu.component';

@NgModule({
  imports: [ CommonModule, MilieuModule, FormsModule, ReactiveFormsModule ],
  declarations: [ JemComponent, JemListVueComponent, JemMilieuComponent, JemSmallComponent, ManageJemComponent],
  exports: [ JemComponent, JemListVueComponent, JemMilieuComponent, JemSmallComponent, ManageJemComponent ]
})
export class JemsModule { }
