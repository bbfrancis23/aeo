import { Component, Input } from '@angular/core';
import { Jem } from './jem';

"use strict";

@Component({
  selector: 'jem-sm',
  template: `
    <div class="card p-1 text-white"
      [ngClass]="{
        'bg-success': jem.type === 'Best Practices',
        'bg-danger': jem.type === 'Mistakes',
        'bg-info': jem.type === 'How to'}" style="margin-bottom: 5px"><!-- to do get rid of this -->
      <item-controls [item]="jem" ></item-controls>
        <p><b>{{jem.title}}: </b> {{jem.description}}</p>
        <pre>{{jem.code}}</pre>
    </div>`,
})
export class JemSmallComponent {

  @Input() jem: Jem;


}
