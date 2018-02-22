import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JemComponent, JemTableOfContents, ManageJemComponent } from './core';
import { JemMilieuComponent } from './jem-milieu.component';
import { MilieuModule } from '../milieu/module';

import { JemListVueComponent } from './list-vue';

@NgModule({
  imports: [CommonModule, MilieuModule, FormsModule, ReactiveFormsModule],
  declarations: [JemComponent, JemListVueComponent, JemMilieuComponent, JemTableOfContents, ManageJemComponent],
  exports: [JemComponent, JemListVueComponent, JemMilieuComponent, JemTableOfContents, ManageJemComponent]
})
export class JemsModule { }
