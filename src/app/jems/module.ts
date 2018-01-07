import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JemListVueComponent, JemComponent, ManageJemComponent } from './core';
import { JemMilieuComponent } from './jem-milieu.component';
import { MilieuModule } from '../milieu/module';

@NgModule({
  imports: [ CommonModule, MilieuModule, FormsModule, ReactiveFormsModule ],
  declarations: [ JemComponent, JemListVueComponent, JemMilieuComponent, ManageJemComponent],
  exports: [ JemComponent, JemListVueComponent, JemMilieuComponent, ManageJemComponent ]
})
export class JemsModule { }
