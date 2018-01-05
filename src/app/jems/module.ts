import { JemListVueComponent } from './core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MilieuModule } from '../milieu/module';


import { JemComponent } from './jem.component';
import { JemSmallComponent } from './jem-sm.component';

@NgModule({
  imports: [ CommonModule, MilieuModule ],
  declarations: [ JemComponent, JemListVueComponent, JemSmallComponent],
  exports: [ JemComponent, JemListVueComponent, JemSmallComponent ]
})
export class JemsModule { }
